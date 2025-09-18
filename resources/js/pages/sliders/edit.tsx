import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Home Sliders',
        href: '/sliders',
    },
    {
        title: 'Edit Slider',
        href: '#',
    },
];

interface Slider {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    button_text: string;
    button_link: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface SliderEditProps {
    slider: Slider;
}

export default function SliderEdit({ slider }: SliderEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: slider.title || '',
        subtitle: slider.subtitle || '',
        image: null as File | null,
        button_text: slider.button_text || '',
        button_link: slider.button_link || '',
        is_active: slider.is_active || false,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/sliders/${slider.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Slider: ${slider.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Slider</h1>
                        <p className="text-muted-foreground">Update slider information</p>
                    </div>
                    <Link href="/sliders">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Sliders
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Slider Details</CardTitle>
                                <CardDescription>Update the information below to modify the slider</CardDescription>
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
                                                placeholder="Enter slider title"
                                                className={errors.title ? 'border-destructive' : ''}
                                            />
                                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                        </div>

                                        {/* Subtitle */}
                                        <div className="space-y-2">
                                            <Label htmlFor="subtitle">Subtitle</Label>
                                            <Textarea
                                                id="subtitle"
                                                value={data.subtitle}
                                                onChange={(e) => setData('subtitle', e.target.value)}
                                                placeholder="Enter slider subtitle"
                                                className={errors.subtitle ? 'border-destructive' : ''}
                                            />
                                            {errors.subtitle && <p className="text-sm text-destructive">{errors.subtitle}</p>}
                                        </div>

                                        {/* Button Text */}
                                        <div className="space-y-2">
                                            <Label htmlFor="button_text">Button Text</Label>
                                            <Input
                                                id="button_text"
                                                value={data.button_text}
                                                onChange={(e) => setData('button_text', e.target.value)}
                                                placeholder="e.g., Learn More"
                                                className={errors.button_text ? 'border-destructive' : ''}
                                            />
                                            {errors.button_text && <p className="text-sm text-destructive">{errors.button_text}</p>}
                                        </div>

                                        {/* Button Link */}
                                        <div className="space-y-2">
                                            <Label htmlFor="button_link">Button Link</Label>
                                            <Input
                                                id="button_link"
                                                value={data.button_link}
                                                onChange={(e) => setData('button_link', e.target.value)}
                                                placeholder="https://example.com or /page"
                                                className={errors.button_link ? 'border-destructive' : ''}
                                            />
                                            {errors.button_link && <p className="text-sm text-destructive">{errors.button_link}</p>}
                                        </div>

                                        {/* Image */}
                                        <div className="space-y-2">
                                            <Label htmlFor="image">Slider Image</Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                                className={errors.image ? 'border-destructive' : ''}
                                            />
                                            {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                                            <p className="text-sm text-muted-foreground">
                                                Leave empty to keep current image. Recommended size: 1920x1080px (JPG, PNG)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', !!checked)}
                                        />
                                        <Label htmlFor="is_active">Active (visible on website)</Label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-4">
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            {processing ? 'Updating...' : 'Update Slider'}
                                        </Button>
                                        <Link href="/sliders">
                                            <Button variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Current Image Preview */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Image</CardTitle>
                                <CardDescription>This is the current slider image</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="relative aspect-video overflow-hidden rounded-lg border">
                                    {slider.image ? (
                                        <img src={`/storage/${slider.image}`} alt={slider.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted">
                                            <p className="text-muted-foreground">No image uploaded</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
