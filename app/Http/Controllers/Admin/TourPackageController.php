<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourPackageController extends Controller
{
    public function index()
    {
        $tours = TourPackage::latest()->get();
        return Inertia::render('tours/index', [
            'tours' => $tours
        ]);
    }

    public function create()
    {
        return Inertia::render('tours/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:tour_packages,slug|max:255',
            'description' => 'required|string',
            'full_description' => 'required|string',
            'price' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'highlights' => 'nullable|array',
            'highlights.*' => 'nullable|string',
            'itinerary' => 'nullable|array',
            'itinerary.*.day' => 'nullable|integer',
            'itinerary.*.time' => 'nullable|string',
            'itinerary.*.activity' => 'nullable|string',
            'included' => 'nullable|array',
            'included.*' => 'nullable|string',
            'not_included' => 'nullable|array',
            'not_included.*' => 'nullable|string',
        ]);

        // Auto-generate slug from title if not provided
        if (empty($validated['slug'])) {
            $baseSlug = Str::slug($validated['title']);
            $slug = $baseSlug;
            $counter = 1;

            // Ensure slug is unique
            while (TourPackage::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('tours', 'public');
            $validated['image'] = $imagePath;
        }

        // Set default value for featured
        $validated['featured'] = false;

        // Filter out empty arrays and let model casting handle JSON conversion
        if (empty($validated['highlights']) || (count($validated['highlights']) === 1 && empty($validated['highlights'][0]))) {
            $validated['highlights'] = [];
        }
        if (empty($validated['included']) || (count($validated['included']) === 1 && empty($validated['included'][0]))) {
            $validated['included'] = [];
        }
        if (empty($validated['not_included']) || (count($validated['not_included']) === 1 && empty($validated['not_included'][0]))) {
            $validated['not_included'] = [];
        }
        if (empty($validated['itinerary'])) {
            $validated['itinerary'] = [];
        }

        TourPackage::create($validated);

        return redirect()->route('tours.index')
            ->with('success', 'Tour package created successfully.');
    }

    public function show(TourPackage $tour)
    {
        return Inertia::render('tours/show', [
            'tour' => $tour
        ]);
    }

    public function edit(TourPackage $tour)
    {
        return Inertia::render('tours/edit', [
            'tour' => $tour
        ]);
    }

    public function update(Request $request, TourPackage $tour)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:tour_packages,slug,' . $tour->id . '|max:255',
            'description' => 'required|string',
            'full_description' => 'required|string',
            'price' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'highlights' => 'nullable|array',
            'highlights.*' => 'nullable|string',
            'itinerary' => 'nullable|array',
            'itinerary.*.day' => 'nullable|integer',
            'itinerary.*.time' => 'nullable|string',
            'itinerary.*.activity' => 'nullable|string',
            'included' => 'nullable|array',
            'included.*' => 'nullable|string',
            'not_included' => 'nullable|array',
            'not_included.*' => 'nullable|string',
        ]);

        // Auto-generate slug from title if not provided
        if (empty($validated['slug'])) {
            $baseSlug = Str::slug($validated['title']);
            $slug = $baseSlug;
            $counter = 1;

            // Ensure slug is unique (excluding current tour)
            while (TourPackage::where('slug', $slug)->where('id', '!=', $tour->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        if ($request->hasFile('image')) {
            // Delete old image
            if ($tour->image) {
                Storage::disk('public')->delete($tour->image);
            }
            $imagePath = $request->file('image')->store('tours', 'public');
            $validated['image'] = $imagePath;
        } else {
            // Remove image from validated data if no new image is uploaded
            unset($validated['image']);
        }

        // Set default value for featured
        $validated['featured'] = false;

        // Filter out empty arrays and let model casting handle JSON conversion
        if (empty($validated['highlights']) || (count($validated['highlights']) === 1 && empty($validated['highlights'][0]))) {
            $validated['highlights'] = [];
        }
        if (empty($validated['included']) || (count($validated['included']) === 1 && empty($validated['included'][0]))) {
            $validated['included'] = [];
        }
        if (empty($validated['not_included']) || (count($validated['not_included']) === 1 && empty($validated['not_included'][0]))) {
            $validated['not_included'] = [];
        }
        if (empty($validated['itinerary'])) {
            $validated['itinerary'] = [];
        }

        $tour->update($validated);

        return redirect()->route('tours.index')
            ->with('success', 'Tour package updated successfully.');
    }

    public function destroy(TourPackage $tour)
    {
        // Delete image file
        if ($tour->image) {
            Storage::disk('public')->delete($tour->image);
        }

        $tour->delete();

        return redirect()->route('tours.index')
            ->with('success', 'Tour package deleted successfully.');
    }
}
