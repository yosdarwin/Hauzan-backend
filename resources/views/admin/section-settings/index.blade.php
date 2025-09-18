@extends('admin.layouts.app')

@section('title', 'Section Settings')
@section('page-title', 'Section Settings')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Manage Section Titles and Subtitles</h5>
                    <p class="text-muted mb-0">Update the titles and subtitles for different sections of your website</p>
                </div>
                <div class="card-body">
                    <form action="{{ route('section-settings.update') }}" method="POST">
                        @csrf
                        
                        <div class="row">
                            <!-- Popular Destinations Section -->
                            <div class="col-md-6 mb-4">
                                <div class="card border-primary">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Popular Destinations</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label for="popular_destinations_title" class="form-label">Title</label>
                                            <input type="text" 
                                                   class="form-control @error('popular_destinations_title') is-invalid @enderror" 
                                                   id="popular_destinations_title" 
                                                   name="popular_destinations_title" 
                                                   value="{{ old('popular_destinations_title', $sections['popular_destinations']['title'] ?? 'Popular Destinations') }}"
                                                   placeholder="Enter section title">
                                            @error('popular_destinations_title')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="popular_destinations_subtitle" class="form-label">Subtitle</label>
                                            <textarea class="form-control @error('popular_destinations_subtitle') is-invalid @enderror" 
                                                      id="popular_destinations_subtitle" 
                                                      name="popular_destinations_subtitle" 
                                                      rows="3"
                                                      placeholder="Enter section subtitle">{{ old('popular_destinations_subtitle', $sections['popular_destinations']['subtitle'] ?? 'Discover amazing places around Padang') }}</textarea>
                                            @error('popular_destinations_subtitle')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Featured Tour Package Section -->
                            <div class="col-md-6 mb-4">
                                <div class="card border-success">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Featured Tour Package</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label for="featured_tour_package_title" class="form-label">Title</label>
                                            <input type="text" 
                                                   class="form-control @error('featured_tour_package_title') is-invalid @enderror" 
                                                   id="featured_tour_package_title" 
                                                   name="featured_tour_package_title" 
                                                   value="{{ old('featured_tour_package_title', $sections['featured_tour_package']['title'] ?? 'Featured Tour Package') }}"
                                                   placeholder="Enter section title">
                                            @error('featured_tour_package_title')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="featured_tour_package_subtitle" class="form-label">Subtitle</label>
                                            <textarea class="form-control @error('featured_tour_package_subtitle') is-invalid @enderror" 
                                                      id="featured_tour_package_subtitle" 
                                                      name="featured_tour_package_subtitle" 
                                                      rows="3"
                                                      placeholder="Enter section subtitle">{{ old('featured_tour_package_subtitle', $sections['featured_tour_package']['subtitle'] ?? 'Explore our best tour packages') }}</textarea>
                                            @error('featured_tour_package_subtitle')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Car Rent Section -->
                            <div class="col-md-6 mb-4">
                                <div class="card border-warning">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Car Rent</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label for="car_rent_title" class="form-label">Title</label>
                                            <input type="text" 
                                                   class="form-control @error('car_rent_title') is-invalid @enderror" 
                                                   id="car_rent_title" 
                                                   name="car_rent_title" 
                                                   value="{{ old('car_rent_title', $sections['car_rent']['title'] ?? 'Car Rent') }}"
                                                   placeholder="Enter section title">
                                            @error('car_rent_title')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="car_rent_subtitle" class="form-label">Subtitle</label>
                                            <textarea class="form-control @error('car_rent_subtitle') is-invalid @enderror" 
                                                      id="car_rent_subtitle" 
                                                      name="car_rent_subtitle" 
                                                      rows="3"
                                                      placeholder="Enter section subtitle">{{ old('car_rent_subtitle', $sections['car_rent']['subtitle'] ?? 'Rent a car for your comfortable journey') }}</textarea>
                                            @error('car_rent_subtitle')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Testimonial Section -->
                            <div class="col-md-6 mb-4">
                                <div class="card border-info">
                                    <div class="card-header bg-info text-white">
                                        <h6 class="mb-0">Testimonial</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <label for="testimonial_title" class="form-label">Title</label>
                                            <input type="text" 
                                                   class="form-control @error('testimonial_title') is-invalid @enderror" 
                                                   id="testimonial_title" 
                                                   name="testimonial_title" 
                                                   value="{{ old('testimonial_title', $sections['testimonial']['title'] ?? 'Testimonial') }}"
                                                   placeholder="Enter section title">
                                            @error('testimonial_title')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="testimonial_subtitle" class="form-label">Subtitle</label>
                                            <textarea class="form-control @error('testimonial_subtitle') is-invalid @enderror" 
                                                      id="testimonial_subtitle" 
                                                      name="testimonial_subtitle" 
                                                      rows="3"
                                                      placeholder="Enter section subtitle">{{ old('testimonial_subtitle', $sections['testimonial']['subtitle'] ?? 'What our customers say about us') }}</textarea>
                                            @error('testimonial_subtitle')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="d-flex justify-content-between">
                                    <button type="button" class="btn btn-secondary" onclick="window.history.back()">
                                        <i class="bi bi-arrow-left"></i> Back
                                    </button>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="bi bi-check-lg"></i> Update Section Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time preview functionality if needed
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // You can add preview functionality here
            console.log(`${this.name}: ${this.value}`);
        });
    });
});
</script>
@endpush
@endsection