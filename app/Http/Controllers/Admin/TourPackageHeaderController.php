<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TourPackageHeaderController extends Controller
{
    /**
     * Get tour packages header settings
     */
    public function show(): JsonResponse
    {
        $headerSettings = AppSetting::getSectionWithDescription('tour_packages');

        return response()->json([
            'success' => true,
            'data' => [
                'title' => $headerSettings['title'] ?? 'Tour Packages',
                'subtitle' => $headerSettings['subtitle'] ?? 'Manage your tour packages and destinations',
                'description' => $headerSettings['description'] ?? 'Explore our carefully crafted tour packages that showcase the best experiences.'
            ]
        ]);
    }

    /**
     * Update tour packages header settings
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
                'tour_packages',
                $request->title,
                $request->subtitle,
                $request->description
            );

            return response()->json([
                'success' => true,
                'message' => 'Tour packages header updated successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update tour packages header: ' . $e->getMessage()
            ], 500);
        }
    }

    public function apiIndex(): JsonResponse
    {
        $headerTours = AppSetting::getSectionWithDescription('tour_packages');
        return response()->json([
            'success' => true,
            'data' => $headerTours
        ]);
    }
}
