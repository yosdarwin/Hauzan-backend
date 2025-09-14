@extends('admin.layouts.app')

@section('title', 'Edit About Content')
@section('page-title', 'Edit About Content')

@section('content')
<div class="card">
    <div class="card-header">
        <h5 class="card-title mb-0">Edit About Page Content</h5>
    </div>
    <div class="card-body">
        <form action="{{ route('about.update') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="row">
                <div class="col-md-6">
                    <h5>Company Information</h5>

                    <div class="mb-3">
                        <label for="company_name" class="form-label">Company Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('company_name') is-invalid @enderror"
                               id="company_name" name="company_name" value="{{ old('company_name', $about->company_name) }}" required>
                        @error('company_name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="company_address" class="form-label">Company Address <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('company_address') is-invalid @enderror"
                                  id="company_address" name="company_address" rows="3" required>{{ old('company_address', $about->company_address) }}</textarea>
                        @error('company_address')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="founded_year" class="form-label">Founded Year <span class="text-danger">*</span></label>
                        <input type="number" class="form-control @error('founded_year') is-invalid @enderror"
                               id="founded_year" name="founded_year" value="{{ old('founded_year', $about->founded_year) }}"
                               min="1900" max="{{ date('Y') + 1 }}" required>
                        @error('founded_year')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="owner_director" class="form-label">Owner/Director <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('owner_director') is-invalid @enderror"
                               id="owner_director" name="owner_director" value="{{ old('owner_director', $about->owner_director) }}" required>
                        @error('owner_director')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                        <input type="email" class="form-control @error('email') is-invalid @enderror"
                               id="email" name="email" value="{{ old('email', $about->email) }}" required>
                        @error('email')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('phone') is-invalid @enderror"
                               id="phone" name="phone" value="{{ old('phone', $about->phone) }}" required>
                        @error('phone')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="social_media" class="form-label">Social Media <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('social_media') is-invalid @enderror"
                               id="social_media" name="social_media" value="{{ old('social_media', $about->social_media) }}" required>
                        @error('social_media')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="legality" class="form-label">Legality <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('legality') is-invalid @enderror"
                                  id="legality" name="legality" rows="3" required>{{ old('legality', $about->legality) }}</textarea>
                        @error('legality')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="hero_image" class="form-label">Hero Image</label>
                        @if($about->hero_image)
                            <div class="mb-2">
                                <img src="{{ Storage::url($about->hero_image) }}"
                                     alt="Current Hero Image" class="img-thumbnail" style="max-height: 150px;">
                            </div>
                        @endif
                        <input type="file" class="form-control @error('hero_image') is-invalid @enderror"
                               id="hero_image" name="hero_image" accept="image/*">
                        @error('hero_image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <div class="form-text">Leave empty to keep current image</div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <h5>Vision & Mission</h5>

                    <div class="mb-3">
                        <label for="vision" class="form-label">Vision <span class="text-danger">*</span></label>
                        <textarea class="form-control @error('vision') is-invalid @enderror"
                                  id="vision" name="vision" rows="4" required>{{ old('vision', $about->vision) }}</textarea>
                        @error('vision')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Missions <span class="text-danger">*</span></label>
                        <div id="missions-container">
                            @if(old('missions', $about->missions ?? []))
                                @foreach(old('missions', $about->missions ?? []) as $index => $mission)
                                    <div class="mission-item mb-2">
                                        <div class="input-group">
                                            <span class="input-group-text">{{ $index + 1 }}</span>
                                            <textarea class="form-control @error('missions.' . $index) is-invalid @enderror"
                                                      name="missions[]" rows="2" required>{{ $mission }}</textarea>
                                            <button type="button" class="btn btn-outline-danger remove-mission">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                        @error('missions.' . $index)
                                            <div class="invalid-feedback d-block">{{ $message }}</div>
                                        @enderror
                                    </div>
                                @endforeach
                            @else
                                <div class="mission-item mb-2">
                                    <div class="input-group">
                                        <span class="input-group-text">1</span>
                                        <textarea class="form-control" name="missions[]" rows="2" required></textarea>
                                        <button type="button" class="btn btn-outline-danger remove-mission">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            @endif
                        </div>
                        <button type="button" class="btn btn-outline-primary add-mission">
                            <i class="bi bi-plus"></i> Add Mission
                        </button>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('about.index') }}" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary">Update Content</button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script>
    let missionCount = {{ count(old('missions', $about->missions ?? [])) }};

    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('missions-container');
        const addButton = document.querySelector('.add-mission');

        // Add new mission
        addButton.addEventListener('click', function() {
            missionCount++;
            const missionItem = document.createElement('div');
            missionItem.className = 'mission-item mb-2';
            missionItem.innerHTML = `
                <div class="input-group">
                    <span class="input-group-text">${missionCount}</span>
                    <textarea class="form-control" name="missions[]" rows="2" required></textarea>
                    <button type="button" class="btn btn-outline-danger remove-mission">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(missionItem);
            updateMissionNumbers();
        });

        // Remove mission
        container.addEventListener('click', function(e) {
            if (e.target.closest('.remove-mission')) {
                const missionItems = container.querySelectorAll('.mission-item');
                if (missionItems.length > 1) {
                    e.target.closest('.mission-item').remove();
                    updateMissionNumbers();
                }
            }
        });

        function updateMissionNumbers() {
            const items = container.querySelectorAll('.mission-item');
            items.forEach((item, index) => {
                item.querySelector('.input-group-text').textContent = index + 1;
            });
        }
    });
</script>
@endpush
@endsection
