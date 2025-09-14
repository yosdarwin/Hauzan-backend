<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_contents', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->text('company_address');
            $table->year('founded_year');
            $table->string('owner_director');
            $table->text('legality');
            $table->string('email');
            $table->string('phone');
            $table->string('social_media');
            $table->text('vision');
            $table->json('missions'); // Store missions as JSON array
            $table->string('hero_image');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_contents');
    }
};