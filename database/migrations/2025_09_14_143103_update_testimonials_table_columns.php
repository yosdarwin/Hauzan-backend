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
        Schema::table('testimonials', function (Blueprint $table) {
            $table->renameColumn('comment', 'review');
            $table->renameColumn('date', 'location');
            $table->renameColumn('avatar', 'photo');
            $table->string('email')->nullable()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn('email');
            $table->renameColumn('review', 'comment');
            $table->renameColumn('location', 'date');
            $table->renameColumn('photo', 'avatar');
        });
    }
};
