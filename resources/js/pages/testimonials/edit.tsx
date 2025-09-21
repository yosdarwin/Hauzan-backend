import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Star, Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface Testimonial {
    id: number;
    name: string;
    review: string;
    rating: number;
    date: string;
    photo: string;
}

interface TestimonialEditProps {
    testimonial: Testimonial;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function TestimonialEdit({ testimonial }: TestimonialEditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, processing, errors } = useForm({
        name: testimonial.name || '',
        review: testimonial.review || '',
        rating: testimonial.rating || 5,
        date: testimonial.date || '',
        photo: null as File | null,
        _method: 'PUT',
    });

    const handleImageChange = (file: File | null) => {
        setData('photo', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const removeImage = () => {
        setData('photo', null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById('photo') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Add image file if present
        if (data.photo) {
            formData.append('photo', data.photo);
        }

        // Add all other fields to FormData
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'photo') {
                // Skip photo as we already added it above
                return;
            } else if (value !== null && value !== undefined) {
                formData.append(key, typeof value === 'string' ? value : String(value));
            }
        });

        router.post(`/testimonials/${testimonial.id}`, formData, {
            onError: (errors: Record<string, string | string[]>) => {
                const errorMessages = Object.entries(errors)
                    .map(([field, messages]) => {
                        const messageText = Array.isArray(messages) ? messages.join(', ') : messages;
                        return `${field}: ${messageText}`;
                    })
                    .join('\n');

                toast.error(`Validation errors:\n${errorMessages}`);
            },
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-5 w-5 cursor-pointer ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setData('rating', i + 1)}
            />
        ));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${testimonial.name}'s Testimonial`} />
            <div className="space-y-6 p-6">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href="/testimonials">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>Back to Testimonials</span>
                        </div>
                    </Link>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Testimonial</h1>
                        <p className="text-muted-foreground">Update testimonial information</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Basic Information */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">Customer Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={errors.name ? 'border-red-500' : ''}
                                            placeholder="Enter customer name"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="date">Date *</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            className={errors.date ? 'border-red-500' : ''}
                                        />
                                        {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="review">Review *</Label>
                                    <Textarea
                                        id="review"
                                        value={data.review}
                                        onChange={(e) => setData('review', e.target.value)}
                                        className={errors.review ? 'border-red-500' : ''}
                                        placeholder="Enter customer review"
                                        rows={4}
                                    />
                                    {errors.review && <p className="text-sm text-red-500">{errors.review}</p>}
                                </div>

                                <div>
                                    <Label>Rating *</Label>
                                    <div className="mt-2 flex items-center gap-1">
                                        {renderStars(data.rating)}
                                        <span className="ml-2 text-sm text-muted-foreground">({data.rating}/5)</span>
                                    </div>
                                    {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Image */}
                    <div className="space-y-6">
                        {/* Photo Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Photo (Optional)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 rounded-full object-cover" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                onClick={removeImage}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : testimonial.photo ? (
                                        <div className="relative">
                                            <img
                                                src={`/storage/${testimonial.photo}`}
                                                alt="Current photo"
                                                className="mx-auto h-32 w-32 rounded-full object-cover"
                                            />
                                            <p className="mt-2 text-center text-sm text-muted-foreground">Current photo</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
                                            <Upload className="h-8 w-8 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Upload customer photo</p>
                                        </div>
                                    )}

                                    <div>
                                        <Input
                                            id="photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                            className={errors.photo ? 'border-red-500' : ''}
                                        />
                                        {errors.photo && <p className="text-sm text-red-500">{errors.photo}</p>}
                                        {testimonial.photo && !imagePreview && (
                                            <p className="mt-1 text-xs text-muted-foreground">Choose a new file to replace the current photo</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Testimonial'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
