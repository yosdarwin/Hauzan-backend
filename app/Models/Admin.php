<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'whatsapp_number',
        'title',
        'department',
        'status_online',
        'sort_order',
    ];

    protected $casts = [
        'status_online' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope to get only online admins
     */
    public function scopeOnline($query)
    {
        return $query->where('status_online', true);
    }

    /**
     * Scope to order by sort order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Get formatted WhatsApp URL
     */
    public function getWhatsappUrlAttribute()
    {
        $number = preg_replace('/[^0-9]/', '', $this->whatsapp_number);
        return "https://wa.me/{$number}";
    }
}
