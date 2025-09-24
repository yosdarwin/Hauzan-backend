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
        $welcomeSection = AppSetting::getWelcomeSection();

        return Inertia::render('settings/sections/index', [
            'sections' => $sections,
            'availableSections' => $availableSections,
            'welcome_section' => $welcomeSection
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
            'welcome_section' => 'required|array',
            'welcome_section.title' => 'required|string|max:255',
            'welcome_section.subtitle' => 'required|string|max:500',
            'welcome_section.video_url' => 'required|url|max:500',
        ]);

        foreach ($request->sections as $sectionName => $data) {
            AppSetting::setSection($sectionName, $data['title'], $data['subtitle']);
        }

        // Update welcome section
        AppSetting::setWelcomeSection(
            $request->welcome_section['title'],
            $request->welcome_section['subtitle'],
            $request->welcome_section['video_url']
        );

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

    /**
     * Display the welcome section settings page
     */
    public function welcomeShow()
    {
        $welcomeSection = AppSetting::getWelcomeSection();

        return Inertia::render('settings/sections/welcome', [
            'welcome_section' => $welcomeSection
        ]);
    }

    /**
     * Update welcome section settings
     */
    public function welcomeUpdate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:500',
            'video_url' => 'required|url|max:500',
        ]);

        AppSetting::setWelcomeSection(
            $validated['title'],
            $validated['subtitle'],
            $validated['video_url']
        );

        return redirect()->back()->with('success', 'Welcome section settings updated successfully!');
    }

    /**
     * Get welcome section for API
     */
    public function apiWelcomeSection()
    {
        $welcomeSection = AppSetting::getWelcomeSection();

        return response()->json([
            'welcome_section' => $welcomeSection
        ]);
    }
}
