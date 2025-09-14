@extends('admin.layouts.app')

@section('title', 'Testimonials')
@section('page-title', 'Testimonials')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Testimonials</h2>
    <a href="{{ route('testimonials.create') }}" class="btn btn-primary">
        <i class="bi bi-plus"></i> Add New Testimonial
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($testimonials->count() > 0)
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Review</th>
                            <th>Rating</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($testimonials as $testimonial)
                        <tr>
                            <td>
                                @if($testimonial->photo)
                                    <img src="{{ Storage::url($testimonial->photo) }}" 
                                         alt="{{ $testimonial->name }}" 
                                         style="width: 50px; height: 50px; object-fit: cover;" 
                                         class="rounded-circle">
                                @else
                                    <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                                         style="width: 50px; height: 50px;">
                                        <i class="bi bi-person text-white"></i>
                                    </div>
                                @endif
                            </td>
                            <td>
                                <strong>{{ $testimonial->name }}</strong><br>
                                <small class="text-muted">{{ $testimonial->location }}</small>
                            </td>
                            <td>{{ Str::limit($testimonial->review, 60) }}</td>
                            <td>
                                @for($i = 1; $i <= 5; $i++)
                                    @if($i <= $testimonial->rating)
                                        <i class="bi bi-star-fill text-warning"></i>
                                    @else
                                        <i class="bi bi-star text-muted"></i>
                                    @endif
                                @endfor
                            </td>
                            <td>{{ $testimonial->order }}</td>
                            <td>
                                @if($testimonial->is_active)
                                    <span class="badge bg-success">Active</span>
                                @else
                                    <span class="badge bg-secondary">Inactive</span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('testimonials.show', $testimonial) }}" class="btn btn-sm btn-info">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('testimonials.edit', $testimonial) }}" class="btn btn-sm btn-warning">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('testimonials.destroy', $testimonial) }}" 
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
                <i class="bi bi-chat-quote display-4 text-muted"></i>
                <p class="mt-2 text-muted">No testimonials found</p>
                <a href="{{ route('testimonials.create') }}" class="btn btn-primary">Add First Testimonial</a>
            </div>
        @endif
    </div>
</div>
@endsection
