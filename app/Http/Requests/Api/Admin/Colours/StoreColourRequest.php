<?php

namespace App\Http\Requests\Api\Admin\Colours;

use App\Rules\AlphaSpaces;
use App\Rules\HexCode;
use Illuminate\Foundation\Http\FormRequest;

class StoreColourRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'colours'           => ['required', 'array'],
            'colours.*.value'   => ['required', new AlphaSpaces, 'unique:colours,value'],
            'colours.*.hexCode' => ['required', new HexCode, 'unique:colours,hex_code'],
        ];
    }
}
