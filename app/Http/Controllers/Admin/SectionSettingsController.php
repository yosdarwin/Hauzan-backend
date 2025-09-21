<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionSettingsController extends Controller
{
    /**
     * Display the section settings management page
     */
    public function index()
    {
        $sections = AppSetting::getAllSections();
        $availableSections = AppSetting::getAvailableSections();

        return Inertia::render('settings/sections/index', [
            'sections' => $sections,
            'availableSections' => $availableSections
        ]);
    }

    /**
     * Update section settings
     */
    public function update(Request $request)
    {
        $request->validate([
            'sections' => 'required|array',
            'sections.*.title' => 'required|string|max:255',
            'sections.*.subtitle' => 'required|string|max:500',
        ]);

        foreach ($request->sections as $sectionName => $data) {
            AppSetting::setSection($sectionName, $data['title'], $data['subtitle']);
        }

        return redirect()->back()->with('success', 'Section settings updated successfully!');
    }

    /**
     * Get section settings for API
     */
    public function apiIndex()
    {
        return response()->json([
            AppSetting::getAllSections()
        ]);
    }

    /**
     * Get specific section for API
     */
    public function apiShow($sectionName)
    {
        $section = AppSetting::getSection($sectionName);

        if (!$section['title'] && !$section['subtitle']) {
            return response()->json(['message' => 'Section not found'], 404);
        }

        return response()->json([
            'section' => $section
        ]);
    }
}
