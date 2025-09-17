@extends('admin.layouts.app')

@section('title', 'Create Testimonial')
@section('page-title', 'Create New Testimonial')

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Create New Testimonial</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('testimonials.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror"
                               id="name" name="name" value="{{ old('name') }}" required>
                        @error('name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="review" class="form-label">Testimonial <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('review') is-invalid @enderror"
                                  id="review" name="review" rows="4" required>{{ old('review') }}</textarea>
                        @error('review')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="rating" class="form-label">Rating <span class="text-danger">*</span></label>
                        <select class="form-control @error('rating') is-invalid @enderror"
                                id="rating" name="rating" required>
                            <option value="">Select Rating</option>
                            @for($i = 1; $i <= 5; $i++)
                                <option value="{{ $i }}" {{ old('rating') == $i ? 'selected' : '' }}>
                                    {{ $i }} Star{{ $i > 1 ? 's' : '' }}
                                </option>
                            @endfor
                        </select>
                        @error('rating')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="date" class="form-label">Date <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('date') is-invalid @enderror"
                               id="date" name="date" value="{{ old('date', date('F Y')) }}"
                               placeholder="e.g., December 2024" required>
                        @error('date')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="photo" class="form-label">Photo (Optional)</label>
                        <input type="file" class="form-control @error('photo') is-invalid @enderror"
                               id="photo" name="photo" accept="image/*">
                        @error('photo')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <div class="form-text">Optional profile picture</div>
                    </div>



                    <div class="d-flex justify-content-between">
                        <a href="{{ route('testimonials.index') }}" class="btn btn-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary">Create Testimonial</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
