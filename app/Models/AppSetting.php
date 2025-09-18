<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
    ];

    protected $casts = [
        'value' => 'string',
    ];

    /**
     * Get a setting value by key
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Set a setting value by key
     */
    public static function set(string $key, $value, string $type = 'text', string $description = null)
    {
        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => $type,
                'description' => $description,
            ]
        );
    }

    /**
     * Get all settings as key-value pairs
     */
    public static function getAllSettings()
    {
        return static::pluck('value', 'key')->toArray();
    }

    /**
     * Get section title and subtitle
     */
    public static function getSection(string $sectionName)
    {
        $title = static::get("section.{$sectionName}.title");
        $subtitle = static::get("section.{$sectionName}.subtitle");
        
        return [
            'title' => $title,
            'subtitle' => $subtitle
        ];
    }

    /**
     * Set section title and subtitle
     */
    public static function setSection(string $sectionName, string $title, string $subtitle)
    {
        static::set("section.{$sectionName}.title", $title, 'text', ucfirst(str_replace('_', ' ', $sectionName)) . ' section title');
        static::set("section.{$sectionName}.subtitle", $subtitle, 'text', ucfirst(str_replace('_', ' ', $sectionName)) . ' section subtitle');
    }

    /**
     * Get all section settings grouped by section
     */
    public static function getAllSections()
    {
        $settings = static::where('key', 'LIKE', 'section.%')->get();
        $sections = [];

        foreach ($settings as $setting) {
            $keyParts = explode('.', $setting->key);
            if (count($keyParts) >= 3) {
                $sectionName = $keyParts[1];
                $type = $keyParts[2]; // title or subtitle
                
                if (!isset($sections[$sectionName])) {
                    $sections[$sectionName] = [];
                }
                
                $sections[$sectionName][$type] = $setting->value;
            }
        }

        return $sections;
    }

    /**
     * Get available section names
     */
    public static function getAvailableSections()
    {
        return [
            'popular_destinations' => 'Popular Destinations',
            'featured_tour_package' => 'Featured Tour Package',
            'car_rent' => 'Car Rent',
            'testimonial' => 'Testimonial'
        ];
    }
}
