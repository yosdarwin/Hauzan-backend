<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class LogoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Extract logo from the settings collection
        $logo = $this->resource->where('key', 'logo')->first()?->value;
        
        return [
            'logo' => $logo,
            'logo_url' => $logo ? Storage::url($logo) : null,
            'has_logo' => !is_null($logo),
        ];
    }
}