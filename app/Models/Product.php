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
        'nanoid',
        'category',
        'name',
        'price',
        'is_discounted',
        'discount_percent',
    ];

    protected $hidden = [
        'discount_percent',
    ];

    protected $attributes = [
        'discounted_price',
    ];

    protected $casts = [
        'created_at' => Date::class,
    ];

    public const MIN_DISCOUNT = 5;

    public const MAX_DISCOUNT = 50;

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
     * Get human readable colour name.
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

    /**
     * Get human readable colour name.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function discountedPrice(): Attribute
    {
        $discounted_price = null;

        if ($this->is_discounted) {
            $percent_in_float = bcdiv((string) $this->discount_percent, '100', 3);
            $price_difference = bcmul($this->price, $percent_in_float, 2);
            $discounted_price = bcsub($this->price, $price_difference, 2);
        }

        return Attribute::make(
            get: fn () => $discounted_price,
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
}
