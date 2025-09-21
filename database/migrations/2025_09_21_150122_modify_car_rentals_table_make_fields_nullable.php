<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('car_rentals', function (Blueprint $table) {
            $table->json('pricing')->nullable()->change();
            $table->json('features')->nullable()->change();
            $table->boolean('featured')->nullable()->change();
            $table->json('specifications')->nullable()->change();
            $table->json('features_detail')->nullable()->change();
            $table->json('included')->nullable()->change();
            $table->json('terms')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('car_rentals', function (Blueprint $table) {
            $table->json('pricing')->nullable(false)->change();
            $table->json('features')->nullable(false)->change();
            $table->boolean('featured')->default(false)->nullable(false)->change();
            $table->json('specifications')->nullable(false)->change();
            $table->json('features_detail')->nullable(false)->change();
            $table->json('included')->nullable(false)->change();
            $table->json('terms')->nullable(false)->change();
        });
    }
};
