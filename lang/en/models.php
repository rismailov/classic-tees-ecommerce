<?php

use App\Enums\ProductCategoryEnum;

return [
    'colours' => [
        'single' => 'Colour',
        'multiple' => 'Colours',

        'values' => [
            'white'          => 'White',
            'black'          => 'Black',
            'yellow'         => 'Yellow',
            'light-gray'     => 'Light gray',
            'navy'           => 'Navy',
            'military-beige' => 'Military beige',
            'raspberry'      => 'Raspberry',
            'dark-purple'    => 'Dark purple',
            'dusty-pink'     => 'Dusty pink',
            'electric-blue'  => 'Electric blue',
            'emerald'        => 'Emerald',
            'burgundy'       => 'Burgundy',
            'sage'           => 'Sage',
            'gray'           => 'Gray',
        ],
    ],

    'categories' => [
        ProductCategoryEnum::POLO->value       => 'Polo',
        ProductCategoryEnum::TALL->value       => 'Tall',
        ProductCategoryEnum::V_NECK->value     => 'V-Neck',
        ProductCategoryEnum::ACTIVEWEAR->value => 'Activewear',
    ],

    'sizes' => [
        's'    => 'Small',
        'm'    => 'Medium',
        'l'    => 'Large',
        'xl'   => 'Extra Large',
        'xxl'  => '2XL',
        'xxxl' => '3XL',
    ],

    'images' => [
        'single'   => 'Image',
        'multiple' => 'Images',
    ],

    'products' => [
        'single'   => 'Product',
        'multiple' => 'Products',
    ],

    'reviews' => [
        'single'   => 'Review',
        'multiple' => 'Reviews',
    ],
];
