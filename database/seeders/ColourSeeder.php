<?php

namespace Database\Seeders;

use App\Models\Colour;
use Illuminate\Database\Seeder;

class ColourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Colours taken from:
        // https://trueclassictees.com/collections/polos
        $colours = [
            ['value' => 'black', 'hex_code' => '#000000'],
            ['value' => 'white', 'hex_code' => '#ffffff'],
            ['value' => 'yellow', 'hex_code' => '#ffff00'],
            ['value' => 'light-gray', 'hex_code' => '#D3D3D3'],
            ['value' => 'navy', 'hex_code' => '#0b0b43'],
            ['value' => 'military-beige', 'hex_code' => '#b29d69'],
            ['value' => 'raspberry', 'hex_code' => '#80444C'],
            ['value' => 'dark-purple', 'hex_code' => '#5e454d'],
            ['value' => 'dusty-pink', 'hex_code' => '#d8c5be'],
            ['value' => 'electric-blue', 'hex_code' => '#1e80c7'],
            ['value' => 'emerald', 'hex_code' => '#3b8272'],
            ['value' => 'sage', 'hex_code' => '#658e6c'],
            ['value' => 'burgundy', 'hex_code' => '#62313a'],
            ['value' => 'gray', 'hex_code' => '#808080'],
        ];

        foreach ($colours as $colour) {
            Colour::create($colour);
        }
    }
}
