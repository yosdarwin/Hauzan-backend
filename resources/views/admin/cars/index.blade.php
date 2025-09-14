@extends('admin.layouts.app')

@section('title', 'Car Rentals')
@section('page-title', 'Car Rentals')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Car Rentals</h2>
    <a href="{{ route('cars.create') }}" class="btn btn-primary">
        <i class="bi bi-plus"></i> Add New Car
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($cars->count() > 0)
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Duration</th>
                            <th>Featured</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($cars as $car)
                        <tr>
                            <td>
                                <img src="{{ Storage::url($car->image) }}"
                                     alt="{{ $car->title }}"
                                     style="width: 80px; height: 50px; object-fit: cover;">
                            </td>
                            <td>
                                <strong>{{ $car->title }}</strong><br>
                                <small class="text-muted">{{ Str::limit($car->description, 50) }}</small>
                            </td>
                            <td>{{ $car->price }}</td>
                            <td>{{ $car->duration }}</td>
                            <td>
                                @if($car->featured)
                                    <span class="badge bg-warning">Featured</span>
                                @else
                                    <span class="badge bg-light text-dark">Regular</span>
                                @endif
                            </td>
                            <td>
                                @if($car->is_active)
                                    <span class="badge bg-success">Active</span>
                                @else
                                    <span class="badge bg-secondary">Inactive</span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('cars.show', $car) }}" class="btn btn-sm btn-info">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('cars.edit', $car) }}" class="btn btn-sm btn-warning">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('cars.destroy', $car) }}"
                                          method="POST"
                                          class="d-inline"
                                          onsubmit="return confirm('Are you sure you want to delete this car rental?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-danger">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div class="text-center py-4">
                <i class="bi bi-car-front display-4 text-muted"></i>
                <p class="mt-2 text-muted">No car rentals found</p>
                <a href="{{ route('cars.create') }}" class="btn btn-primary">Add First Car Rental</a>
            </div>
        @endif
    </div>
</div>
@endsection
