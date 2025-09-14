@extends('admin.layouts.app')

@section('title', 'Edit Testimonial')
@section('page-title', 'Edit Testimonial')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Edit Testimonial</h2>
    <div>
        <a href="{{ route('testimonials.show', $testimonial) }}" class="btn btn-info">
            <i class="bi bi-eye"></i> View
        </a>
        <a href="{{ route('testimonials.index') }}" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
        </a>
    </div>
</div>

<form action="{{ route('testimonials.update', $testimonial) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    
    <div class="row">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Testimonial Information</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="name" class="form-label">Customer Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror" 
                               id="name" name="name" value="{{ old('name', $testimonial->name) }}" required>
                        @error('name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="location" class="form-label">Location</label>
                        <input type="text" class="form-control @error('location') is-invalid @enderror" 
                               id="location" name="location" value="{{ old('location', $testimonial->location) }}" 
                               placeholder="e.g., Jakarta, Indonesia">
                        @error('location')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="review" class="form-label">Review <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('review') is-invalid @enderror" 
                                  id="review" name="review" rows="4" required 
                                  placeholder="Customer's review or testimonial">{{ old('review', $testimonial->review) }}</textarea>
                        @error('review')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="rating" class="form-label">Rating <span class="text-danger">*</span></label>
                                <select class="form-select @error('rating') is-invalid @enderror" id="rating" name="rating" required>
                                    <option value="">Select Rating</option>
                                    @for($i = 1; $i <= 5; $i++)
                                        <option value="{{ $i }}" {{ old('rating', $testimonial->rating) == $i ? 'selected' : '' }}>
                                            {{ $i }} Star{{ $i > 1 ? 's' : '' }}
                                        </option>
                                    @endfor
                                </select>
                                @error('rating')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="order" class="form-label">Display Order <span class="text-danger">*</span></label>
                                <input type="number" class="form-control @error('order') is-invalid @enderror" 
                                       id="order" name="order" value="{{ old('order', $testimonial->order) }}" 
                                       min="0" required>
                                <div class="form-text">Lower numbers appear first</div>
                                @error('order')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="is_active" name="is_active" 
                                   {{ old('is_active', $testimonial->is_active) ? 'checked' : '' }}>
                            <label class="form-check-label" for="is_active">
                                Active (Show on website)
                            </label>
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
                <div class="card-body">
                    @if($testimonial->photo)
                        <div class="text-center mb-3">
                            <img src="{{ Storage::url($testimonial->photo) }}" 
                                 alt="{{ $testimonial->name }}" 
                                 class="img-fluid rounded-circle shadow-sm"
                                 style="width: 120px; height: 120px; object-fit: cover;">
                            <p class="text-muted mt-2">Current Photo</p>
                        </div>
                    @endif
                    
                    <div class="mb-3">
                        <label for="photo" class="form-label">
                            {{ $testimonial->photo ? 'Replace Photo' : 'Upload Photo' }}
                        </label>
                        <input type="file" class="form-control @error('photo') is-invalid @enderror" 
                               id="photo" name="photo" accept="image/*">
                        <div class="form-text">Max size: 1MB. Formats: JPEG, PNG, JPG, GIF</div>
                        @error('photo')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Rating Preview</h5>
                </div>
                <div class="card-body text-center">
                    <div id="rating-preview" class="mb-2">
                        @for($i = 1; $i <= 5; $i++)
                            <i class="bi bi-star{{ $i <= $testimonial->rating ? '-fill text-warning' : ' text-muted' }} fs-4"></i>
                        @endfor
                    </div>
                    <p class="text-muted mb-0">Rating: <span id="rating-text">{{ $testimonial->rating }}/5</span></p>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-lg"></i> Update Testimonial
                        </button>
                        <a href="{{ route('testimonials.show', $testimonial) }}" class="btn btn-secondary">
                            <i class="bi bi-x-lg"></i> Cancel
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection

@push('scripts')
<script>
document.getElementById('rating').addEventListener('change', function() {
    const rating = parseInt(this.value) || 0;
    const preview = document.getElementById('rating-preview');
    const text = document.getElementById('rating-text');
    
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill text-warning fs-4"></i>';
        } else {
            stars += '<i class="bi bi-star text-muted fs-4"></i>';
        }
    }
    
    preview.innerHTML = stars;
    text.textContent = rating + '/5';
});
</script>
@endpush
