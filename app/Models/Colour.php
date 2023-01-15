<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colour extends Model
{
    use HasFactory;

    protected $fillable = ['value', 'hex_code'];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
