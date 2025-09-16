<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarRental;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarRentalController extends Controller
{
    public function index()
    {
        $cars = CarRental::latest()->get();
        return Inertia::render('cars/index', [
            'cars' => $cars
        ]);
    }

    public function create()
    {
        return Inertia::render('cars/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'nullable|string|unique:car_rentals,slug|max:255',
            'title' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'required|string',
            'full_description' => 'required|string',
            'specifications' => 'required|array',
            'features_detail' => 'required|array',
            'features_detail.*' => 'required|string',
            'included' => 'required|array',
            'included.*' => 'required|string',
            'terms' => 'required|array',
            'terms.*' => 'required|string',
            'pricing' => 'required|array',
            'pricing.*.duration' => 'required|string',
            'pricing.*.price' => 'required|string',
            'pricing.*.note' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('cars', 'public');
            $validated['image'] = $imagePath;
        }

        CarRental::create($validated);

        return redirect()->route('cars.index')
            ->with('success', 'Car rental created successfully.');
    }

    public function show(CarRental $car)
    {
        return Inertia::render('cars/show', [
            'car' => $car
        ]);
    }

    public function edit(CarRental $car)
    {
        return Inertia::render('cars/edit', [
            'car' => $car
        ]);
    }

    public function update(Request $request, CarRental $car)
    {
        $validated = $request->validate([
            'slug' => 'nullable|string|unique:car_rentals,slug,' . $car->id . '|max:255',
            'title' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'description' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'required|string',
            'full_description' => 'required|string',
            'specifications' => 'required|array',
            'features_detail' => 'required|array',
            'features_detail.*' => 'required|string',
            'included' => 'required|array',
            'included.*' => 'required|string',
            'terms' => 'required|array',
            'terms.*' => 'required|string',
            'pricing' => 'required|array',
            'pricing.*.duration' => 'required|string',
            'pricing.*.price' => 'required|string',
            'pricing.*.note' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($car->image) {
                Storage::disk('public')->delete($car->image);
            }
            $imagePath = $request->file('image')->store('cars', 'public');
            $validated['image'] = $imagePath;
        }

        $car->update($validated);

        return redirect()->route('cars.index')
            ->with('success', 'Car rental updated successfully.');
    }

    public function destroy(CarRental $car)
    {
        // Delete image file
        if ($car->image) {
            Storage::disk('public')->delete($car->image);
        }

        $car->delete();

        return redirect()->route('cars.index')
            ->with('success', 'Car rental deleted successfully.');
    }
}
