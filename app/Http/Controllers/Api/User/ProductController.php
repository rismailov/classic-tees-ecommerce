<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Products\GetProductsRequest;
use App\Http\Resources\Api\ProductResource;
use App\Models\Colour;
use App\Models\Discount;
use App\Models\Product;
use F9Web\ApiResponseHelpers;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    use ApiResponseHelpers;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetProductsRequest $request)
    {
        $v = fn (string $key) => $request->validated($key);

        $products = Product::with(['sizes', 'images', 'colours'])
            ->when($v('categories'), function ($q) use ($v) {
                $q->whereIn('category', $v('categories'));
            })
            ->when($v('sizes'), function ($q) use ($v) {
                $q->whereHas('sizes', function ($sub) use ($v) {
                    $sub->whereIn('sizes.id', $v('sizes'));
                });
            })
            ->when($v('colours'), function ($q) use ($v) {
                $q->whereHas('colours', function ($sub) use ($v) {
                    $sub->whereIn('colours.id', $v('colours'));
                });
            })
            ->when($v('onSale'), fn ($q) => $q->whereIsDiscounted(true))
            ->when($v('minPrice'), function ($q) use ($v) {
                $q->whereRaw('LEAST(price, COALESCE(discount_price, price)) >= '.$v('minPrice'));
            })
            ->when($v('maxPrice'), function ($q) use ($v) {
                $q->whereRaw('LEAST(price, COALESCE(discount_price, price)) <= '.$v('maxPrice'));
            })
            ->when($v('sort'), function ($q) use ($v) {
                [$key, $value] = explode('-', $v('sort'));
                $key = $key === 'date' ? 'created_at' : 'price';

                $q->orderBy($key, $value);
            })
            ->paginate($v('limit'));

        return $this->respondWithSuccess(
            ProductResource::collection($products)
                ->response()
                ->getData(true)
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        // available colours on products from the same category.
        // this is needed for user to select a different colour
        $product->availableColours = Product::with('colours')
            ->select('id', 'nanoid')
            ->where('category', $product->getRawOriginal('category'))
            ->get()
            ->map(function ($product) {
                return [
                    // nanoid needed for slug on client side
                    'nanoid' => $product->nanoid,
                    'colour' => $product->colour,
                ];
            });

        return $this->respondWithSuccess(
            ProductResource::make($product)
        );
    }
}
