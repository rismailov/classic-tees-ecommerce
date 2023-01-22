<?php

namespace App\Http\Resources\Api\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Lang;

class ColourResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $translation = 'models.colours.values.'.$this->value;

        return [
            'id' => $this->id,
            // convert to title-case if translation doesn't exist
            'value' => Lang::has($translation)
                ? __('models.colours.values.'.$this->value)
                : str(str_replace('-', ' ', $this->value))->title(),
        ];
    }
}
