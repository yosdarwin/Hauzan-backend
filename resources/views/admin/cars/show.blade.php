@extends('admin.layouts.app')

@section('title', 'View Car Rental')
@section('page-title', 'View Car Rental')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Car Rental Details</h2>
    <div>
        <a href="{{ route('cars.edit', $car) }}" class="btn btn-warning">
            <i class="bi bi-pencil"></i> Edit
        </a>
        <a href="{{ route('cars.index') }}" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Basic Information</h5>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Title:</strong></div>
                    <div class="col-sm-9">{{ $car->title }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Slug:</strong></div>
                    <div class="col-sm-9">{{ $car->slug }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Price:</strong></div>
                    <div class="col-sm-9">{{ $car->price }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Duration:</strong></div>
                    <div class="col-sm-9">{{ $car->duration }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Description:</strong></div>
                    <div class="col-sm-9">{{ $car->description }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Featured:</strong></div>
                    <div class="col-sm-9">
                        @if($car->featured)
                            <span class="badge bg-warning">Featured</span>
                        @else
                            <span class="badge bg-light text-dark">Regular</span>
                        @endif
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Status:</strong></div>
                    <div class="col-sm-9">
                        @if($car->is_active)
                            <span class="badge bg-success">Active</span>
                        @else
                            <span class="badge bg-secondary">Inactive</span>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Full Description</h5>
            </div>
            <div class="card-body">
                <p>{{ $car->full_description }}</p>
            </div>
        </div>

        @if($car->features && count($car->features) > 0)
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Features</h5>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
                    @foreach($car->features as $feature)
                        <li class="mb-2">
                            <i class="bi bi-check-circle text-success me-2"></i>{{ $feature }}
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif

        @if($car->specifications && count($car->specifications) > 0)
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Specifications</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-sm">
                        <tbody>
                            @foreach($car->specifications as $spec)
                                <tr>
                                    <td class="fw-bold">{{ $spec['key'] ?? 'N/A' }}</td>
                                    <td>{{ $spec['value'] ?? 'N/A' }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @endif

        @if($car->features_detail && count($car->features_detail) > 0)
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Feature Details</h5>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
                    @foreach($car->features_detail as $detail)
                        <li class="mb-2">
                            <i class="bi bi-gear text-primary me-2"></i>{{ $detail }}
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif

        <div class="row">
            @if($car->included && count($car->included) > 0)
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0 text-success">
                            <i class="bi bi-check-circle"></i> Included
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled">
                            @foreach($car->included as $item)
                                <li class="mb-2">
                                    <i class="bi bi-check text-success me-2"></i>{{ $item }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            @endif

            @if($car->terms && count($car->terms) > 0)
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0 text-warning">
                            <i class="bi bi-exclamation-triangle"></i> Terms & Conditions
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled">
                            @foreach($car->terms as $term)
                                <li class="mb-2">
                                    <i class="bi bi-info-circle text-warning me-2"></i>{{ $term }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            @endif
        </div>

        @if($car->pricing && count($car->pricing) > 0)
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Pricing</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($car->pricing as $price)
                                <tr>
                                    <td>{{ $price['duration'] ?? 'N/A' }}</td>
                                    <td class="fw-bold">{{ $price['price'] ?? 'N/A' }}</td>
                                    <td>{{ $price['note'] ?? 'N/A' }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        @endif
    </div>

    <div class="col-lg-4">
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Car Image</h5>
            </div>
            <div class="card-body text-center">
                @if($car->image)
                    <img src="{{ Storage::url($car->image) }}" 
                         alt="{{ $car->title }}" 
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

        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Timestamps</h5>
            </div>
            <div class="card-body">
                <div class="mb-2">
                    <strong>Created:</strong><br>
                    <small class="text-muted">{{ $car->created_at->format('M d, Y \a\t H:i') }}</small>
                </div>
                <div>
                    <strong>Last Updated:</strong><br>
                    <small class="text-muted">{{ $car->updated_at->format('M d, Y \a\t H:i') }}</small>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Actions</h5>
            </div>
            <div class="card-body">
                <div class="d-grid gap-2">
                    <a href="{{ route('cars.edit', $car) }}" class="btn btn-warning">
                        <i class="bi bi-pencil"></i> Edit Car
                    </a>
                    <form action="{{ route('cars.destroy', $car) }}" 
                          method="POST" 
                          onsubmit="return confirm('Are you sure you want to delete this car rental?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger w-100">
                            <i class="bi bi-trash"></i> Delete Car
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
