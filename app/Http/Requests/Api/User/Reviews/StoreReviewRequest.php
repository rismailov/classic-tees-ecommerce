<?php

namespace App\Http\Requests\Api\User\Reviews;

use App\Rules\AlphaSpaces;
use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title'       => ['required', 'max:100'],
            'text'        => ['required', 'max:500'],
            'credentials' => ['required', new AlphaSpaces],
            'stars'       => ['required', 'in:1,2,3,4,5'],
        ];
    }
}
