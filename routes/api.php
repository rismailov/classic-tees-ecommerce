<?php

use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\User\ProductController;
use App\Http\Controllers\Api\User\ReviewController;
use App\Http\Resources\Api\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return new UserResource($request->user());
});

/* User Routes */
// products
Route::get('/products', [ProductController::class, 'index'])
    ->name('products.index');
Route::get('/products/{product:nanoid}', [ProductController::class, 'show'])
    ->name('products.show');

// reviews
Route::post('/products/{product}/reviews', [ReviewController::class, 'store']);

// options
Route::get('/options/product-filters', [OptionController::class, 'productFilters']);

require __DIR__.'/api/admin.php';
