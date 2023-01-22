<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Reviews\StoreReviewRequest;
use App\Models\Product;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    use ApiResponseHelpers;

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
    public function store(StoreReviewRequest $request, Product $product)
    {
        $product->reviews()->create(
            $request->validated()
        );

        return $this->respondWithSuccess([
            'message' => __('responses.crud.saved', [
                'model' => __('models.reviews.single'),
            ]),
        ]);
    }
}
