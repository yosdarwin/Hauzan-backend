<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\AppSetting;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add section settings to app_settings table
        $sections = [
            // Popular Destinations Section
            [
                'key' => 'section.popular_destinations.title',
                'value' => 'Popular Destinations',
                'type' => 'text',
                'description' => 'Popular destinations section title'
            ],
            [
                'key' => 'section.popular_destinations.subtitle',
                'value' => 'Discover the most sought-after travel destinations',
                'type' => 'text',
                'description' => 'Popular destinations section subtitle'
            ],
            
            // Featured Tour Package Section
            [
                'key' => 'section.featured_tour_package.title',
                'value' => 'Featured Tour Package',
                'type' => 'text',
                'description' => 'Featured tour package section title'
            ],
            [
                'key' => 'section.featured_tour_package.subtitle',
                'value' => 'Handpicked tour packages for unforgettable experiences',
                'type' => 'text',
                'description' => 'Featured tour package section subtitle'
            ],
            
            // Car Rent Section
            [
                'key' => 'section.car_rent.title',
                'value' => 'Car Rent',
                'type' => 'text',
                'description' => 'Car rent section title'
            ],
            [
                'key' => 'section.car_rent.subtitle',
                'value' => 'Reliable vehicles for your comfortable journey',
                'type' => 'text',
                'description' => 'Car rent section subtitle'
            ],
            
            // Testimonial Section
            [
                'key' => 'section.testimonial.title',
                'value' => 'Testimonial',
                'type' => 'text',
                'description' => 'Testimonial section title'
            ],
            [
                'key' => 'section.testimonial.subtitle',
                'value' => 'What our satisfied customers say about us',
                'type' => 'text',
                'description' => 'Testimonial section subtitle'
            ],
        ];

        foreach ($sections as $section) {
            AppSetting::updateOrCreate(
                ['key' => $section['key']],
                [
                    'value' => $section['value'],
                    'type' => $section['type'],
                    'description' => $section['description']
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove section settings
        AppSetting::where('key', 'LIKE', 'section.%')->delete();
    }
};