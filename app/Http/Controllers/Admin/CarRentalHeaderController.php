<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;

class CarRentalHeaderController extends Controller
{
    /**
     * Show car rentals header settings page
     */
    public function show(): View
    {
        return view('admin.cars.header');
    }

    /**
     * Get car rentals header settings (API)
     */
    public function getSettings(): JsonResponse
    {
        $headerSettings = AppSetting::getSectionWithDescription('car_rent');

        return response()->json([
            'success' => true,
            'data' => [
                'title' => $headerSettings['title'] ?? 'Car Rentals',
                'subtitle' => $headerSettings['subtitle'] ?? 'Manage your car rental fleet',
                'description' => $headerSettings['description'] ?? 'Explore our premium car rental options for comfortable and reliable transportation.'
            ]
        ]);
    }

    /**
     * Update car rentals header settings
     */
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:500',
            'description' => 'required|string|max:1000',
        ]);

        try {
            AppSetting::setSectionWithDescription(
                'car_rent',
                $request->title,
                $request->subtitle,
                $request->description
            );

            return response()->json([
                'success' => true,
                'message' => 'Car rentals header updated successfully!'
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to update car rentals header: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Database connection error. Please check your database configuration.'
            ], 500);
        }
    }

    public function apiIndex(): JsonResponse
    {
        try {
            $headerSettings = AppSetting::getSectionWithDescription('car_rent');
            return response()->json([
                'success' => true,
                'data' => [
                    'title' => $headerSettings['title'] ?? 'Car Rentals',
                    'subtitle' => $headerSettings['subtitle'] ?? 'Manage your car rental fleet',
                    'description' => $headerSettings['description'] ?? 'Explore our premium car rental options for comfortable and reliable transportation.'
                ]
            ]);
        } catch (\Exception $e) {
            // Return default values if database is not available
            return response()->json([
                'success' => true,
                'data' => [
                    'title' => 'Car Rentals',
                    'subtitle' => 'Manage your car rental fleet',
                    'description' => 'Explore our premium car rental options for comfortable and reliable transportation.'
                ]
            ]);
        }
    }
}