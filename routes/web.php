<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\TourPackageController;
use App\Http\Controllers\Admin\CarRentalController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Models\Slider;
use App\Models\TourPackage;
use App\Models\CarRental;
use App\Models\Testimonial;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $sliders_count = Slider::count();
        $tours_count = TourPackage::count();
        $cars_count = CarRental::count();
        $testimonials_count = Testimonial::count();
        $recent_tours = TourPackage::latest()->limit(5)->get();

        return Inertia::render('dashboard', [
            'sliders_count' => $sliders_count,
            'tours_count' => $tours_count,
            'cars_count' => $cars_count,
            'testimonials_count' => $testimonials_count,
            'recent_tours' => $recent_tours,
        ]);
    })->name('dashboard');
});

// Admin CRUD Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Sliders CRUD
    Route::resource('sliders', SliderController::class);

    // About Content
    Route::get('about', [AboutController::class, 'index'])->name('about.index');
    Route::get('about/edit', [AboutController::class, 'edit'])->name('about.edit');
    Route::put('about', [AboutController::class, 'update'])->name('about.update');

    // Tour Packages CRUD
    Route::resource('tours', TourPackageController::class);

    // Car Rentals CRUD
    Route::resource('cars', CarRentalController::class);

    // Testimonials CRUD
    Route::resource('testimonials', TestimonialController::class);
});

// API Routes for React App
Route::prefix('api')->group(function () {
    Route::get('sliders', function () {
        return Slider::active()->get();
    });

    Route::get('about', function () {
        return \App\Models\AboutContent::first();
    });

    Route::get('tours', function () {
        return TourPackage::all();
    });

    Route::get('tours/{slug}', function ($slug) {
        return TourPackage::where('slug', $slug)->firstOrFail();
    });

    Route::get('cars', function () {
        return CarRental::active()->get();
    });

    Route::get('cars/{slug}', function ($slug) {
        return CarRental::where('slug', $slug)->where('is_active', true)->firstOrFail();
    });

    Route::get('testimonials', function () {
        return Testimonial::all();
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
