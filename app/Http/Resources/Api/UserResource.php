<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class UserResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'fullName' => $this->fname.' '.$this->lname,
            'email'    => [
                'excerpt' => Str::limit($this->email, 20),
                'full'    => $this->email,
            ],
            'initials' => $this->fname[0].$this->lname[0],
        ];
    }
}
