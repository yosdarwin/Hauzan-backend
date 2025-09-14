import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
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
        title: 'Create Tour',
        href: '/tours/create',
    },
];

export default function TourCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        full_description: '',
        price: '',
        duration: '',
        location: '',
        image: null as File | null,
        highlights: [''],
        itinerary: [{ day: 1, time: '', activity: '' }],
        included: [''],
        is_active: true,
    });

    // Auto-generate slug from title
    useEffect(() => {
        if (data.title && !data.slug) {
            const slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single
                .trim();
            setData('slug', slug);
        }
    }, [data.title, data.slug, setData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/tours');
    };

    const addHighlight = () => {
        setData('highlights', [...data.highlights, '']);
    };

    const removeHighlight = (index: number) => {
        if (data.highlights.length > 1) {
            const newHighlights = data.highlights.filter((_, i) => i !== index);
            setData('highlights', newHighlights);
        }
    };

    const updateHighlight = (index: number, value: string) => {
        const newHighlights = [...data.highlights];
        newHighlights[index] = value;
        setData('highlights', newHighlights);
    };

    const addIncluded = () => {
        setData('included', [...data.included, '']);
    };

    const removeIncluded = (index: number) => {
        if (data.included.length > 1) {
            const newIncluded = data.included.filter((_, i) => i !== index);
            setData('included', newIncluded);
        }
    };

    const updateIncluded = (index: number, value: string) => {
        const newIncluded = [...data.included];
        newIncluded[index] = value;
        setData('included', newIncluded);
    };

    const addItineraryItem = () => {
        const currentDay = data.itinerary.length > 0 ? data.itinerary[data.itinerary.length - 1].day : 1;
        setData('itinerary', [...data.itinerary, { day: currentDay, time: '', activity: '' }]);
    };

    const removeItineraryItem = (index: number) => {
        if (data.itinerary.length > 1) {
            const newItinerary = data.itinerary.filter((_, i) => i !== index);
            setData('itinerary', newItinerary);
        }
    };

    const updateItineraryItem = (index: number, field: string, value: string | number) => {
        const newItinerary = [...data.itinerary];
        newItinerary[index] = { ...newItinerary[index], [field]: value };
        setData('itinerary', newItinerary);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tour Package" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Create New Tour Package</h1>
                        <p className="text-muted-foreground">Add a new tour package to your offerings</p>
                    </div>
                    <Link href="/tours">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Tours
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tour Package Details</CardTitle>
                        <CardDescription>Fill in the information below to create a new tour package</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
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

                                {/* Image */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Tour Image *</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className={errors.image ? 'border-destructive' : ''}
                                    />
                                    {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                                </div>
                            </div>

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

                            {/* Highlights */}
                            <div className="space-y-2">
                                <Label>Tour Highlights</Label>
                                {data.highlights.map((highlight, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={highlight}
                                            onChange={(e) => updateHighlight(index, e.target.value)}
                                            placeholder="Enter highlight"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => removeHighlight(index)}
                                            disabled={data.highlights.length === 1}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addHighlight} className="mt-2">
                                    Add Highlight
                                </Button>
                            </div>

                            {/* Included */}
                            <div className="space-y-2">
                                <Label>What's Included</Label>
                                {data.included.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => updateIncluded(index, e.target.value)}
                                            placeholder="Enter included item"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => removeIncluded(index)}
                                            disabled={data.included.length === 1}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addIncluded} className="mt-2">
                                    Add Item
                                </Button>
                            </div>

                            {/* Detailed Itinerary */}
                            <div className="space-y-2">
                                <Label>Detailed Itinerary</Label>
                                <div className="space-y-3">
                                    {data.itinerary.map((item, index) => (
                                        <div key={index} className="space-y-3 rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Activity {index + 1}</h4>
                                                {data.itinerary.length > 1 && (
                                                    <Button type="button" variant="outline" size="sm" onClick={() => removeItineraryItem(index)}>
                                                        Remove
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
                                                        value={item.time}
                                                        onChange={(e) => updateItineraryItem(index, 'time', e.target.value)}
                                                        placeholder="08:00"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Activity</Label>
                                                    <Input
                                                        value={item.activity}
                                                        onChange={(e) => updateItineraryItem(index, 'activity', e.target.value)}
                                                        placeholder="Departure from Padang"
                                                        className="flex-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button type="button" variant="outline" onClick={addItineraryItem} className="mt-2">
                                    Add Activity
                                </Button>
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center space-x-2">
                                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', !!checked)} />
                                <Label htmlFor="is_active">Active (visible on website)</Label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Tour Package'}
                                </Button>
                                <Link href="/tours">
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
