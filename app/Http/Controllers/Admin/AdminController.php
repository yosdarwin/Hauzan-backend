<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::ordered()->get();

        return Inertia::render('settings/admins/index', [
            'admins' => $admins
        ]);
    }

    /**
     * API Index
     */
    public function apiIndex()
    {
        $admins = Admin::ordered()->get();

        return response()->json([
            'admins' => AdminResource::collection($admins)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('settings/admins/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'whatsapp_number' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'status_online' => 'boolean',
        ]);

        Admin::create($validated);

        return redirect()->route('admins.index')
            ->with('success', 'Admin created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        return Inertia::render('settings/admins/show', [
            'admin' => $admin
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        return Inertia::render('settings/admins/edit', [
            'admin' => $admin
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'whatsapp_number' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'status_online' => 'boolean',
        ]);

        $admin->update($validated);

        return redirect()->route('admins.index')
            ->with('success', 'Admin updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();

        return redirect()->route('admins.index')
            ->with('success', 'Admin deleted successfully.');
    }

    /**
     * Toggle admin online status.
     */
    public function toggleStatus(Admin $admin)
    {
        $admin->update([
            'status_online' => !$admin->status_online
        ]);

        return redirect()->back()
            ->with('success', 'Admin status updated successfully.');
    }
}
