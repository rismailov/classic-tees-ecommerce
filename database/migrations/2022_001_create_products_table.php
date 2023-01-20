<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nanoid')->unique();
            $table->string('name')->unique();
            $table->text('description');
            $table->string('category');
            $table->unsignedDecimal('price', 9, 2);
            $table->boolean('is_discounted')->default(false);
            $table->tinyInteger('discount_percent')->nullable();
            $table->unsignedDecimal('discount_price', 9, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
