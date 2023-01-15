<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fname'    => ['required', 'string', 'min:2', 'max:30'],
            'lname'    => ['required', 'string', 'min:2', 'max:30'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'fname'                 => $this->firstName,
            'lname'                 => $this->lastName,
            'password_confirmation' => $this->passwordConfirmation,
        ]);
    }
}
