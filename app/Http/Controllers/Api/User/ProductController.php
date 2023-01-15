<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Products\GetProductsRequest;
use App\Http\Resources\Api\ProductResource;
use App\Http\Resources\Api\ProductsResource;
use App\Models\Product;
use F9Web\ApiResponseHelpers;

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
        $params = $request->validated();
        $limit = $request->validated('limit');

        $products = Product::with(['sizes', 'images'])
            ->when($v('categories'), function ($q) use ($params) {
                $q->whereIn('category', $params['categories']);
            })
            ->when($v('sizes'), function ($q) use ($params) {
                $q->whereHas('sizes', function ($sub) use ($params) {
                    $sub->whereIn('sizes.id', $params['sizes']);
                });
            })
            ->when($v('colours'), function ($q) use ($params) {
                $q->whereHas('colours', function ($sub) use ($params) {
                    $sub->whereIn('colours.id', $params['colours']);
                });
            })
            ->when($v('minPrice'), function ($q) use ($params) {
                $q->where('price', '>=', $params['minPrice']);
            })
            ->when($v('maxPrice'), function ($q) use ($params) {
                $q->where('price', '<=', $params['maxPrice']);
            })
            ->when($v('sort'), function ($q) use ($params) {
                [$key, $value] = explode('-', $params['sort']);
                $key = $key === 'date' ? 'created_at' : 'price';

                $q->orderBy($key, $value);
            })
            ->latest()
            ->paginate($limit);

        return $this->respondWithSuccess(
            ProductsResource::collection($products)
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
        return $this->respondWithSuccess(
            new ProductResource($product)
        );
    }
}
