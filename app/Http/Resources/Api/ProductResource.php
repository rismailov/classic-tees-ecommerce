<?php

namespace App\Http\Resources\Api;

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
            'id'       => $this->id,
            'nanoid'   => $this->nanoid,
            'name'     => $this->name,
            'price'    => $this->price,
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
                        'id'   => (string) $size->id,
                        'name' => $size->value,
                    ];
                }),
            'images' => $this->images->map(function ($img) {
                return [
                    'id'  => $img->id,
                    'url' => $img->url,
                ];
            }),
        ];
    }
}
