<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SouvenirHeaderController extends Controller
{
    /**
     * Get souvenirs header settings
     */
    public function show(): JsonResponse
    {
        $headerSettings = AppSetting::getSectionWithDescription('souvenirs');

        return response()->json([
            'success' => true,
            'data' => [
                'title' => $headerSettings['title'] ?? 'Souvenirs',
                'subtitle' => $headerSettings['subtitle'] ?? 'Manage souvenir products and inventory',
                'description' => $headerSettings['description'] ?? 'Browse our collection of authentic local souvenirs and memorable keepsakes.'
            ]
        ]);
    }

    /**
     * Update souvenirs header settings
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
                'souvenirs',
                $request->title,
                $request->subtitle,
                $request->description
            );

            return response()->json([
                'success' => true,
                'message' => 'Souvenirs header updated successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update souvenirs header: ' . $e->getMessage()
            ], 500);
        }
    }

    public function apiIndex(): JsonResponse
    {
        $headerSouvenirs = AppSetting::getSectionWithDescription('souvenirs');
        return response()->json([
            'success' => true,
            'data' => $headerSouvenirs
        ]);
    }
}