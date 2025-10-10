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
        $tours = TourPackage::latest()->paginate(9);
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
            'full_description' => 'required|string',
            'price' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'featured' => 'nullable|boolean',
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
            'visited_tours_images' => 'nullable|array',
            'visited_tours_images.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'visited_tours_images.*.description' => 'nullable|string|max:255',
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

        // Handle visited tours images
        $visitedToursImages = [];
        if ($request->has('visited_tours_images') && is_array($request->input('visited_tours_images'))) {
            foreach ($request->input('visited_tours_images') as $index => $imageData) {
                if ($request->hasFile("visited_tours_images.{$index}.image")) {
                    $imagePath = $request->file("visited_tours_images.{$index}.image")->store('tours/visited', 'public');
                    $visitedToursImages[] = [
                        'image' => $imagePath,
                        'description' => $imageData['description'] ?? ''
                    ];
                }
            }
        }
        $validated['visited_tours_images'] = $visitedToursImages;

        // Set default value for featured if not provided
        $validated['featured'] = $validated['featured'] ?? false;

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
            'full_description' => 'required|string',
            'price' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'featured' => 'nullable|boolean',
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
            'visited_tours_images' => 'nullable|array',
            'visited_tours_images.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'visited_tours_images.*.description' => 'nullable|string|max:255',
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

        // Handle visited tours images - complete replacement
        if ($request->has('visited_tours_images_data')) {
            $visitedImagesData = json_decode($request->input('visited_tours_images_data'), true);
            $finalVisitedImages = [];

            if (is_array($visitedImagesData)) {
                foreach ($visitedImagesData as $index => $imageData) {
                    if (isset($imageData['is_new']) && $imageData['is_new']) {
                        // Handle new uploaded image
                        if ($request->hasFile("visited_tours_images.{$index}.image")) {
                            $imagePath = $request->file("visited_tours_images.{$index}.image")->store('tours/visited', 'public');
                            $finalVisitedImages[] = [
                                'image' => $imagePath,
                                'description' => $imageData['description'] ?? ''
                            ];
                        }
                    } else {
                        // Handle existing image (preserve or update description)
                        $finalVisitedImages[] = [
                            'image' => $imageData['image'],
                            'description' => $imageData['description'] ?? ''
                        ];
                    }
                }
            }

            // Clean up removed images
            if ($request->has('removed_images')) {
                $removedImages = json_decode($request->input('removed_images'), true);
                if (is_array($removedImages)) {
                    foreach ($removedImages as $imagePath) {
                        if (is_string($imagePath)) {
                            Storage::disk('public')->delete($imagePath);
                        }
                    }
                }
            }

            $validated['visited_tours_images'] = $finalVisitedImages;
        } else {
            // Handle legacy format for backward compatibility
            if ($request->has('visited_tours_images') && is_array($request->input('visited_tours_images'))) {
                $newVisitedToursImages = [];
                foreach ($request->input('visited_tours_images') as $index => $imageData) {
                    if ($request->hasFile("visited_tours_images.{$index}.image")) {
                        $imagePath = $request->file("visited_tours_images.{$index}.image")->store('tours/visited', 'public');
                        $newVisitedToursImages[] = [
                            'image' => $imagePath,
                            'description' => $imageData['description'] ?? ''
                        ];
                    }
                }
                // Add new images to existing ones
                $existingImages = $tour->visited_tours_images ?? [];
                $validated['visited_tours_images'] = array_merge($existingImages, $newVisitedToursImages);
            } else {
                // Remove from validated data if no new images are uploaded
                unset($validated['visited_tours_images']);
            }
        }

        // Set default value for featured if not provided
        $validated['featured'] = $validated['featured'] ?? false;

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

        return redirect()->back()
            ->with('success', 'Tour package updated successfully.');
    }

    public function destroy(TourPackage $tour)
    {
        // Delete main image file
        if ($tour->image) {
            Storage::disk('public')->delete($tour->image);
        }

        // Delete visited tours images
        if ($tour->visited_tours_images && is_array($tour->visited_tours_images)) {
            foreach ($tour->visited_tours_images as $imageData) {
                if (is_array($imageData) && isset($imageData['image'])) {
                    Storage::disk('public')->delete($imageData['image']);
                } elseif (is_string($imageData)) {
                    // Handle legacy format
                    Storage::disk('public')->delete($imageData);
                }
            }
        }

        $tour->delete();

        return redirect()->route('tours.index')
            ->with('success', 'Tour package deleted successfully.');
    }

    public function removeVisitedImage(Request $request, TourPackage $tour)
    {
        $validated = $request->validate([
            'image_path' => 'required|string'
        ]);

        $imagePath = $validated['image_path'];
        $visitedImages = $tour->visited_tours_images ?? [];

        // Find and remove the image
        $found = false;
        foreach ($visitedImages as $key => $imageData) {
            $currentImagePath = is_array($imageData) ? $imageData['image'] : $imageData;
            if ($currentImagePath === $imagePath) {
                // Remove the image from storage
                Storage::disk('public')->delete($imagePath);
                // Remove the image from the array
                unset($visitedImages[$key]);
                $found = true;
                break;
            }
        }

        if ($found) {
            // Reindex the array
            $visitedImages = array_values($visitedImages);
            // Update the tour
            $tour->update(['visited_tours_images' => $visitedImages]);
            return redirect()->back()->with('success', 'Image removed successfully');
        }

        return redirect()->back()->withErrors(['error' => 'Image not found']);
    }
}
