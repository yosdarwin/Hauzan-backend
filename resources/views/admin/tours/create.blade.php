@extends('admin.layouts.app')

@section('title', 'Create Tour Package')
@section('page-title', 'Create New Tour Package')

@section('content')
<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">Create New Tour Package</h5>
    </div>
    <div class="card-body">
        <form action="{{ route('tours.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror"
                               id="title" name="title" value="{{ old('title') }}" required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="slug" class="form-label">Slug (Optional)</label>
                        <input type="text" class="form-control @error('slug') is-invalid @enderror"
                               id="slug" name="slug" value="{{ old('slug') }}">
                        @error('slug')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <div class="form-text">Leave empty to auto-generate from title</div>
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Price <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('price') is-invalid @enderror"
                               id="price" name="price" value="{{ old('price') }}" placeholder="Rp. 350.000" required>
                        @error('price')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="duration" class="form-label">Duration <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('duration') is-invalid @enderror"
                               id="duration" name="duration" value="{{ old('duration') }}" placeholder="1 Day" required>
                        @error('duration')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="image" class="form-label">Image <span class="text-danger">*</span></label>
                        <input type="file" class="form-control @error('image') is-invalid @enderror"
                               id="image" name="image" accept="image/*" required>
                        @error('image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Short Description <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('description') is-invalid @enderror"
                                  id="description" name="description" rows="3" required>{{ old('description') }}</textarea>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="featured" name="featured" value="1"
                                   {{ old('featured') ? 'checked' : '' }}>
                            <label class="form-check-label" for="featured">Featured</label>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="is_active" name="is_active" value="1"
                                   {{ old('is_active', true) ? 'checked' : '' }}>
                            <label class="form-check-label" for="is_active">Active</label>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="full_description" class="form-label">Full Description <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('full_description') is-invalid @enderror"
                                  id="full_description" name="full_description" rows="5" required>{{ old('full_description') }}</textarea>
                        @error('full_description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Highlights <span class="text-danger">*</span></label>
                        <div id="highlights-container">
                            @if(old('highlights'))
                                @foreach(old('highlights') as $index => $highlight)
                                    <div class="highlight-item mb-2">
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="highlights[]" value="{{ $highlight }}" required>
                                            <button type="button" class="btn btn-outline-danger remove-highlight">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                @endforeach
                            @else
                                <div class="highlight-item mb-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="highlights[]" placeholder="Enter highlight" required>
                                        <button type="button" class="btn btn-outline-danger remove-highlight">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            @endif
                        </div>
                        <button type="button" class="btn btn-outline-primary add-highlight">
                            <i class="bi bi-plus"></i> Add Highlight
                        </button>
                    </div>
                </div>
            </div>

            <!-- Simplified form - user can add itinerary, included/not included items after creation -->
            <div class="alert alert-info">
                <i class="bi bi-info-circle"></i> You can add detailed itinerary and included items after creating the tour package.
            </div>

            <!-- Hidden fields for required arrays -->
            <input type="hidden" name="itinerary[0][time]" value="TBD">
            <input type="hidden" name="itinerary[0][activity]" value="To be determined">
            <input type="hidden" name="included[0]" value="Professional guide">
            <input type="hidden" name="not_included[0]" value="Personal expenses">

            <div class="d-flex justify-content-between">
                <a href="{{ route('tours.index') }}" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary">Create Tour Package</button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const highlightsContainer = document.getElementById('highlights-container');
        const addHighlightButton = document.querySelector('.add-highlight');

        addHighlightButton.addEventListener('click', function() {
            const highlightItem = document.createElement('div');
            highlightItem.className = 'highlight-item mb-2';
            highlightItem.innerHTML = `
                <div class="input-group">
                    <input type="text" class="form-control" name="highlights[]" placeholder="Enter highlight" required>
                    <button type="button" class="btn btn-outline-danger remove-highlight">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            highlightsContainer.appendChild(highlightItem);
        });

        highlightsContainer.addEventListener('click', function(e) {
            if (e.target.closest('.remove-highlight')) {
                const highlightItems = highlightsContainer.querySelectorAll('.highlight-item');
                if (highlightItems.length > 1) {
                    e.target.closest('.highlight-item').remove();
                }
            }
        });
    });
</script>
@endpush
@endsection
