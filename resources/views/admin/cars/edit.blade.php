@extends('admin.layouts.app')

@section('title', 'Edit Car Rental')
@section('page-title', 'Edit Car Rental')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Edit Car Rental</h2>
    <div>
        <a href="{{ route('cars.show', $car) }}" class="btn btn-info">
            <i class="bi bi-eye"></i> View
        </a>
        <a href="{{ route('cars.index') }}" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
        </a>
    </div>
</div>

<form action="{{ route('cars.update', $car) }}" method="POST" enctype="multipart/form-data">
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
                               id="title" name="title" value="{{ old('title', $car->title) }}" required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="slug" class="form-label">Slug</label>
                        <input type="text" class="form-control @error('slug') is-invalid @enderror" 
                               id="slug" name="slug" value="{{ old('slug', $car->slug) }}">
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
                                       id="price" name="price" value="{{ old('price', $car->price) }}" required>
                                @error('price')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="duration" class="form-label">Duration <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('duration') is-invalid @enderror" 
                                       id="duration" name="duration" value="{{ old('duration', $car->duration) }}" required>
                                @error('duration')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Short Description <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('description') is-invalid @enderror" 
                                  id="description" name="description" rows="3" required>{{ old('description', $car->description) }}</textarea>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="full_description" class="form-label">Full Description <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('full_description') is-invalid @enderror" 
                                  id="full_description" name="full_description" rows="5" required>{{ old('full_description', $car->full_description) }}</textarea>
                        @error('full_description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="featured" name="featured" 
                                       {{ old('featured', $car->featured) ? 'checked' : '' }}>
                                <label class="form-check-label" for="featured">
                                    Featured Car
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="is_active" name="is_active" 
                                       {{ old('is_active', $car->is_active) ? 'checked' : '' }}>
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
                    <h5 class="card-title mb-0">Features</h5>
                </div>
                <div class="card-body">
                    <div id="features-container">
                        @if(old('features', $car->features))
                            @foreach(old('features', $car->features) as $index => $feature)
                                <div class="input-group mb-2 feature-item">
                                    <input type="text" class="form-control" name="features[]" value="{{ $feature }}" required>
                                    <button class="btn btn-outline-danger" type="button" onclick="removeFeature(this)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            @endforeach
                        @else
                            <div class="input-group mb-2 feature-item">
                                <input type="text" class="form-control" name="features[]" required>
                                <button class="btn btn-outline-danger" type="button" onclick="removeFeature(this)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        @endif
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="addFeature()">
                        <i class="bi bi-plus"></i> Add Feature
                    </button>
                    @error('features')
                        <div class="text-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Specifications</h5>
                </div>
                <div class="card-body">
                    <div id="specifications-container">
                        @if(old('specifications', $car->specifications))
                            @foreach(old('specifications', $car->specifications) as $index => $spec)
                                <div class="row mb-2 specification-item">
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" name="specifications[{{ $index }}][key]" 
                                               placeholder="Specification" value="{{ $spec['key'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text" class="form-control" name="specifications[{{ $index }}][value]" 
                                               placeholder="Value" value="{{ $spec['value'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-1">
                                        <button class="btn btn-outline-danger" type="button" onclick="removeSpecification(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            @endforeach
                        @else
                            <div class="row mb-2 specification-item">
                                <div class="col-md-4">
                                    <input type="text" class="form-control" name="specifications[0][key]" placeholder="Specification" required>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" class="form-control" name="specifications[0][value]" placeholder="Value" required>
                                </div>
                                <div class="col-md-1">
                                    <button class="btn btn-outline-danger" type="button" onclick="removeSpecification(this)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        @endif
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="addSpecification()">
                        <i class="bi bi-plus"></i> Add Specification
                    </button>
                    @error('specifications')
                        <div class="text-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Feature Details</h5>
                </div>
                <div class="card-body">
                    <div id="features-detail-container">
                        @if(old('features_detail', $car->features_detail))
                            @foreach(old('features_detail', $car->features_detail) as $index => $detail)
                                <div class="input-group mb-2 feature-detail-item">
                                    <input type="text" class="form-control" name="features_detail[]" value="{{ $detail }}" required>
                                    <button class="btn btn-outline-danger" type="button" onclick="removeFeatureDetail(this)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            @endforeach
                        @else
                            <div class="input-group mb-2 feature-detail-item">
                                <input type="text" class="form-control" name="features_detail[]" required>
                                <button class="btn btn-outline-danger" type="button" onclick="removeFeatureDetail(this)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        @endif
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="addFeatureDetail()">
                        <i class="bi bi-plus"></i> Add Feature Detail
                    </button>
                    @error('features_detail')
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
                                @if(old('included', $car->included))
                                    @foreach(old('included', $car->included) as $index => $item)
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
                            <h5 class="card-title mb-0 text-warning">Terms</h5>
                        </div>
                        <div class="card-body">
                            <div id="terms-container">
                                @if(old('terms', $car->terms))
                                    @foreach(old('terms', $car->terms) as $index => $term)
                                        <div class="input-group mb-2 term-item">
                                            <input type="text" class="form-control" name="terms[]" value="{{ $term }}" required>
                                            <button class="btn btn-outline-danger" type="button" onclick="removeTerm(this)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    @endforeach
                                @else
                                    <div class="input-group mb-2 term-item">
                                        <input type="text" class="form-control" name="terms[]" required>
                                        <button class="btn btn-outline-danger" type="button" onclick="removeTerm(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                @endif
                            </div>
                            <button type="button" class="btn btn-outline-warning btn-sm" onclick="addTerm()">
                                <i class="bi bi-plus"></i> Add Term
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Pricing</h5>
                </div>
                <div class="card-body">
                    <div id="pricing-container">
                        @if(old('pricing', $car->pricing))
                            @foreach(old('pricing', $car->pricing) as $index => $price)
                                <div class="row mb-2 pricing-item">
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" name="pricing[{{ $index }}][duration]"
                                               placeholder="Duration" value="{{ $price['duration'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" name="pricing[{{ $index }}][price]"
                                               placeholder="Price" value="{{ $price['price'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" class="form-control" name="pricing[{{ $index }}][note]"
                                               placeholder="Note" value="{{ $price['note'] ?? '' }}" required>
                                    </div>
                                    <div class="col-md-1">
                                        <button class="btn btn-outline-danger" type="button" onclick="removePricing(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            @endforeach
                        @else
                            <div class="row mb-2 pricing-item">
                                <div class="col-md-3">
                                    <input type="text" class="form-control" name="pricing[0][duration]" placeholder="Duration" required>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" name="pricing[0][price]" placeholder="Price" required>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" name="pricing[0][note]" placeholder="Note" required>
                                </div>
                                <div class="col-md-1">
                                    <button class="btn btn-outline-danger" type="button" onclick="removePricing(this)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        @endif
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="addPricing()">
                        <i class="bi bi-plus"></i> Add Pricing
                    </button>
                    @error('pricing')
                        <div class="text-danger mt-2">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">Car Image</h5>
                </div>
                <div class="card-body">
                    @if($car->image)
                        <div class="text-center mb-3">
                            <img src="{{ Storage::url($car->image) }}" 
                                 alt="{{ $car->title }}" 
                                 class="img-fluid rounded shadow-sm"
                                 style="max-height: 200px;">
                            <p class="text-muted mt-2">Current Image</p>
                        </div>
                    @endif
                    
                    <div class="mb-3">
                        <label for="image" class="form-label">
                            {{ $car->image ? 'Replace Image' : 'Upload Image' }}
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
                            <i class="bi bi-check-lg"></i> Update Car Rental
                        </button>
                        <a href="{{ route('cars.show', $car) }}" class="btn btn-secondary">
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
let specificationIndex = {{ count(old('specifications', $car->specifications ?? [])) }};
let pricingIndex = {{ count(old('pricing', $car->pricing ?? [])) }};

function addFeature() {
    const container = document.getElementById('features-container');
    const div = document.createElement('div');
    div.className = 'input-group mb-2 feature-item';
    div.innerHTML = `
        <input type="text" class="form-control" name="features[]" required>
        <button class="btn btn-outline-danger" type="button" onclick="removeFeature(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeFeature(button) {
    if (document.querySelectorAll('.feature-item').length > 1) {
        button.closest('.feature-item').remove();
    }
}

function addSpecification() {
    const container = document.getElementById('specifications-container');
    const div = document.createElement('div');
    div.className = 'row mb-2 specification-item';
    div.innerHTML = `
        <div class="col-md-4">
            <input type="text" class="form-control" name="specifications[${specificationIndex}][key]" placeholder="Specification" required>
        </div>
        <div class="col-md-7">
            <input type="text" class="form-control" name="specifications[${specificationIndex}][value]" placeholder="Value" required>
        </div>
        <div class="col-md-1">
            <button class="btn btn-outline-danger" type="button" onclick="removeSpecification(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
    specificationIndex++;
}

function removeSpecification(button) {
    if (document.querySelectorAll('.specification-item').length > 1) {
        button.closest('.specification-item').remove();
    }
}

function addFeatureDetail() {
    const container = document.getElementById('features-detail-container');
    const div = document.createElement('div');
    div.className = 'input-group mb-2 feature-detail-item';
    div.innerHTML = `
        <input type="text" class="form-control" name="features_detail[]" required>
        <button class="btn btn-outline-danger" type="button" onclick="removeFeatureDetail(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeFeatureDetail(button) {
    if (document.querySelectorAll('.feature-detail-item').length > 1) {
        button.closest('.feature-detail-item').remove();
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

function addTerm() {
    const container = document.getElementById('terms-container');
    const div = document.createElement('div');
    div.className = 'input-group mb-2 term-item';
    div.innerHTML = `
        <input type="text" class="form-control" name="terms[]" required>
        <button class="btn btn-outline-danger" type="button" onclick="removeTerm(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeTerm(button) {
    if (document.querySelectorAll('.term-item').length > 1) {
        button.closest('.term-item').remove();
    }
}

function addPricing() {
    const container = document.getElementById('pricing-container');
    const div = document.createElement('div');
    div.className = 'row mb-2 pricing-item';
    div.innerHTML = `
        <div class="col-md-3">
            <input type="text" class="form-control" name="pricing[${pricingIndex}][duration]" placeholder="Duration" required>
        </div>
        <div class="col-md-3">
            <input type="text" class="form-control" name="pricing[${pricingIndex}][price]" placeholder="Price" required>
        </div>
        <div class="col-md-5">
            <input type="text" class="form-control" name="pricing[${pricingIndex}][note]" placeholder="Note" required>
        </div>
        <div class="col-md-1">
            <button class="btn btn-outline-danger" type="button" onclick="removePricing(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
    pricingIndex++;
}

function removePricing(button) {
    if (document.querySelectorAll('.pricing-item').length > 1) {
        button.closest('.pricing-item').remove();
    }
}
</script>
@endpush
