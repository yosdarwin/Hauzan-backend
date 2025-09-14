<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $about = AboutContent::first();
        return Inertia::render('about/index', [
            'about' => $about
        ]);
    }

    public function edit()
    {
        $about = AboutContent::getContent();
        return Inertia::render('about/edit', [
            'about' => $about
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_address' => 'required|string',
            'founded_year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'owner_director' => 'required|string|max:255',
            'legality' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'social_media' => 'required|string|max:255',
            'vision' => 'required|string',
            'missions' => 'required|array',
            'missions.*' => 'required|string',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $about = AboutContent::first();

        if ($request->hasFile('hero_image')) {
            // Delete old image
            if ($about && $about->hero_image) {
                Storage::disk('public')->delete($about->hero_image);
            }
            $imagePath = $request->file('hero_image')->store('about', 'public');
            $validated['hero_image'] = $imagePath;
        }

        if ($about) {
            $about->update($validated);
        } else {
            AboutContent::create($validated);
        }

        return redirect()->route('about.index')
            ->with('success', 'About content updated successfully.');
    }
}

