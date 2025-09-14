@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<!-- Welcome Section -->
<div class="row mb-4">
    <div class="col-12">
        <div class="card bg-gradient-primary text-white shadow">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col">
                        <h4 class="text-white mb-2">Welcome to Hauzan Tour Admin Panel</h4>
                        <p class="text-white-75 mb-0">Manage your tourism business with ease. Here's your overview:</p>
                    </div>
                    <div class="col-auto">
                        <i class="bi bi-speedometer2 fa-3x text-white-25"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-3 col-md-6 mb-4">
        <a href="{{ route('sliders.index') }}" class="text-decoration-none">
            <div class="card border-left-primary shadow h-100 py-2 hover-card">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Home Sliders
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $sliders_count }}</div>
                            <div class="text-xs text-muted mt-1">Click to manage</div>
                        </div>
                        <div class="col-auto">
                            <i class="bi bi-images fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div class="col-xl-3 col-md-6 mb-4">
        <a href="{{ route('tours.index') }}" class="text-decoration-none">
            <div class="card border-left-success shadow h-100 py-2 hover-card">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Tour Packages
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $tours_count }}</div>
                            <div class="text-xs text-muted mt-1">Click to manage</div>
                        </div>
                        <div class="col-auto">
                            <i class="bi bi-map fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div class="col-xl-3 col-md-6 mb-4">
        <a href="{{ route('cars.index') }}" class="text-decoration-none">
            <div class="card border-left-info shadow h-100 py-2 hover-card">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                Car Rentals
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $cars_count }}</div>
                            <div class="text-xs text-muted mt-1">Click to manage</div>
                        </div>
                        <div class="col-auto">
                            <i class="bi bi-car-front fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>

    <div class="col-xl-3 col-md-6 mb-4">
        <a href="{{ route('testimonials.index') }}" class="text-decoration-none">
            <div class="card border-left-warning shadow h-100 py-2 hover-card">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Testimonials
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $testimonials_count }}</div>
                            <div class="text-xs text-muted mt-1">Click to manage</div>
                        </div>
                        <div class="col-auto">
                            <i class="bi bi-chat-quote fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-4">
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                <h6 class="m-0 font-weight-bold text-primary">Quick Actions</h6>
                <i class="bi bi-plus-circle text-primary"></i>
            </div>
            <div class="card-body">
                <div class="list-group list-group-flush">
                    <a href="{{ route('sliders.create') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-plus-circle me-2 text-primary"></i>Add New Slider</span>
                        <i class="bi bi-arrow-right text-muted"></i>
                    </a>
                    <a href="{{ route('tours.create') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-plus-circle me-2 text-success"></i>Add New Tour Package</span>
                        <i class="bi bi-arrow-right text-muted"></i>
                    </a>
                    <a href="{{ route('cars.create') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-plus-circle me-2 text-info"></i>Add New Car Rental</span>
                        <i class="bi bi-arrow-right text-muted"></i>
                    </a>
                    <a href="{{ route('testimonials.create') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-plus-circle me-2 text-warning"></i>Add New Testimonial</span>
                        <i class="bi bi-arrow-right text-muted"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                <h6 class="m-0 font-weight-bold text-success">Management</h6>
                <i class="bi bi-gear text-success"></i>
            </div>
            <div class="card-body">
                <div class="list-group list-group-flush">
                    <a href="{{ route('sliders.index') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-images me-2 text-primary"></i>Manage Sliders</span>
                        <span class="badge bg-primary rounded-pill">{{ $sliders_count }}</span>
                    </a>
                    <a href="{{ route('tours.index') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-map me-2 text-success"></i>Manage Tours</span>
                        <span class="badge bg-success rounded-pill">{{ $tours_count }}</span>
                    </a>
                    <a href="{{ route('cars.index') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-car-front me-2 text-info"></i>Manage Cars</span>
                        <span class="badge bg-info rounded-pill">{{ $cars_count }}</span>
                    </a>
                    <a href="{{ route('testimonials.index') }}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-chat-quote me-2 text-warning"></i>Manage Testimonials</span>
                        <span class="badge bg-warning rounded-pill">{{ $testimonials_count }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4">
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
                <h6 class="m-0 font-weight-bold text-info">Recent Activities</h6>
                <i class="bi bi-clock-history text-info"></i>
            </div>
            <div class="card-body">
                <div class="list-group list-group-flush">
                    @if($recent_tours->count() > 0)
                        @foreach($recent_tours as $tour)
                            <div class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">{{ Str::limit($tour->title, 25) }}</div>
                                    <small class="text-muted">New tour package added</small>
                                </div>
                                <small class="text-muted">{{ $tour->created_at->diffForHumans() }}</small>
                            </div>
                        @endforeach
                        <div class="list-group-item text-center">
                            <a href="{{ route('tours.index') }}" class="btn btn-sm btn-outline-info">
                                <i class="bi bi-eye me-1"></i>View All Tours
                            </a>
                        </div>
                    @else
                        <div class="list-group-item text-center text-muted">
                            <i class="bi bi-inbox display-6 text-muted"></i>
                            <p class="mt-2 mb-1">No recent activities</p>
                            <small>Start by adding some content</small>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .border-left-primary {
        border-left: 0.25rem solid #4e73df !important;
    }
    .border-left-success {
        border-left: 0.25rem solid #1cc88a !important;
    }
    .border-left-info {
        border-left: 0.25rem solid #36b9cc !important;
    }
    .border-left-warning {
        border-left: 0.25rem solid #f6c23e !important;
    }

    .hover-card {
        transition: all 0.3s ease;
    }

    .hover-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }

    .list-group-item-action:hover {
        background-color: #f8f9fc;
        transform: translateX(5px);
        transition: all 0.2s ease;
    }

    .card {
        border: none;
        border-radius: 0.5rem;
    }

    .card-header {
        background: linear-gradient(135deg, #f8f9fc 0%, #e9ecef 100%);
        border-bottom: 1px solid #e3e6f0;
        border-radius: 0.5rem 0.5rem 0 0 !important;
    }

    .badge {
        font-size: 0.75em;
    }

    .bg-gradient-primary {
        background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
    }

    .text-white-75 {
        color: rgba(255, 255, 255, 0.75) !important;
    }

    .text-white-25 {
        color: rgba(255, 255, 255, 0.25) !important;
    }
</style>
@endsection
