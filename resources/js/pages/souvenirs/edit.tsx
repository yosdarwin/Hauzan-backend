import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Gift, Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface Souvenir {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    title: string;
}

interface SouvenirEditProps {
    souvenir: Souvenir;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Souvenirs',
        href: '/souvenirs',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function SouvenirEdit({ souvenir }: SouvenirEditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, processing, errors } = useForm({
        title: souvenir.name || '',
        short_desc: souvenir.description || '',
        price: souvenir.price?.toString() || '',
        image: null as File | null,
        _method: 'PUT',
    });

    const handleImageChange = (file: File | null) => {
        setData('image', file);

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
        setData('image', null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Add image file if present
        if (data.image) {
            formData.append('image', data.image);
        }

        // Add all other fields to FormData
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'image') {
                // Skip image as we already added it above
                return;
            } else if (key === 'price' && typeof value === 'string') {
                // Convert Indonesian format (237.000) to number (237000)
                const numericPrice = value.replace(/\./g, '');
                formData.append(key, numericPrice);
            } else if (value !== null && value !== undefined) {
                formData.append(key, typeof value === 'string' ? value : String(value));
            }
        });

        router.post(`/souvenirs/${souvenir.id}`, formData, {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${souvenir.title}`} />
            <div className="space-y-6 p-6">
                {/* Back Button */}
                <div className="mb-4">
                    <Link href="/souvenirs">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>Back to Souvenirs</span>
                        </div>
                    </Link>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Souvenir</h1>
                        <p className="text-muted-foreground">Update souvenir information</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Basic Information */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Product Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={errors.title ? 'border-red-500' : ''}
                                        placeholder="Enter product title"
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="price">Price (IDR) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => {
                                            // Remove decimal places and keep only whole numbers
                                            const value = e.target.value;
                                            const wholeNumber = Math.floor(parseFloat(value) || 0);
                                            setData('price', wholeNumber.toString());
                                        }}
                                        className={errors.price ? 'border-red-500' : ''}
                                        placeholder="Enter price (e.g., 237000)"
                                        step="1"
                                    />

                                    {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="short_desc">Short Description *</Label>
                                    <Textarea
                                        id="short_desc"
                                        value={data.short_desc}
                                        onChange={(e) => setData('short_desc', e.target.value)}
                                        className={errors.short_desc ? 'border-red-500' : ''}
                                        placeholder="Enter a brief description of the product"
                                        rows={4}
                                    />
                                    {errors.short_desc && <p className="text-sm text-red-500">{errors.short_desc}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Image */}
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Current Image */}
                                    {souvenir.image && !imagePreview && (
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">Current Image</Label>
                                            <img
                                                src={`/storage/${souvenir.image}`}
                                                alt={souvenir.title}
                                                className="aspect-video w-full rounded-lg object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* New Image Preview */}
                                    {imagePreview ? (
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">New Image Preview</Label>
                                            <div className="relative">
                                                <img src={imagePreview} alt="Preview" className="aspect-video w-full rounded-lg object-cover" />
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
                                        </div>
                                    ) : (
                                        !souvenir.image && (
                                            <div className="flex aspect-video flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
                                                <Gift className="mb-2 h-12 w-12 text-muted-foreground" />
                                                <Upload className="h-8 w-8 text-muted-foreground" />
                                                <p className="mt-2 text-center text-sm text-muted-foreground">Upload product image</p>
                                                <p className="text-xs text-muted-foreground">Recommended: 16:9 aspect ratio</p>
                                            </div>
                                        )
                                    )}

                                    <div>
                                        <Label htmlFor="image" className="text-sm">
                                            {souvenir.image ? 'Replace Image (Optional)' : 'Upload Image *'}
                                        </Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                            className={errors.image ? 'border-red-500' : ''}
                                        />
                                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Souvenir'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
