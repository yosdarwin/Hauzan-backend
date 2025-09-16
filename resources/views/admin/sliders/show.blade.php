@extends('admin.layouts.app')

@section('title', 'View Slider')
@section('page-title', 'View Slider')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Slider Details</h2>
    <div>
        <a href="{{ route('sliders.edit', $slider) }}" class="btn btn-warning">
            <i class="bi bi-pencil"></i> Edit
        </a>
        <a href="{{ route('sliders.index') }}" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Slider Information</h5>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Title:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $slider->title }}
                    </div>
                </div>

                @if($slider->subtitle)
                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Subtitle:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $slider->subtitle }}
                    </div>
                </div>
                @endif

                @if($slider->button_text)
                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Button Text:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $slider->button_text }}
                    </div>
                </div>
                @endif

                @if($slider->button_link)
                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Button Link:</strong>
                    </div>
                    <div class="col-sm-9">
                        <a href="{{ $slider->button_link }}" target="_blank" class="text-decoration-none">
                            {{ $slider->button_link }} <i class="bi bi-box-arrow-up-right"></i>
                        </a>
                    </div>
                </div>
                @endif

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Status:</strong>
                    </div>
                    <div class="col-sm-9">
                        @if($slider->is_active)
                            <span class="badge bg-success">Active</span>
                        @else
                            <span class="badge bg-secondary">Inactive</span>
                        @endif
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Created:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $slider->created_at->format('M d, Y \a\t H:i') }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Last Updated:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $slider->updated_at->format('M d, Y \a\t H:i') }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Slider Image</h5>
            </div>
            <div class="card-body text-center">
                @if($slider->image)
                    <img src="{{ Storage::url($slider->image) }}" 
                         alt="{{ $slider->title }}" 
                         class="img-fluid rounded shadow-sm"
                         style="max-height: 300px;">
                @else
                    <div class="text-muted">
                        <i class="bi bi-image display-4"></i>
                        <p class="mt-2">No image uploaded</p>
                    </div>
                @endif
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h5 class="card-title mb-0">Actions</h5>
            </div>
            <div class="card-body">
                <div class="d-grid gap-2">
                    <a href="{{ route('sliders.edit', $slider) }}" class="btn btn-warning">
                        <i class="bi bi-pencil"></i> Edit Slider
                    </a>
                    <form action="{{ route('sliders.destroy', $slider) }}" 
                          method="POST" 
                          onsubmit="return confirm('Are you sure you want to delete this slider?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger w-100">
                            <i class="bi bi-trash"></i> Delete Slider
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
