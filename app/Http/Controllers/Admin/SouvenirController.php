<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Souvenir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SouvenirController extends Controller
{
    public function index()
    {
        $souvenirs = Souvenir::latest()->paginate(9);
        return Inertia::render('souvenirs/index', [
            'souvenirs' => $souvenirs
        ]);
    }

    public function create()
    {
        return Inertia::render('souvenirs/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:1024',
        ]);

        // Map form fields to database column names
        $data = [
            'name' => $validated['title'],
            'description' => $validated['short_desc'],
            'price' => $validated['price'],
        ];

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('souvenirs', 'public');
            $data['image'] = $imagePath;
        }

        Souvenir::create($data);

        return redirect()->route('souvenirs.index')
            ->with('success', 'Souvenir created successfully.');
    }

    public function show(Souvenir $souvenir)
    {
        return Inertia::render('souvenirs/show', [
            'souvenir' => $souvenir
        ]);
    }

    public function edit(Souvenir $souvenir)
    {
        return Inertia::render('souvenirs/edit', [
            'souvenir' => $souvenir
        ]);
    }

    public function update(Request $request, Souvenir $souvenir)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string',
            'price' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1024',
        ]);

        // Map form fields to database column names
        $data = [
            'name' => $validated['title'],
            'description' => $validated['short_desc'],
            'price' => $validated['price'],
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($souvenir->image) {
                Storage::disk('public')->delete($souvenir->image);
            }
            $imagePath = $request->file('image')->store('souvenirs', 'public');
            $data['image'] = $imagePath;
        }

        $souvenir->update($data);

        return redirect()->route('souvenirs.index')
            ->with('success', 'Souvenir updated successfully.');
    }

    public function destroy(Souvenir $souvenir)
    {
        // Delete image file
        if ($souvenir->image) {
            Storage::disk('public')->delete($souvenir->image);
        }

        $souvenir->delete();

        return redirect()->route('souvenirs.index')
            ->with('success', 'Souvenir deleted successfully.');
    }
}
