<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\SectionSettingsController;
use App\Http\Controllers\Admin\TourPackageHeaderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// App Settings API
Route::get('admin-settings', [AdminController::class, 'apiIndex']);

// Section Settings API
Route::get('sections', [SectionSettingsController::class, 'apiIndex']);
Route::get('sections/{section}', [SectionSettingsController::class, 'apiShow']);

// Tour Packages Header API
Route::get('tours/header', [TourPackageHeaderController::class, 'show']);
Route::put('tours/header', [TourPackageHeaderController::class, 'update']);