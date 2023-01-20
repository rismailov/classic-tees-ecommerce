<?php

namespace App\Http\Resources\Api;

use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'nanoid'      => $this->nanoid,
            'name'        => $this->name,
            'description' => $this->description,
            'price'       => [
                'initial'    => $this->price,
                'discounted' => $this->discount_price,
            ],
            'category' => [
                'value' => $this->getRawOriginal('category'),
                'label' => $this->category,
            ],
            'colour'  => $this->colour,
            'colours' => $this->colours->map(function ($colour) {
                return [
                    'value' => (string) $colour->id,
                    'label' => __('models.colours.'.$colour->value),
                    'hex'   => $colour->hex_code,
                ];
            }),
            'sizes' => $this->sizes
                ->map(function ($size) {
                    return [
                        // NOTE: casting as string is needed for mantine checkboxes/selects to work properly
                        'value' => (string) $size->id,
                        'label' => $size->value,
                    ];
                }),
            'images' => $this->images->map(function ($img) {
                return [
                    'id'  => $img->id,
                    'url' => $img->url,
                ];
            }),
            'createdAt' => $this->when(
                $request->routeIs('admin.products.index'),
                $this->created_at,
            ),
            'discountPercent' => $this->when(
                $request->routeIs('admin.products.show'),
                $this->discount_percent ?? Product::MIN_DISCOUNT
            ),
        ];
    }
}
