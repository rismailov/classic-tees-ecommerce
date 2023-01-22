<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colour extends Model
{
    use HasFactory;

    protected $fillable = ['value', 'hex_code'];

    /**
     * Convert colour value to snake case (with hyphen delimiter).
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function value(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => str(strtolower($value))->snake('-'),
        );
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
