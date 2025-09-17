<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->decimal('price', 10, 0);
            $table->string('duration');
            $table->string('image');
            $table->text('description');
            $table->boolean('featured')->default(false);
            $table->text('full_description');
            $table->json('highlights'); // Array of highlights
            $table->json('itinerary'); // Array of time/activity objects
            $table->json('included'); // Array of included items
            $table->json('not_included'); // Array of not included items
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tour_packages');
    }
};
