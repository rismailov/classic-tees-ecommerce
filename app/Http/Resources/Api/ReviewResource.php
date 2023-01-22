<?php

namespace App\Http\Resources\Api;

use App\Models\Review;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'    => $this->id,
            'title' => $this->title,
            'text'  => [
                'excerpt' => Str::limit($this->text, Review::REVIEW_TEXT_EXCERPT),
                'full'    => $this->text,
            ],
            'credentials' => $this->credentials,
            'stars'       => $this->stars,
        ];
    }
}
