import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tour Packages',
        href: '/tours',
    },
    {
        title: 'Edit Tour',
        href: '#',
    },
];

interface Tour {
    id: number;
    title: string;
    slug: string;
    description: string;
    full_description: string;
    price: string;
    duration: string;
    location: string;
    image: string;
    highlights: string[];
    itinerary: Array<{
        day: number;
        time: string;
        activity: string;
    }>;
    included: string[];
    is_active: boolean;
}

interface TourEditProps {
    tour: Tour;
}

export default function TourEdit({ tour }: TourEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: tour.title || '',
        slug: tour.slug || '',
        description: tour.description || '',
        full_description: tour.full_description || '',
        price: tour.price || '',
        duration: tour.duration || '',
        location: tour.location || '',
        image: null as File | null,
        highlights: Array.isArray(tour.highlights) ? tour.highlights : tour.highlights ? [tour.highlights] : [''],
        itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [{ day: 1, time: '', activity: '' }],
        included: Array.isArray(tour.included) ? tour.included : tour.included ? [tour.included] : [''],
        is_active: tour.is_active ?? true,
    });

    // Auto-generate slug from title
    useEffect(() => {
        if (data.title && data.title !== tour.title) {
            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setData('slug', slug);
        }
    }, [data.title]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/tours/${tour.slug}`);
    };

    const addHighlight = () => {
        setData('highlights', [...data.highlights, '']);
    };

    const removeHighlight = (index: number) => {
        const newHighlights = data.highlights.filter((_, i) => i !== index);
        setData('highlights', newHighlights);
    };

    const updateHighlight = (index: number, value: string) => {
        const newHighlights = [...data.highlights];
        newHighlights[index] = value;
        setData('highlights', newHighlights);
    };

    const addItineraryItem = () => {
        const currentDay = data.itinerary.length > 0 ? data.itinerary[data.itinerary.length - 1].day : 1;
        setData('itinerary', [...data.itinerary, { day: currentDay, time: '', activity: '' }]);
    };

    const removeItineraryItem = (index: number) => {
        const newItinerary = data.itinerary.filter((_, i) => i !== index);
        setData('itinerary', newItinerary);
    };

    const updateItineraryItem = (index: number, field: string, value: string | number) => {
        const newItinerary = [...data.itinerary];
        newItinerary[index] = { ...newItinerary[index], [field]: value };
        setData('itinerary', newItinerary);
    };

    const addIncludedItem = () => {
        setData('included', [...data.included, '']);
    };

    const removeIncludedItem = (index: number) => {
        const newIncluded = data.included.filter((_, i) => i !== index);
        setData('included', newIncluded);
    };

    const updateIncludedItem = (index: number, value: string) => {
        const newIncluded = [...data.included];
        newIncluded[index] = value;
        setData('included', newIncluded);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${tour.title} - Tour Package`} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/tours">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Tours
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Edit Tour Package</h1>
                            <p className="text-muted-foreground">Update the tour package information</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Basic Information</h3>

                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter tour title"
                                        className={errors.title ? 'border-destructive' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>

                                {/* Slug */}
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug (Auto-generated)</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="tour-package-url"
                                        className={`bg-muted ${errors.slug ? 'border-destructive' : ''}`}
                                    />
                                    {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                                    <p className="text-sm text-muted-foreground">
                                        This will be automatically generated from the title. You can edit it if needed.
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price *</Label>
                                    <Input
                                        id="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="e.g., $299"
                                        className={errors.price ? 'border-destructive' : ''}
                                    />
                                    {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration *</Label>
                                    <Input
                                        id="duration"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        placeholder="e.g., 3 Days 2 Nights"
                                        className={errors.duration ? 'border-destructive' : ''}
                                    />
                                    {errors.duration && <p className="text-sm text-destructive">{errors.duration}</p>}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location *</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="e.g., Padang, West Sumatra"
                                        className={errors.location ? 'border-destructive' : ''}
                                    />
                                    {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Tour Image</h3>

                                {/* Current Image */}
                                {tour.image && (
                                    <div className="space-y-2">
                                        <Label>Current Image</Label>
                                        <div className="relative aspect-video overflow-hidden rounded-lg border">
                                            <img src={`/storage/${tour.image}`} alt={tour.title} className="h-full w-full object-cover" />
                                        </div>
                                    </div>
                                )}

                                {/* New Image Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Upload New Image (Optional)</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className={errors.image ? 'border-destructive' : ''}
                                    />
                                    {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                                    <p className="text-sm text-muted-foreground">
                                        Leave empty to keep current image. Supported formats: JPEG, PNG, JPG, GIF, WebP (max 2MB)
                                    </p>
                                </div>

                                {/* Active Status */}
                                <div className="mt-4 flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="is_active">Active (visible to customers)</Label>
                                </div>
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Descriptions</h3>

                            {/* Short Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Short Description *</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Brief description for tour cards and previews..."
                                    className={`min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.description ? 'border-destructive' : ''}`}
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>

                            {/* Full Description */}
                            <div className="space-y-2">
                                <Label htmlFor="full_description">Full Description *</Label>
                                <textarea
                                    id="full_description"
                                    value={data.full_description}
                                    onChange={(e) => setData('full_description', e.target.value)}
                                    placeholder="Detailed description with all tour information, itinerary details, what to expect..."
                                    className={`min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.full_description ? 'border-destructive' : ''}`}
                                />
                                {errors.full_description && <p className="text-sm text-destructive">{errors.full_description}</p>}
                            </div>
                        </div>

                        {/* Tour Highlights */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Tour Highlights</h3>

                            <div className="space-y-3">
                                {data.highlights.map((highlight, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={highlight}
                                            onChange={(e) => updateHighlight(index, e.target.value)}
                                            placeholder="Enter highlight"
                                            className="flex-1"
                                        />
                                        {data.highlights.length > 1 && (
                                            <Button type="button" onClick={() => removeHighlight(index)} variant="outline" size="sm">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button type="button" onClick={addHighlight} variant="outline" className="mt-2">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Highlight
                            </Button>
                        </div>

                        {/* What's Included */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">What's Included</h3>

                            <div className="space-y-3">
                                {data.included.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => updateIncludedItem(index, e.target.value)}
                                            placeholder="Enter included item"
                                            className="flex-1"
                                        />
                                        {data.included.length > 1 && (
                                            <Button type="button" onClick={() => removeIncludedItem(index)} variant="outline" size="sm">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button type="button" onClick={addIncludedItem} variant="outline" className="mt-2">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Item
                            </Button>
                        </div>

                        {/* Detailed Itinerary */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Detailed Itinerary</h3>

                            <div className="space-y-4">
                                {data.itinerary.map((item, index) => (
                                    <div key={index} className="space-y-3 rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Activity {index + 1}</h4>
                                            {data.itinerary.length > 1 && (
                                                <Button type="button" onClick={() => removeItineraryItem(index)} variant="outline" size="sm">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label>Day</Label>
                                                <Input
                                                    type="number"
                                                    value={item.day}
                                                    onChange={(e) => updateItineraryItem(index, 'day', parseInt(e.target.value) || 1)}
                                                    placeholder="1"
                                                    min="1"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Time</Label>
                                                <Input
                                                    value={item.time || ''}
                                                    onChange={(e) => updateItineraryItem(index, 'time', e.target.value)}
                                                    placeholder="08:00"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Activity</Label>
                                                <Input
                                                    value={item.activity || ''}
                                                    onChange={(e) => updateItineraryItem(index, 'activity', e.target.value)}
                                                    placeholder="Departure from Padang"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button type="button" onClick={addItineraryItem} variant="outline" className="mt-2">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Activity
                            </Button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Link href="/tours">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Updating...' : 'Update Tour Package'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
