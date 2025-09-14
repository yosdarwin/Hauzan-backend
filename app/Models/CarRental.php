<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CarRental extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'price',
        'duration',
        'image',
        'description',
        'features',
        'featured',
        'full_description',
        'specifications',
        'features_detail',
        'included',
        'terms',
        'pricing',
        'is_active',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'features' => 'array',
        'specifications' => 'array',
        'features_detail' => 'array',
        'included' => 'array',
        'terms' => 'array',
        'pricing' => 'array',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

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