<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\TourPackageController;
use App\Http\Controllers\Admin\CarRentalController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\SouvenirController;
use App\Http\Controllers\Admin\AppSettingsController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\SectionSettingsController;
use App\Http\Controllers\Admin\TourPackageHeaderController;
use App\Http\Controllers\Admin\CarRentalHeaderController;
use App\Http\Controllers\Api\TourPackageApiController;
use App\Models\AboutContent;
use App\Models\Slider;
use App\Models\TourPackage;
use App\Models\CarRental;
use App\Models\Testimonial;
use App\Models\Souvenir;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $sliders_count = Slider::count();
        $tours_count = TourPackage::count();
        $cars_count = CarRental::count();
        $testimonials_count = Testimonial::count();
        $souvenirs_count = Souvenir::count();
        $recent_tours = TourPackage::latest()->limit(5)->get();

        return Inertia::render('dashboard', [
            'sliders_count' => $sliders_count,
            'tours_count' => $tours_count,
            'cars_count' => $cars_count,
            'testimonials_count' => $testimonials_count,
            'souvenirs_count' => $souvenirs_count,
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

    // Souvenirs CRUD
    Route::resource('souvenirs', SouvenirController::class);

    // App Settings
    Route::get('settings/app', [AppSettingsController::class, 'index'])->name('app-settings.index');
    Route::put('settings/app', [AppSettingsController::class, 'update'])->name('app-settings.update');
    Route::delete('settings/app/logo', [AppSettingsController::class, 'removeLogo'])->name('app-settings.remove-logo');

    // Admin Management
    Route::resource('settings/admins', AdminController::class)->names([
        'index' => 'admins.index',
        'create' => 'admins.create',
        'store' => 'admins.store',
        'show' => 'admins.show',
        'edit' => 'admins.edit',
        'update' => 'admins.update',
        'destroy' => 'admins.destroy'
    ]);
    Route::patch('settings/admins/{admin}/toggle-status', [AdminController::class, 'toggleStatus'])->name('admins.toggle-status');

    // Section Settings
    Route::get('settings/sections', [SectionSettingsController::class, 'index'])->name('section-settings.index');
    Route::post('settings/sections', [SectionSettingsController::class, 'update'])->name('section-settings.update');

    // Tour Packages Header Settings
    Route::get('tours/header', [TourPackageHeaderController::class, 'show'])->name('tours.header.show');
    Route::put('tours/header', [TourPackageHeaderController::class, 'update'])->name('tours.header.update');

    // Car Rentals Header Settings
    Route::get('cars/header', [CarRentalHeaderController::class, 'show'])->name('cars.header.show');
    Route::get('cars/header/settings', [CarRentalHeaderController::class, 'getSettings'])->name('cars.header.settings');
    Route::put('cars/header', [CarRentalHeaderController::class, 'update'])->name('cars.header.update');
});

// API Routes for React App
Route::prefix('api')->group(function () {
    Route::get('sliders', function () {
        return Slider::active()->get();
    });

    Route::get('about', function () {
        return AboutContent::first();
    });

    // Enhanced Tour Package API Routes
    Route::get('tours', [TourPackageApiController::class, 'index']);
    Route::get('tour/{slug}', [TourPackageApiController::class, 'show']);
    Route::get('tours/popular', [TourPackageApiController::class, 'popular']);
    Route::get('tours/featured', [TourPackageApiController::class, 'featured']);
    Route::get('tours/footer', [TourPackageApiController::class, 'footer']);



    Route::get('cars', function () {
        return CarRental::latest()->paginate(9);
    });

    Route::get('cars/featured', function () {
        return CarRental::latest()->take(3)->get();
    });

    Route::get('cars/{slug}', function ($slug) {
        return CarRental::where('slug', $slug)->firstOrFail();
    });

    Route::get('testimonials', function () {
        return Testimonial::all();
    });

    Route::get('souvenirs', function () {
        return Souvenir::latest()->paginate(9);
    });

    // App Settings API
    Route::get('app-settings', [AppSettingsController::class, 'apiIndex']);
    Route::get('app-settings/logo', [AppSettingsController::class, 'apiLogo']);

    // Tour Packages Header API
    Route::get('tours/header', [TourPackageHeaderController::class, 'apiIndex']);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
