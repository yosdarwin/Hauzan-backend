@extends('admin.layouts.app')

@section('title', 'Car Rentals Header Settings')
@section('page-title', 'Car Rentals Header Settings')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Car Rentals Header Settings</h2>
    <a href="{{ route('cars.index') }}" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Back to Car Rentals
    </a>
</div>

<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Header Configuration</h5>
            </div>
            <div class="card-body">
                <form id="headerForm">
                    @csrf
                    <div class="mb-3">
                        <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="title" name="title" required>
                        <div class="form-text">Main heading for the car rentals section</div>
                    </div>

                    <div class="mb-3">
                        <label for="subtitle" class="form-label">Subtitle <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="subtitle" name="subtitle" required>
                        <div class="form-text">Secondary heading or tagline</div>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                        <textarea class="form-control" id="description" name="description" rows="4" required></textarea>
                        <div class="form-text">Brief description about your car rental services</div>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-lg"></i> Save Changes
                        </button>
                        <button type="button" class="btn btn-outline-secondary" onclick="loadSettings()">
                            <i class="bi bi-arrow-clockwise"></i> Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card">
            <div class="card-header">
                <h6 class="card-title mb-0">Preview</h6>
            </div>
            <div class="card-body">
                <div class="preview-section">
                    <h3 id="preview-title" class="fw-bold text-primary">Car Rentals</h3>
                    <p id="preview-subtitle" class="text-muted mb-2">Manage your car rental fleet</p>
                    <p id="preview-description" class="small">Explore our premium car rental options for comfortable and reliable transportation.</p>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h6 class="card-title mb-0">Guidelines</h6>
            </div>
            <div class="card-body">
                <ul class="small mb-0">
                    <li>Keep title concise (max 255 characters)</li>
                    <li>Subtitle should be descriptive (max 500 characters)</li>
                    <li>Description should be engaging (max 1000 characters)</li>
                    <li>Use keywords relevant to car rentals</li>
                </ul>
            </div>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    setupFormHandlers();
});

function loadSettings() {
    fetch('{{ route("cars.header.settings") }}')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('title').value = data.data.title;
                document.getElementById('subtitle').value = data.data.subtitle;
                document.getElementById('description').value = data.data.description;
                updatePreview();
            }
        })
        .catch(error => {
            console.error('Error loading settings:', error);
            showAlert('Error loading settings', 'danger');
        });
}

function setupFormHandlers() {
    // Real-time preview update
    ['title', 'subtitle', 'description'].forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('input', updatePreview);
    });

    // Form submission
    document.getElementById('headerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });
}

function updatePreview() {
    const title = document.getElementById('title').value || 'Car Rentals';
    const subtitle = document.getElementById('subtitle').value || 'Manage your car rental fleet';
    const description = document.getElementById('description').value || 'Explore our premium car rental options for comfortable and reliable transportation.';

    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-subtitle').textContent = subtitle;
    document.getElementById('preview-description').textContent = description;
}

function saveSettings() {
    const formData = new FormData(document.getElementById('headerForm'));

    fetch('{{ route("cars.header.update") }}', {
        method: 'PUT',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: formData.get('title'),
            subtitle: formData.get('subtitle'),
            description: formData.get('description')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert(data.message, 'success');
        } else {
            showAlert(data.message || 'Error saving settings', 'danger');
        }
    })
    .catch(error => {
        console.error('Error saving settings:', error);
        showAlert('Error saving settings', 'danger');
    });
}

function showAlert(message, type) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert at the top of the content
    const content = document.querySelector('#headerForm');
    content.parentNode.insertBefore(alertDiv, content);

    // Auto-hide success alerts after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }
}
</script>
@endsection