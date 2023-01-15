<?php

namespace App\Http\Requests\Api\Admin\ProductImages;

use Illuminate\Foundation\Http\FormRequest;

class ReorderImagesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'images'         => ['required', 'array', 'min:1'],
            'images.*.id'    => ['numeric'],
            'images.*.order' => ['numeric'],
        ];
    }
}
