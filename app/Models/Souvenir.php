<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Souvenir extends Model
{
    protected $fillable = [
        'image',
        'name',
        'description',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:0',
    ];
}
