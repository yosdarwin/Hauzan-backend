@extends('admin.layouts.app')

@section('title', 'Edit Tour Package')
@section('page-title', 'Edit Tour Package')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Edit Tour Package</h2>
    <div>
        <a href="{{ route('tours.show', $tour) }}" class="btn btn-info">
            <i class="bi bi-eye"></i> View
        </a>
        <a href="{{ route('tours.index') }}" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
        </a>
    </div>
</div>

<form action="{{ route('tours.update', $tour) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    
    <div class="row">
        <div class="col-lg-8">
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Basic Information</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror" 
                               id="title" name="title" value="{{ old('title', $tour->title) }}" required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="slug" class="form-label">Slug</label>
                        <input type="text" class="form-control @error('slug') is-invalid @enderror" 
                               id="slug" name="slug" value="{{ old('slug', $tour->slug) }}">
                        <div class="form-text">Leave empty to auto-generate from title</div>
                        @error('slug')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="price" class="form-label">Price <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('price') is-invalid @enderror" 
                                       id="price" name="price" value="{{ old('price', $tour->price) }}" required>
                                @error('price')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="duration" class="form-label">Duration <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('duration') is-invalid @enderror" 
                                       id="duration" name="duration" value="{{ old('duration', $tour->duration) }}" required>
                                @error('duration')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Short Description <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('description') is-invalid @enderror" 
                                  id="description" name="description" rows="3" required>{{ old('description', $tour->description) }}</textarea>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="full_description" class="form-label">Full Description <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('full_description') is-invalid @enderror" 
                                  id="full_description" name="full_description" rows="5" required>{{ old('full_description', $tour->full_description) }}</textarea>
                        @error('full_description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="featured" name="featured" 
                                       {{ old('featured', $tour->featured) ? 'checked' : '' }}>
                                <label class="form-check-label" for="featured">
                                    Featured Tour
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="is_active" name="is_active" 
                                       {{ old('is_active', $tour->is_active) ? 'checked' : '' }}>
                                <label class="form-check-label" for="is_active">
                                    Active
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Highlights</h5>
                </div>
                <div class="card-body">
                    <div id="highlights-container">
                        @if(old('highlights', $tour->highlights))
                            @foreach(old('highlights', $tour->highlights) as $index => $highlight)
                                <div class="input-group mb-2 highlight-item">
                                    <input type="text" class="form-control" name="highlights[]" value="{{ $highlight }}" required>
                                    <button class="btn btn-outline-danger" type="button" onclick="removeHighlight(this)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            @endforeach
                        @else
                            <div class="input-group mb-2 highlight-item">
                                <input type="text" class="form-control" name="highlights[]" required>
                                <button class="btn btn-outline-danger" type="button" onclick="removeHighlight(this)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        @endif
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="addHighlight()">
                        <i class="bi bi-plus"></i> Add Highlight
                    </button>
                    @error('highlights')
                        <div class="text-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Itinerary</h5>
                </div>
                <div class="card-body">
                    <div id="itinerary-container">
                        @if(old('itinerary', $tour->itinerary))
                            @foreach(old('itinerary', $tour->itinerary) as $index => $item)
                                <div class="row mb-2 itinerary-item">
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" name="itinerary[{{ $index }}][time]" 
                                               placeholder="Time" value="{{ $item['time'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" name="itinerary[{{ $index }}][activity]" 
                                               placeholder="Activity" value="{{ $item['activity'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-1">
                                        <button class="btn btn-outline-danger" type="button" onclick="removeItinerary(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            @endforeach
                        @else
                            <div class="row mb-2 itinerary-item">
                                <div class="col-md-3">
                                    <input type="text" class="form-control" name="itinerary[0][time]" placeholder="Time" required>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="itinerary[0][activity]" placeholder="Activity" required>
                                </div>
                                <div class="col-md-1">
                                    <button class="btn btn-outline-danger" type="button" onclick="removeItinerary(this)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        @endif
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="addItinerary()">
                        <i class="bi bi-plus"></i> Add Itinerary Item
                    </button>
                    @error('itinerary')
                        <div class="text-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0 text-success">Included</h5>
                        </div>
                        <div class="card-body">
                            <div id="included-container">
                                @if(old('included', $tour->included))
                                    @foreach(old('included', $tour->included) as $index => $item)
                                        <div class="input-group mb-2 included-item">
                                            <input type="text" class="form-control" name="included[]" value="{{ $item }}" required>
                                            <button class="btn btn-outline-danger" type="button" onclick="removeIncluded(this)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    @endforeach
                                @else
                                    <div class="input-group mb-2 included-item">
                                        <input type="text" class="form-control" name="included[]" required>
                                        <button class="btn btn-outline-danger" type="button" onclick="removeIncluded(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                @endif
                            </div>
                            <button type="button" class="btn btn-outline-success btn-sm" onclick="addIncluded()">
                                <i class="bi bi-plus"></i> Add Item
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0 text-danger">Not Included</h5>
                        </div>
                        <div class="card-body">
                            <div id="not-included-container">
                                @if(old('not_included', $tour->not_included))
                                    @foreach(old('not_included', $tour->not_included) as $index => $item)
                                        <div class="input-group mb-2 not-included-item">
                                            <input type="text" class="form-control" name="not_included[]" value="{{ $item }}" required>
                                            <button class="btn btn-outline-danger" type="button" onclick="removeNotIncluded(this)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    @endforeach
                                @else
                                    <div class="input-group mb-2 not-included-item">
                                        <input type="text" class="form-control" name="not_included[]" required>
                                        <button class="btn btn-outline-danger" type="button" onclick="removeNotIncluded(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                @endif
                            </div>
                            <button type="button" class="btn btn-outline-danger btn-sm" onclick="addNotIncluded()">
                                <i class="bi bi-plus"></i> Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Tour Image</h5>
                </div>
                <div class="card-body">
                    @if($tour->image)
                        <div class="text-center mb-3">
                            <img src="{{ Storage::url($tour->image) }}" 
                                 alt="{{ $tour->title }}" 
                                 class="img-fluid rounded shadow-sm"
                                 style="max-height: 200px;">
                            <p class="text-muted mt-2">Current Image</p>
                        </div>
                    @endif
                    
                    <div class="mb-3">
                        <label for="image" class="form-label">
                            {{ $tour->image ? 'Replace Image' : 'Upload Image' }}
                        </label>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" 
                               id="image" name="image" accept="image/*">
                        <div class="form-text">Max size: 2MB. Formats: JPEG, PNG, JPG, GIF, WebP</div>
                        @error('image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-lg"></i> Update Tour Package
                        </button>
                        <a href="{{ route('tours.show', $tour) }}" class="btn btn-secondary">
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
let highlightIndex = {{ count(old('highlights', $tour->highlights ?? [])) }};
let itineraryIndex = {{ count(old('itinerary', $tour->itinerary ?? [])) }};

function addHighlight() {
    const container = document.getElementById('highlights-container');
    const div = document.createElement('div');
    div.className = 'input-group mb-2 highlight-item';
    div.innerHTML = `
        <input type="text" class="form-control" name="highlights[]" required>
        <button class="btn btn-outline-danger" type="button" onclick="removeHighlight(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeHighlight(button) {
    if (document.querySelectorAll('.highlight-item').length > 1) {
        button.closest('.highlight-item').remove();
    }
}

function addItinerary() {
    const container = document.getElementById('itinerary-container');
    const div = document.createElement('div');
    div.className = 'row mb-2 itinerary-item';
    div.innerHTML = `
        <div class="col-md-3">
            <input type="text" class="form-control" name="itinerary[${itineraryIndex}][time]" placeholder="Time" required>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" name="itinerary[${itineraryIndex}][activity]" placeholder="Activity" required>
        </div>
        <div class="col-md-1">
            <button class="btn btn-outline-danger" type="button" onclick="removeItinerary(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
    itineraryIndex++;
}

function removeItinerary(button) {
    if (document.querySelectorAll('.itinerary-item').length > 1) {
        button.closest('.itinerary-item').remove();
    }
}

function addIncluded() {
    const container = document.getElementById('included-container');
    const div = document.createElement('div');
    div.className = 'input-group mb-2 included-item';
    div.innerHTML = `
        <input type="text" class="form-control" name="included[]" required>
        <button class="btn btn-outline-danger" type="button" onclick="removeIncluded(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeIncluded(button) {
    if (document.querySelectorAll('.included-item').length > 1) {
        button.closest('.included-item').remove();
    }
}

function addNotIncluded() {
    const container = document.getElementById('not-included-container');
    const div = document.createElement('div');
    div.className = 'input-group mb-2 not-included-item';
    div.innerHTML = `
        <input type="text" class="form-control" name="not_included[]" required>
        <button class="btn btn-outline-danger" type="button" onclick="removeNotIncluded(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeNotIncluded(button) {
    if (document.querySelectorAll('.not-included-item').length > 1) {
        button.closest('.not-included-item').remove();
    }
}
</script>
@endpush
