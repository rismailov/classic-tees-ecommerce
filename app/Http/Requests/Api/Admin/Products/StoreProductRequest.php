<?php

namespace App\Http\Requests\Api\Admin\Products;

use App\Enums\ProductCategoryEnum;
use App\Models\Product;
use App\Rules\AlphaSpaces;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreProductRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'             => ['required', 'min:2', 'max:30', new AlphaSpaces],
            'category'         => ['required', new Enum(ProductCategoryEnum::class)],
            'price'            => ['required', 'numeric', 'min:1'],
            'sizes'            => ['required', 'array'],
            'sizes.*'          => ['numeric'],
            'colours'          => ['required', 'array'],
            'colours.*'        => ['numeric'],
            'images'           => ['required', 'array'],
            'images.*'         => ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'is_discounted'    => ['boolean'],
            'discount_percent' => [
                'required_if:is_discounted,true',
                'numeric',
                'min:'.Product::MIN_DISCOUNT,
                'max:'.Product::MAX_DISCOUNT,
            ],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'colours' => [$this->colour],
            // fix casing
            'is_discounted'    => filter_var($this->isDiscounted, FILTER_VALIDATE_BOOL),
            'discount_percent' => $this->discountPercent,
        ]);
    }
}
