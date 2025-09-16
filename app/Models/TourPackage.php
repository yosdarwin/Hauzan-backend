<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TourPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'price',
        'duration',
        'location',
        'image',
        'description',
        'featured',
        'full_description',
        'highlights',
        'itinerary',
        'included',
        'not_included',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'highlights' => 'array',
        'itinerary' => 'array',
        'included' => 'array',
        'not_included' => 'array',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title') && empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
