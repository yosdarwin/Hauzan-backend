import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
        title: 'Create Slider',
        href: '/sliders/create',
    },
];

export default function SliderCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        image: null as File | null,
        button_text: '',
        button_link: '',
        order: 1,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/sliders');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Slider" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Create New Slider</h1>
                        <p className="text-muted-foreground">Add a new slider to your home page</p>
                    </div>
                    <Link href="/sliders">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Sliders
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Slider Details</CardTitle>
                        <CardDescription>
                            Fill in the information below to create a new slider
                        </CardDescription>
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
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>

                                {/* Subtitle */}
                                <div className="space-y-2">
                                    <Label htmlFor="subtitle">Subtitle</Label>
                                    <Input
                                        id="subtitle"
                                        value={data.subtitle}
                                        onChange={(e) => setData('subtitle', e.target.value)}
                                        placeholder="Enter slider subtitle"
                                        className={errors.subtitle ? 'border-destructive' : ''}
                                    />
                                    {errors.subtitle && (
                                        <p className="text-sm text-destructive">{errors.subtitle}</p>
                                    )}
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
                                    {errors.button_text && (
                                        <p className="text-sm text-destructive">{errors.button_text}</p>
                                    )}
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
                                    {errors.button_link && (
                                        <p className="text-sm text-destructive">{errors.button_link}</p>
                                    )}
                                </div>

                                {/* Order */}
                                <div className="space-y-2">
                                    <Label htmlFor="order">Display Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        min="1"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 1)}
                                        className={errors.order ? 'border-destructive' : ''}
                                    />
                                    {errors.order && (
                                        <p className="text-sm text-destructive">{errors.order}</p>
                                    )}
                                </div>

                                {/* Image */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Slider Image *</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className={errors.image ? 'border-destructive' : ''}
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-destructive">{errors.image}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Recommended size: 1920x1080px (JPG, PNG)
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
                                    {processing ? 'Creating...' : 'Create Slider'}
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
        </AppLayout>
    );
}
