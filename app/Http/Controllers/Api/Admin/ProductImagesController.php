<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\ProductImages\ReorderImagesRequest;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'images'   => ['required'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        /* Check if any of images already exist in the storage */
        $isAnyExists = false;

        foreach ($validated['images'] as $image) {
            $fileName = $image->getClientOriginalName();
            $productImagesPath = 'images/products/'.$product->id.'/';

            if (File::exists(public_path().Storage::url($productImagesPath.$fileName))) {
                $isAnyExists = true;
                break;
            }
        }

        if ($isAnyExists) {
            return throw new \Exception('Images must be unique');
        }

        // save images
        foreach ($validated['images'] as $image) {
            $fileName = $image->getClientOriginalName();
            $productImagesPath = 'images/products/'.$product->id.'/';

            $image->storeAs('public/'.$productImagesPath, $fileName);

            $url = Storage::url($productImagesPath.$fileName);
            $product->images()->create(['url' => $url]);
        }

        return response()->json([
            'message' => __('responses.crud.uploaded', [
                'model' => __('models.images.multiple'),
            ]),
        ]);
    }

    public function reorder(Product $product, ReorderImagesRequest $request)
    {
        $images = $request->validated('images');

        if (count($product->images) !== count($images)) {
            return response()->json([
                'message' => 'Something went wrong. Please try again',
            ]);
        }

        foreach ($product->images as $image) {
            foreach ($images as $orderedImage) {
                if ($image->id == $orderedImage['id']) {
                    $image->update([
                        'order' => $orderedImage['order'],
                    ]);
                }
            }
        }

        return response()->json([
            'message' => 'Reorder success',
        ]);
    }

    /**
     * Set image as main.
     */
    public function setAsMain(Product $product, Image $image)
    {
        $images = $product->images()->where('is_main', true)->get();

        foreach ($images as $img) {
            $img->update(['is_main' => false]);
        }

        $image->update(['is_main' => true]);

        return response()->json([
            'message' => __('responses.crud.updated', [
                'model' => __('models.images.single'),
            ]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, Image $image)
    {
        if ($product->images()->count() <= 1) {
            return response()->json([
                'message' => 'Product must have at least 1 image. Please upload more images before deleting this one.',
            ], 500);
        }

        DB::transaction(function () use ($image, $product) {
            $image->delete();

            if (File::exists(public_path().$image->getRawOriginal('url'))) {
                File::delete(public_path().$image->getRawOriginal('url'));
            }

            if ($image->is_main) {
                $product->images->first()->update(['is_main' => true]);
            }
        });

        return response()->json([
            'message' => __('responses.crud.deleted', [
                'model' => __('models.images.single'),
            ]),
        ]);
    }
}
