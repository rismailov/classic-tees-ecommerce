<?php

namespace App\Http\Requests\Api\User\Products;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\ProductCategoryEnum;
use Illuminate\Validation\Rules\Enum;

class GetProductsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'categories'   => ['array'],
            'categories.*' => [new Enum(ProductCategoryEnum::class)],
            'sizes'        => ['array'],
            'sizes.*'      => ['numeric'],
            'colours'      => ['array'],
            'colours.*'    => ['numeric'],
            'onSale'   => ['boolean'],
            'minPrice' => ['numeric', 'min:0.00'],
            'maxPrice' => ['numeric'],
            'limit'    => ['numeric', 'min:1', 'nullable'],
            'sort'     => [
                'required',
                'in:price-asc,price-desc,date-asc,date-desc',
            ],
        ];
    }


    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    public function prepareForValidation()
    {
        if (! $this->price) {
            return;
        }

        $merged = [
            'onSale' => (bool) $this->price['onSale'],
        ];

        if (isset($this->price['min'])) {
            $merged['minPrice'] = $this->price['min'];
        }

        if (isset($this->price['max'])) {
            $merged['maxPrice'] = $this->price['max'];
        }

        $this->merge($merged);
    }
}
