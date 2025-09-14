@extends('admin.layouts.app')

@section('title', 'View Tour Package')
@section('page-title', 'View Tour Package')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Tour Package Details</h2>
    <div>
        <a href="{{ route('tours.edit', $tour) }}" class="btn btn-warning">
            <i class="bi bi-pencil"></i> Edit
        </a>
        <a href="{{ route('tours.index') }}" class="btn btn-secondary">
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
                    <div class="col-sm-9">{{ $tour->title }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Slug:</strong></div>
                    <div class="col-sm-9">{{ $tour->slug }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Price:</strong></div>
                    <div class="col-sm-9">{{ $tour->price }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Duration:</strong></div>
                    <div class="col-sm-9">{{ $tour->duration }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Description:</strong></div>
                    <div class="col-sm-9">{{ $tour->description }}</div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Featured:</strong></div>
                    <div class="col-sm-9">
                        @if($tour->featured)
                            <span class="badge bg-warning">Featured</span>
                        @else
                            <span class="badge bg-light text-dark">Regular</span>
                        @endif
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-sm-3"><strong>Status:</strong></div>
                    <div class="col-sm-9">
                        @if($tour->is_active)
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
                <p>{{ $tour->full_description }}</p>
            </div>
        </div>

        @if($tour->highlights && count($tour->highlights) > 0)
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Highlights</h5>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
                    @foreach($tour->highlights as $highlight)
                        <li class="mb-2">
                            <i class="bi bi-check-circle text-success me-2"></i>{{ $highlight }}
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
        @endif

        @if($tour->itinerary && count($tour->itinerary) > 0)
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Itinerary</h5>
            </div>
            <div class="card-body">
                @foreach($tour->itinerary as $item)
                    <div class="d-flex mb-3">
                        <div class="flex-shrink-0">
                            <span class="badge bg-primary">{{ $item['time'] }}</span>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            {{ $item['activity'] }}
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
        @endif

        <div class="row">
            @if($tour->included && count($tour->included) > 0)
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0 text-success">
                            <i class="bi bi-check-circle"></i> Included
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled">
                            @foreach($tour->included as $item)
                                <li class="mb-2">
                                    <i class="bi bi-check text-success me-2"></i>{{ $item }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            @endif

            @if($tour->not_included && count($tour->not_included) > 0)
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0 text-danger">
                            <i class="bi bi-x-circle"></i> Not Included
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled">
                            @foreach($tour->not_included as $item)
                                <li class="mb-2">
                                    <i class="bi bi-x text-danger me-2"></i>{{ $item }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="card-title mb-0">Tour Image</h5>
            </div>
            <div class="card-body text-center">
                @if($tour->image)
                    <img src="{{ Storage::url($tour->image) }}" 
                         alt="{{ $tour->title }}" 
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
                    <small class="text-muted">{{ $tour->created_at->format('M d, Y \a\t H:i') }}</small>
                </div>
                <div>
                    <strong>Last Updated:</strong><br>
                    <small class="text-muted">{{ $tour->updated_at->format('M d, Y \a\t H:i') }}</small>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Actions</h5>
            </div>
            <div class="card-body">
                <div class="d-grid gap-2">
                    <a href="{{ route('tours.edit', $tour) }}" class="btn btn-warning">
                        <i class="bi bi-pencil"></i> Edit Tour
                    </a>
                    <form action="{{ route('tours.destroy', $tour) }}" 
                          method="POST" 
                          onsubmit="return confirm('Are you sure you want to delete this tour package?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger w-100">
                            <i class="bi bi-trash"></i> Delete Tour
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
