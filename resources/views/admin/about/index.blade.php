@extends('admin.layouts.app')

@section('title', 'About Page')
@section('page-title', 'About Page Content')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>About Page Content</h2>
    <a href="{{ route('about.edit') }}" class="btn btn-primary">
        <i class="bi bi-pencil"></i> Edit Content
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($about)
            <div class="row">
                <div class="col-md-4">
                    @if($about->image)
                        <img src="{{ Storage::url($about->image) }}" 
                             alt="About Image" 
                             class="img-fluid rounded">
                    @else
                        <div class="bg-light p-4 text-center rounded">
                            <i class="bi bi-image display-4 text-muted"></i>
                            <p class="mt-2 text-muted">No image uploaded</p>
                        </div>
                    @endif
                </div>
                <div class="col-md-8">
                    <h3>{{ $about->title ?? 'No title set' }}</h3>
                    <div class="mt-3">
                        {!! $about->content ?? '<p class="text-muted">No content available</p>' !!}
                    </div>
                    <div class="mt-3">
                        <small class="text-muted">
                            Last updated: {{ $about->updated_at ? $about->updated_at->format('M d, Y H:i') : 'Never' }}
                        </small>
                    </div>
                </div>
            </div>
        @else
            <div class="text-center py-4">
                <i class="bi bi-info-circle display-4 text-muted"></i>
                <p class="mt-2 text-muted">No about content found</p>
                <a href="{{ route('about.edit') }}" class="btn btn-primary">Add About Content</a>
            </div>
        @endif
    </div>
</div>
@endsection
