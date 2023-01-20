<?php

namespace App\Services;

class ProductService
{
    public static function calculateDiscountPrice(
        string $initial_price,
        string $discount_percent
    ): string {
        $percent_in_float = bcdiv((string) $discount_percent, '100', 3);
        $price_difference = bcmul($initial_price, $percent_in_float, 2);
        $discounted_price = bcsub($initial_price, $price_difference, 2);

        return $discounted_price;
    }
}
