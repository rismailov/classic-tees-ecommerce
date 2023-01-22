<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Colour;
use App\Models\Size;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    /**
     * Get filter options for the shop.
     *
     * @return \Illimunate\Http\JsonResponse
     */
    public function productFilters()
    {
        return response()->json([
            'sizes' => Size::select(['id', 'value'])->get()
                ->map(function ($size) {
                    return [
                        'value' => (string) $size->id,
                        'label' => $size->value,
                    ];
                }),

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
