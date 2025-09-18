<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::all();
        return Inertia::render('sliders/index', [
            'sliders' => $sliders
        ]);
    }

    public function create()
    {
        return Inertia::render('sliders/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('sliders', 'public');
        }

        $validated['is_active'] = $request->has('is_active');

        Slider::create($validated);

        return redirect()->route('sliders.index')
            ->with('success', 'Slider created successfully.');
    }

    public function show(Slider $slider)
    {
        return Inertia::render('sliders/show', [
            'slider' => $slider
        ]);
    }

    public function edit(Slider $slider)
    {
        return Inertia::render('sliders/edit', [
            'slider' => $slider
        ]);
    }

    public function update(Request $request, Slider $slider)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($slider->image) {
                Storage::disk('public')->delete($slider->image);
            }
            $validated['image'] = $request->file('image')->store('sliders', 'public');
        } else {
            // Remove image from validated data if no new image is uploaded
            // This prevents trying to set the image column to null
            unset($validated['image']);
        }

        $validated['is_active'] = $request->has('is_active');

        $slider->update($validated);

        return redirect()->route('sliders.index')
            ->with('success', 'Slider updated successfully.');
    }

    public function destroy(Slider $slider)
    {
        if ($slider->image) {
            Storage::disk('public')->delete($slider->image);
        }

        $slider->delete();

        return redirect()->route('sliders.index')
            ->with('success', 'Slider deleted successfully.');
    }
}
