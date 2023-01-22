<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public const REVIEW_TEXT_EXCERPT = 90;

    protected $fillable = [
        'title', 'text', 'credentials', 'stars',
    ];

    /**
     * Fix casing for user credentials.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function credentials(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => ucwords($value),
            get: function ($value) {
                // Create initials from user credentials if it's longer than 10 chars
                if (strlen($value) > 10) {
                    $creds = explode(' ', $value);
                    $result = '';

                    foreach ($creds as $key => $cred) {
                        if ($key === 0) {
                            $result .= $cred;
                        } else {
                            $result .= ' '.strtoupper($cred[0]).'.';
                        }
                    }

                    return $result;
                }

                return $value;
            }
        );
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
