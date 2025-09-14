@extends('admin.layouts.app')

@section('title', 'Home Sliders')
@section('page-title', 'Home Sliders')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Home Sliders</h2>
    <a href="{{ route('sliders.create') }}" class="btn btn-primary">
        <i class="bi bi-plus"></i> Add New Slider
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($sliders->count() > 0)
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($sliders as $slider)
                        <tr>
                            <td>
                                <img src="{{ Storage::url($slider->image) }}" 
                                     alt="{{ $slider->title }}" 
                                     style="width: 100px; height: 60px; object-fit: cover;">
                            </td>
                            <td>
                                <strong>{{ $slider->title }}</strong><br>
                                <small class="text-muted">{{ Str::limit($slider->subtitle, 50) }}</small>
                            </td>
                            <td>{{ $slider->order }}</td>
                            <td>
                                @if($slider->is_active)
                                    <span class="badge bg-success">Active</span>
                                @else
                                    <span class="badge bg-secondary">Inactive</span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('sliders.show', $slider) }}" class="btn btn-sm btn-info">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('sliders.edit', $slider) }}" class="btn btn-sm btn-warning">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('sliders.destroy', $slider) }}"
                                          method="POST" 
                                          class="d-inline"
                                          onsubmit="return confirm('Are you sure?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-danger">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div class="text-center py-4">
                <i class="bi bi-images display-4 text-muted"></i>
                <p class="mt-2 text-muted">No sliders found</p>
                <a href="{{ route('sliders.create') }}" class="btn btn-primary">Add First Slider</a>
            </div>
        @endif
    </div>
</div>
@endsection
