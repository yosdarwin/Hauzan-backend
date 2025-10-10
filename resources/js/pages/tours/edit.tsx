import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import VisitedImageManager, { type VisitedImage } from '@/components/VisitedImageManager';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { toast } from 'sonner';

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
    full_description: string;
    price: string;
    duration: string;
    location: string;
    image: string;
    featured: boolean;
    highlights: string[];
    itinerary: Array<{
        day: number;
        time: string;
        activity: string;
    }>;
    included: string[];
    not_included: string[];
    visited_tours_images?: Array<{ image: string; description: string }> | string[];
}

interface TourEditProps {
    tour: Tour;
}

export default function TourEdit({ tour }: TourEditProps) {
    type TourFormData = {
        title: string;
        slug: string;
        full_description: string;
        price: string;
        duration: string;
        location: string;
        image: File | null;
        featured: boolean;
        highlights: string[];
        itinerary: Array<{ day: number; time: string; activity: string }>;
        included: string[];
        not_included: string[];
        visited_tours_images: VisitedImage[];
    };
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const { props } = usePage<{ flash: { success?: string; error?: string } }>();

    // Handle flash messages
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    const { data, setData, processing, errors } = useForm<TourFormData>({
        title: tour.title || '',
        slug: tour.slug || '',
        full_description: tour.full_description || '',
        price: tour.price || '',
        duration: tour.duration || '',
        location: tour.location || '',
        image: null,
        featured: tour.featured || false,
        highlights: Array.isArray(tour.highlights) && tour.highlights.length > 0 ? tour.highlights.filter((h) => h && h.trim() !== '') : [''],
        itinerary: Array.isArray(tour.itinerary) && tour.itinerary.length > 0 ? tour.itinerary : [{ day: 1, time: '', activity: '' }],
        included: Array.isArray(tour.included) && tour.included.length > 0 ? tour.included.filter((i) => i && i.trim() !== '') : [''],
        not_included:
            Array.isArray(tour.not_included) && tour.not_included.length > 0 ? tour.not_included.filter((ni) => ni && ni.trim() !== '') : [''],
        visited_tours_images: (() => {
            // Initialize visited tours images immediately
            if (tour.visited_tours_images && Array.isArray(tour.visited_tours_images)) {
                return tour.visited_tours_images.map((imageData, index) => {
                    const isLegacyFormat = typeof imageData === 'string';
                    return {
                        id: `existing-${index}`,
                        image: isLegacyFormat ? imageData : imageData.image,
                        description: isLegacyFormat ? '' : imageData.description,
                    };
                });
            }
            return [];
        })(),
    });

    // Track which existing images were removed for cleanup
    const [removedImages, setRemovedImages] = useState<string[]>([]);

    // Re-initialize images when tour data changes (after successful form submission)
    useEffect(() => {
        if (tour.visited_tours_images && Array.isArray(tour.visited_tours_images)) {
            const currentImagePaths = data.visited_tours_images.map(img =>
                typeof img.image === 'string' ? img.image : 'new'
            );
            const tourImagePaths = tour.visited_tours_images.map(img =>
                typeof img === 'string' ? img : img.image
            );

            // Only reinitialize if the tour data has different images than our form state
            const isDifferent = JSON.stringify(currentImagePaths.sort()) !== JSON.stringify(tourImagePaths.sort());

            if (isDifferent) {
                const existingImages: VisitedImage[] = tour.visited_tours_images.map((imageData, index) => {
                    const isLegacyFormat = typeof imageData === 'string';
                    return {
                        id: `existing-${index}-${Date.now()}`,
                        image: isLegacyFormat ? imageData : imageData.image,
                        description: isLegacyFormat ? '' : imageData.description,
                    };
                });
                setData('visited_tours_images', existingImages);
                setRemovedImages([]); // Reset removed images tracking
            }
        }
    }, [tour.visited_tours_images, data.visited_tours_images, setData]);

    const generateSlugFromTitle = (title: string) => {
        if (title) {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
        }
        return '';
    };

    const handleTitleChange = (value: string) => {
        setData('title', value);

        // Auto-generate slug if not manually edited
        if (!isSlugManuallyEdited) {
            const slug = generateSlugFromTitle(value);
            setData('slug', slug);
        }
    };

    const handleSlugChange = (value: string) => {
        setData('slug', value);

        // Reset manual edit flag if slug is cleared or matches auto-generated value
        const autoGeneratedSlug = generateSlugFromTitle(data.title);
        if (value === '' || value === autoGeneratedSlug) {
            setIsSlugManuallyEdited(false);
        } else {
            setIsSlugManuallyEdited(true);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Ensure required fields are not empty and have valid values
        const submissionData = {
            title: data.title && data.title.trim() !== '' ? data.title : tour.title,
            slug: data.slug && data.slug.trim() !== '' ? data.slug : tour.slug,
            full_description: data.full_description && data.full_description.trim() !== '' ? data.full_description : tour.full_description,
            price: data.price && data.price.trim() !== '' ? data.price : tour.price,
            duration: data.duration && data.duration.trim() !== '' ? data.duration : tour.duration,
            location: data.location && data.location.trim() !== '' ? data.location : tour.location,
            image: data.image,
            featured: data.featured,
            highlights: data.highlights.filter((item) => item && item.trim() !== ''),
            included: data.included.filter((item) => item && item.trim() !== ''),
            not_included: data.not_included.filter((item) => item && item.trim() !== ''),
            itinerary: data.itinerary.filter((item) => (item.activity && item.activity.trim() !== '') || (item.time && item.time.trim() !== '')),
        };

        // Validate that all required fields have values
        const requiredFields: (keyof typeof submissionData)[] = ['title', 'full_description', 'price', 'duration', 'location'];
        const missingFields = requiredFields.filter((field) => !submissionData[field] || (submissionData[field] as string).trim() === '');

        if (missingFields.length > 0) {
            toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        // Use POST with _method=PUT for file uploads, or PUT for regular updates
        if (data.image || data.visited_tours_images.length > 0) {
            const formData = new FormData();

            // Add the image file first
            if (data.image) {
                formData.append('image', data.image);
            }

            // Handle visited tours images with complete state
            const visitedImagesData = data.visited_tours_images.map((imageObj, index) => ({
                image: typeof imageObj.image === 'string' ? imageObj.image : `new_${index}`,
                description: imageObj.description,
                is_new: imageObj.image instanceof File
            }));

            // Send the structure as JSON
            formData.append('visited_tours_images_data', JSON.stringify(visitedImagesData));

            // Send removed images for cleanup
            if (removedImages.length > 0) {
                formData.append('removed_images', JSON.stringify(removedImages));
            }

            // Send new image files separately
            data.visited_tours_images.forEach((imageObj, index) => {
                if (imageObj.image instanceof File) {
                    formData.append(`visited_tours_images[${index}][image]`, imageObj.image);
                }
            });

            // Add all other fields to FormData (excluding image and visited_tours_images since we already added them)
            Object.entries(submissionData).forEach(([key, value]) => {
                if (key === 'image' || key === 'visited_tours_images') {
                    // Skip as we already added these above
                    return;
                } else if (key === 'highlights' || key === 'included' || key === 'not_included') {
                    // Handle arrays
                    if (Array.isArray(value)) {
                        (value as string[]).forEach((item: string, index: number) => {
                            formData.append(`${key}[${index}]`, item);
                        });
                    }
                } else if (key === 'itinerary') {
                    // Handle itinerary array
                    if (Array.isArray(value)) {
                        (value as Array<{ day: number; time: string; activity: string }>).forEach((item, index) => {
                            formData.append(`${key}[${index}][day]`, item.day.toString());
                            formData.append(`${key}[${index}][time]`, item.time);
                            formData.append(`${key}[${index}][activity]`, item.activity);
                        });
                    }
                } else if (key === 'featured') {
                    // Handle boolean values
                    formData.append(key, value ? '1' : '0');
                } else if (value !== null && value !== undefined) {
                    // Ensure value is string or Blob for FormData.append
                    formData.append(key, typeof value === 'string' ? value : String(value));
                }
            });

            formData.append('_method', 'PUT');

            router.post(`/tours/${tour.slug}`, formData, {
                onSuccess: () => {
                    // Reset image fields after successful update
                    setData('image', null);
                    setData('visited_tours_images', [] as VisitedImage[]);

                    // Reset file inputs
                    const imageInput = document.getElementById('image') as HTMLInputElement;
                    const visitedImagesInput = document.getElementById('visited_tours_images') as HTMLInputElement;
                    if (imageInput) imageInput.value = '';
                    if (visitedImagesInput) visitedImagesInput.value = '';
                },
                onError: (errors: Record<string, string | string[]>) => {
                    // Show specific validation errors to user
                    const errorMessages = Object.entries(errors)
                        .map(([field, messages]) => {
                            const messageText = Array.isArray(messages) ? messages.join(', ') : messages;
                            return `${field}: ${messageText}`;
                        })
                        .join('\n');

                    toast.error(`Validation errors:\n${errorMessages}`);
                },
            });
        } else {
            router.put(`/tours/${tour.slug}`, submissionData, {
                onSuccess: () => {
                    // Reset image fields after successful update (only if no files were involved)
                    // For PUT requests without files, no image fields need resetting
                },
                onError: (errors: Record<string, string | string[]>) => {
                    // Show specific validation errors to user
                    const errorMessages = Object.entries(errors)
                        .map(([field, messages]) => {
                            const messageText = Array.isArray(messages) ? messages.join(', ') : messages;
                            return `${field}: ${messageText}`;
                        })
                        .join('\n');

                    toast.error(`Validation errors:\n${errorMessages}`);
                },
            });
        }
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

    const updateItineraryItem = (
        index: number,
        field: 'day' | 'time' | 'activity',
        value: string | number
    ) => {
        const newItinerary = [...data.itinerary];
        const item = { ...newItinerary[index] };
        if (field === 'day') {
            item.day = typeof value === 'number' ? value : parseInt(value as string) || 1;
        } else if (field === 'time') {
            item.time = String(value);
        } else {
            item.activity = String(value);
        }
        newItinerary[index] = item;
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

    const addNotIncluded = () => {
        setData('not_included', [...data.not_included, '']);
    };

    const removeNotIncluded = (index: number) => {
        const newNotIncluded = data.not_included.filter((_, i) => i !== index);
        setData('not_included', newNotIncluded);
    };

    const updateNotIncluded = (index: number, value: string) => {
        const newNotIncluded = [...data.not_included];
        newNotIncluded[index] = value;
        setData('not_included', newNotIncluded);
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${tour.title} - Tour Package`} />

            <div className="space-y-6 p-6">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href="/tours">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>Back to Tours</span>
                        </div>
                    </Link>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Tour Package</h1>
                        <p className="text-muted-foreground">Update the tour package information</p>
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
                                        onChange={(e) => handleTitleChange(e.target.value)}
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
                                        onChange={(e) => handleSlugChange(e.target.value)}
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

                                {/* Featured */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="featured"
                                            checked={data.featured}
                                            onCheckedChange={(checked) => setData('featured', checked as boolean)}
                                        />
                                        <Label htmlFor="featured" className="!mb-0">
                                            Featured Tour
                                        </Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Mark this tour as featured to highlight it on the homepage</p>
                                    {errors.featured && <p className="text-sm text-destructive">{errors.featured}</p>}
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
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Descriptions</h3>

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
                                        {data.highlights.length > 1 && index > 0 && (
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
                                        {data.included.length > 1 && index > 0 && (
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

                        {/* What's Not Included */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">What's Not Included</h3>

                            <div className="space-y-3">
                                {data.not_included.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => updateNotIncluded(index, e.target.value)}
                                            placeholder="Enter not included item"
                                            className="flex-1"
                                        />
                                        {data.not_included.length > 1 && index > 0 && (
                                            <Button type="button" onClick={() => removeNotIncluded(index)} variant="outline" size="sm">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button type="button" onClick={addNotIncluded} variant="outline" className="mt-2">
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
                                            {data.itinerary.length > 1 && index > 0 && (
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

                        {/* Visited Tours Images */}
                        <div className="space-y-4">
                            <VisitedImageManager
                                images={data.visited_tours_images}
                                onImagesChange={(images, removed) => {
                                    setData('visited_tours_images', images);
                                    if (removed && removed.length > 0) {
                                        setRemovedImages(prev => [...prev, ...removed]);
                                    }
                                }}
                                disabled={processing}
                            />
                            {errors.visited_tours_images && <p className="text-sm text-destructive">{errors.visited_tours_images}</p>}

                            <p className="text-sm text-muted-foreground">
                                Upload multiple images to showcase the destinations visited during the tour. These will be displayed as an image slider.
                                Supported formats: JPEG, PNG, JPG, GIF, WebP (max 2MB each)
                            </p>
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
