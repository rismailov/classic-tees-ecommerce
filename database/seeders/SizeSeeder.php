<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sizes = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'];

        foreach ($sizes as $size) {
            Size::create(['value' => $size]);
        }
    }
}
