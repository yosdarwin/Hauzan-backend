<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AppSettingsController extends Controller
{
    /**
     * Display the app settings page.
     */
    public function index()
    {
        $settings = AppSetting::getAllSettings();

        return Inertia::render('settings/app', [
            'settings' => $settings
        ]);
    }

    /**
     * Update app settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'whatsapp_accept_order' => 'required|boolean',
            'whatsapp_number' => 'nullable|string|max:20',
            'logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Update WhatsApp accept order setting
        AppSetting::set(
            'whatsapp_accept_order',
            $validated['whatsapp_accept_order'] ? '1' : '0',
            'boolean',
        );

        // Update WhatsApp number setting
        if (isset($validated['whatsapp_number'])) {
            AppSetting::set(
                'whatsapp_number',
                $validated['whatsapp_number'],
                'text',
                'WhatsApp number for customer orders'
            );
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            $oldLogo = AppSetting::get('logo');
            if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                Storage::disk('public')->delete($oldLogo);
            }

            // Store new logo
            $logoPath = $request->file('logo')->store('settings', 'public');
            AppSetting::set(
                'logo',
                $logoPath,
                'image',
                'Application logo'
            );
        }

        return redirect()->back()->with('success', 'App settings updated successfully.');
    }

    /**
     * Remove logo.
     */
    public function removeLogo()
    {
        $logo = AppSetting::get('logo');

        if ($logo && Storage::disk('public')->exists($logo)) {
            Storage::disk('public')->delete($logo);
        }

        AppSetting::where('key', 'logo')->delete();

        return redirect()->back()->with('success', 'Logo removed successfully.');
    }
}
