@extends('admin.layouts.app')

@section('title', 'View Testimonial')
@section('page-title', 'View Testimonial')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Testimonial Details</h2>
    <div>
        <a href="{{ route('testimonials.edit', $testimonial) }}" class="btn btn-warning">
            <i class="bi bi-pencil"></i> Edit
        </a>
        <a href="{{ route('testimonials.index') }}" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Testimonial Information</h5>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Name:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $testimonial->name }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Date:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $testimonial->date }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Review:</strong>
                    </div>
                    <div class="col-sm-9">
                        <div class="bg-light p-3 rounded">
                            "{{ $testimonial->review }}"
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Rating:</strong>
                    </div>
                    <div class="col-sm-9">
                        <div class="d-flex align-items-center">
                            @for($i = 1; $i <= 5; $i++)
                                @if($i <= $testimonial->rating)
                                    <i class="bi bi-star-fill text-warning me-1"></i>
                                @else
                                    <i class="bi bi-star text-muted me-1"></i>
                                @endif
                            @endfor
                            <span class="ms-2 text-muted">({{ $testimonial->rating }}/5)</span>
                        </div>
                    </div>
                </div>



                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Created:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $testimonial->created_at->format('M d, Y \a\t H:i') }}
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-3">
                        <strong>Last Updated:</strong>
                    </div>
                    <div class="col-sm-9">
                        {{ $testimonial->updated_at->format('M d, Y \a\t H:i') }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Customer Photo</h5>
            </div>
            <div class="card-body text-center">
                @if($testimonial->photo)
                    <img src="{{ Storage::url($testimonial->photo) }}" 
                         alt="{{ $testimonial->name }}" 
                         class="img-fluid rounded-circle shadow-sm"
                         style="width: 150px; height: 150px; object-fit: cover;">
                @else
                    <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                         style="width: 150px; height: 150px;">
                        <i class="bi bi-person display-4 text-white"></i>
                    </div>
                    <p class="text-muted mt-2">No photo uploaded</p>
                @endif
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Quick Stats</h5>
            </div>
            <div class="card-body">
                <div class="row text-center">
                    <div class="col-12">
                        <div class="text-center">
                            <h4 class="text-warning mb-0">{{ $testimonial->rating }}</h4>
                            <small class="text-muted">Rating</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Actions</h5>
            </div>
            <div class="card-body">
                <div class="d-grid gap-2">
                    <a href="{{ route('testimonials.edit', $testimonial) }}" class="btn btn-warning">
                        <i class="bi bi-pencil"></i> Edit Testimonial
                    </a>
                    <form action="{{ route('testimonials.destroy', $testimonial) }}" 
                          method="POST" 
                          onsubmit="return confirm('Are you sure you want to delete this testimonial?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger w-100">
                            <i class="bi bi-trash"></i> Delete Testimonial
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
