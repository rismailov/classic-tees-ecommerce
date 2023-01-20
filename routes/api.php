<?php

use App\Http\Controllers\Api\OptionController;
use App\Http\Controllers\Api\User\ProductController;
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
    return $request->user();
});

/* User Routes */
// products
Route::get('/products', [ProductController::class, 'index'])
    ->name('products.index');
Route::get('/products/{product:nanoid}', [ProductController::class, 'show'])
    ->name('products.show');

// options
Route::get('/options/product-filters', [OptionController::class, 'productFilters']);

require __DIR__.'/api/admin.php';
