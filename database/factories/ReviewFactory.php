<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title'       => fake()->title(),
            'text'        => fake()->text(300),
            'credentials' => fake()->firstName().' '.fake()->lastName(),
            'stars'       => fake()->numberBetween(3, 5),
            'product_id'  => Product::all()->random()->id,
        ];
    }
}
