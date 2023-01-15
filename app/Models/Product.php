<?php

namespace App\Models;

use App\Casts\Date;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'nanoid', 'category', 'name', 'price',
    ];

    protected $casts = [
        'created_at' => Date::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(
            function ($product) {
                if (empty($product->nanoid)) {
                    $product->nanoid = bin2hex(random_bytes(10));
                }
            }
        );
    }

    /**
     * Get human readable category name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function category(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => __('models.categories.'.$value)
        );
    }

    /**
     * Get human readable category name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function colour(): Attribute
    {
        return Attribute::make(
            get: fn () => [
                'value' => (string) $this->colours->first()->id,
                'label' => __('models.colours.'.$this->colours->first()->value),
            ]
        );
    }

    // Relations
    public function colours()
    {
        return $this->belongsToMany(Colour::class);
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable')
            ->orderBy('order', 'asc');
    }

    public function discounts()
    {
        return $this->belongsTo(Discount::class);
    }
}
