<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'company_address',
        'founded_year',
        'owner_director',
        'legality',
        'email',
        'phone',
        'social_media',
        'vision',
        'missions',
    ];

    protected $casts = [
        'missions' => 'array',
        'founded_year' => 'integer',
    ];

    // Since there should only be one about content record
    public static function getContent()
    {
        return static::first() ?? new static();
    }
}