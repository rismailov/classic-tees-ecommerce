<?php

namespace App\Http\Requests\Api\Admin\Products;

use App\Enums\ProductCategoryEnum;
use App\Models\Product;
use App\Rules\AlphaSpaces;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateProductRequest extends FormRequest
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
            'colour'           => ['numeric'],
            'is_discounted'    => ['boolean'],
            'discount_percent' => [
                'required_if:is_discounted,true',
                'numeric',
                'min:'.Product::MIN_DISCOUNT,
                'max:'.Product::MAX_DISCOUNT,
            ],
        ];
    }

    // change casing
    public function prepareForValidation()
    {
        $this->merge([
            'is_discounted'    => $this->isDiscounted,
            'discount_percent' => $this->discountPercent,
        ]);
    }
}
