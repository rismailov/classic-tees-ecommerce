<?php

use App\Http\Controllers\Api\Admin\ColourController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\ProductImagesController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->as('admin.')->group(function () {
    // Products
    Route::prefix('/products')->as('products.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])
            ->name('index');
        Route::get('/property-options', [ProductController::class, 'propertyOptions']);
        Route::get('/{product}', [ProductController::class, 'show'])
            ->name('show');
        Route::patch('/{product}', [ProductController::class, 'update']);
        Route::post('/', [ProductController::class, 'store']);

        // Product Images
        Route::prefix('/{product}/images')->group(function () {
            Route::post('/', [ProductImagesController::class, 'store']);
            Route::patch('/', [ProductImagesController::class, 'reorder']);
            Route::delete('/{image}', [ProductImagesController::class, 'destroy']);
            Route::patch('/{image}', [ProductImagesController::class, 'setAsMain']);
        });
    });

    // Colours
    Route::prefix('/colours')->group(function () {
        Route::get('/', [ColourController::class, 'index']);
        Route::post('/', [ColourController::class, 'store']);
        Route::delete('/{colour}', [ColourController::class, 'destroy']);
    });
});
