@extends('admin.layouts.app')

@section('title', 'Tour Packages')
@section('page-title', 'Tour Packages')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Tour Packages</h2>
    <a href="{{ route('tours.create') }}" class="btn btn-primary">
        <i class="bi bi-plus"></i> Add New Tour
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($tours->count() > 0)
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Featured</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($tours as $tour)
                        <tr>
                            <td>
                                <img src="{{ Storage::url($tour->image) }}" 
                                     alt="{{ $tour->title }}" 
                                     style="width: 80px; height: 50px; object-fit: cover;">
                            </td>
                            <td>
                                <strong>{{ $tour->title }}</strong><br>
                                <small class="text-muted">{{ Str::limit($tour->description, 50) }}</small>
                            </td>
                            <td>{{ $tour->duration }}</td>
                            <td>{{ $tour->price }}</td>
                            <td>
                                @if($tour->featured)
                                    <span class="badge bg-warning">Featured</span>
                                @else
                                    <span class="badge bg-light text-dark">Regular</span>
                                @endif
                            </td>
                            <td>
                                @if($tour->is_active)
                                    <span class="badge bg-success">Active</span>
                                @else
                                    <span class="badge bg-secondary">Inactive</span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('tours.show', $tour) }}" class="btn btn-sm btn-info">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('tours.edit', $tour) }}" class="btn btn-sm btn-warning">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('tours.destroy', $tour) }}" 
                                          method="POST" 
                                          class="d-inline"
                                          onsubmit="return confirm('Are you sure?')">
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
                <i class="bi bi-map display-4 text-muted"></i>
                <p class="mt-2 text-muted">No tour packages found</p>
                <a href="{{ route('tours.create') }}" class="btn btn-primary">Add First Tour Package</a>
            </div>
        @endif
    </div>
</div>
@endsection
