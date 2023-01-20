<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['url', 'order'];

    public function url(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => config('app.url').$value
        );
    }

    public function imageable()
    {
        return $this->morphTo();
    }

    // TODO: add main image getter (by order)
}
