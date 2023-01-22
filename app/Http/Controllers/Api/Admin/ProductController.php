<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\ProductCategoryEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\Products\StoreProductRequest;
use App\Http\Requests\Api\Admin\Products\UpdateProductRequest;
use App\Http\Resources\Api\ProductResource;
use App\Models\Colour;
use App\Models\Discount;
use App\Models\Product;
use App\Models\Size;
use App\Services\ProductService;
use F9Web\ApiResponseHelpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    use ApiResponseHelpers;

    public function index()
    {
        return $this->respondWithSuccess(
            ProductResource::collection(
                Product::with(['sizes', 'images'])->latest()->get()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        try {
            $data = $request->validated();

            $product = DB::transaction(function () use ($data) {
                // create product
                $product = Product::create([
                    'name'             => $data['name'],
                    'price'            => $data['price'],
                    'category'         => $data['category'],
                    'is_discounted'    => $data['is_discounted'],
                    'discount_percent' => $data['discount_percent'],
                    'discount_price'   => ProductService::calculateDiscountPrice(
                        $data['price'],
                        $data['discount_percent']
                    ),
                ]);

                // associate with colour
                $product->colours()->sync($data['colours']);

                // associate with sizes
                $product->sizes()->sync($data['sizes']);

                // save images
                foreach ($data['images'] as $idx => $image) {
                    $fileName = $image->getClientOriginalName();
                    $productImagesPath = 'images/products/'.$product->id.'/';
                    $image->storeAs('public/'.$productImagesPath, $fileName);
                    $url = Storage::url($productImagesPath.$fileName);

                    $product->images()->create([
                        'url'   => $url,
                        'order' => $idx,
                    ]);
                }

                return $product;
            });

            return $this->respondWithSuccess([
                'message' => __('responses.crud.saved', [
                    'model' => __('models.products.single'),
                ]),
                // cache created product with react-query
                'product' => new ProductResource($product),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json(new ProductResource($product));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Product $product, UpdateProductRequest $request)
    {
        try {
            $data = $request->validated();

            DB::transaction(function () use ($data, $product) {
                // create product
                $product->update([
                    'name'             => $data['name'],
                    'price'            => $data['price'],
                    'category'         => $data['category'],
                    'is_discounted'    => $data['is_discounted'],
                    'discount_percent' => $data['is_discounted']
                        ? $data['discount_percent']
                        : null,
                    'discount_price' => $data['is_discounted']
                        ? ProductService::calculateDiscountPrice(
                            $data['price'],
                            $data['discount_percent']
                        )
                        : null,
                ]);

                // associate with sizes
                $product->sizes()->sync($data['sizes']);

                // replace colour for this product
                $product->colours()->sync([$data['colour']]);
            });

            return $this->respondWithSuccess([
                'message' => __('responses.crud.updated', [
                    'model' => __('models.products.single'),
                ]),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    /**
     * Show property options to choose from.
     *
     * @return \Illuminate\Http\Response
     */
    public function propertyOptions()
    {
        return response()->json([
            'categories' => array_map(
                fn ($cat) => [
                    'value' => $cat->value,
                    'label' => __('models.categories.'.$cat->value),
                ],
                ProductCategoryEnum::cases()
            ),

            'sizes' => Size::select('id', 'value')->get(),

            'colours' => Colour::select(['id', 'value', 'hex_code'])->get()
                ->map(function ($colour) {
                    return [
                        'value' => (string) $colour->id,
                        'label' => __('models.colours.values.'.$colour->value),
                        'hex'   => $colour->hex_code,
                    ];
                }),
        ]);
    }
}
