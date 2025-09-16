import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Car Rentals',
        href: '/cars',
    },
    {
        title: 'Create',
        href: '/cars/create',
    },
];

export default function CarCreate() {
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        full_description: '',
        price: '',
        duration: '',
        image: null as File | null,
        features: [''],
        specifications: [{ key: '', value: '' }],
        features_detail: [''],
        included: [''],
        terms: [''],
        pricing: [{ duration: '', price: '', note: '' }],
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (value: string) => {
        setData('title', value);
        if (!isSlugManuallyEdited) {
            setData('slug', generateSlug(value));
        }
    };

    const handleSlugChange = (value: string) => {
        setIsSlugManuallyEdited(true);
        setData('slug', value);
    };

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

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index: number) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const addSpecification = () => {
        setData('specifications', [...data.specifications, { key: '', value: '' }]);
    };

    const removeSpecification = (index: number) => {
        const newSpecs = data.specifications.filter((_, i) => i !== index);
        setData('specifications', newSpecs);
    };

    const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...data.specifications];
        newSpecs[index][field] = value;
        setData('specifications', newSpecs);
    };

    const addFeaturesDetail = () => {
        setData('features_detail', [...data.features_detail, '']);
    };

    const removeFeaturesDetail = (index: number) => {
        const newFeaturesDetail = data.features_detail.filter((_, i) => i !== index);
        setData('features_detail', newFeaturesDetail);
    };

    const updateFeaturesDetail = (index: number, value: string) => {
        const newFeaturesDetail = [...data.features_detail];
        newFeaturesDetail[index] = value;
        setData('features_detail', newFeaturesDetail);
    };

    const addIncluded = () => {
        setData('included', [...data.included, '']);
    };

    const removeIncluded = (index: number) => {
        const newIncluded = data.included.filter((_, i) => i !== index);
        setData('included', newIncluded);
    };

    const updateIncluded = (index: number, value: string) => {
        const newIncluded = [...data.included];
        newIncluded[index] = value;
        setData('included', newIncluded);
    };

    const addTerm = () => {
        setData('terms', [...data.terms, '']);
    };

    const removeTerm = (index: number) => {
        const newTerms = data.terms.filter((_, i) => i !== index);
        setData('terms', newTerms);
    };

    const updateTerm = (index: number, value: string) => {
        const newTerms = [...data.terms];
        newTerms[index] = value;
        setData('terms', newTerms);
    };

    const addPricing = () => {
        setData('pricing', [...data.pricing, { duration: '', price: '', note: '' }]);
    };

    const removePricing = (index: number) => {
        const newPricing = data.pricing.filter((_, i) => i !== index);
        setData('pricing', newPricing);
    };

    const updatePricing = (index: number, field: 'duration' | 'price' | 'note', value: string) => {
        const newPricing = [...data.pricing];
        newPricing[index][field] = value;
        setData('pricing', newPricing);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Filter out empty values
        const filteredData = {
            ...data,
            features: data.features.filter((item) => item && item.trim() !== ''),
            specifications: data.specifications.filter((item) => item.key && item.key.trim() !== '' && item.value && item.value.trim() !== ''),
            features_detail: data.features_detail.filter((item) => item && item.trim() !== ''),
            included: data.included.filter((item) => item && item.trim() !== ''),
            terms: data.terms.filter((item) => item && item.trim() !== ''),
            pricing: data.pricing.filter((item) => item.duration && item.duration.trim() !== '' && item.price && item.price.trim() !== ''),
        };

        const formData = new FormData();

        // Add image file first
        if (data.image) {
            formData.append('image', data.image);
        }

        // Add all other fields to FormData (excluding image since we already added it)
        Object.entries(filteredData).forEach(([key, value]) => {
            if (key === 'image') {
                // Skip image as we already added it above
                return;
            } else if (key === 'features' || key === 'features_detail' || key === 'included' || key === 'terms') {
                // Handle simple arrays
                if (Array.isArray(value)) {
                    (value as string[]).forEach((item: string, index: number) => {
                        formData.append(`${key}[${index}]`, item);
                    });
                }
            } else if (key === 'specifications') {
                // Handle specifications array
                if (Array.isArray(value)) {
                    (value as Array<{ key: string; value: string }>).forEach((item, index) => {
                        formData.append(`${key}[${index}][key]`, item.key);
                        formData.append(`${key}[${index}][value]`, item.value);
                    });
                }
            } else if (key === 'pricing') {
                // Handle pricing array
                if (Array.isArray(value)) {
                    (value as Array<{ duration: string; price: string; note: string }>).forEach((item, index) => {
                        formData.append(`${key}[${index}][duration]`, item.duration);
                        formData.append(`${key}[${index}][price]`, item.price);
                        formData.append(`${key}[${index}][note]`, item.note);
                    });
                }
            } else if (value !== null && value !== undefined) {
                formData.append(key, typeof value === 'string' ? value : String(value));
            }
        });

        router.post('/cars', formData, {
            onError: (errors: Record<string, string | string[]>) => {
                const errorMessages = Object.entries(errors)
                    .map(([field, messages]) => {
                        const messageText = Array.isArray(messages) ? messages.join(', ') : messages;
                        return `${field}: ${messageText}`;
                    })
                    .join('\n');

                alert(`Validation errors:\n${errorMessages}`);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Car Rental" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Create Car Rental</h1>
                        <p className="text-muted-foreground">Add a new car to your rental fleet</p>
                    </div>
                    <Link href="/cars">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cars
                        </Button>
                    </Link>
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
                                        <Label htmlFor="title">Car Title *</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            placeholder="e.g., Toyota Innova"
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="slug">Slug *</Label>
                                        <Input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => handleSlugChange(e.target.value)}
                                            placeholder="e.g., toyota-innova"
                                            className={errors.slug ? 'border-red-500' : ''}
                                        />
                                        {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="price">Price *</Label>
                                        <Input
                                            id="price"
                                            type="text"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="e.g., Rp 350,000"
                                            className={errors.price ? 'border-red-500' : ''}
                                        />
                                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="duration">Duration *</Label>
                                        <Input
                                            id="duration"
                                            type="text"
                                            value={data.duration}
                                            onChange={(e) => setData('duration', e.target.value)}
                                            placeholder="e.g., Per Day"
                                            className={errors.duration ? 'border-red-500' : ''}
                                        />
                                        {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="description">Short Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Brief description of the car"
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={3}
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="full_description">Full Description *</Label>
                                    <Textarea
                                        id="full_description"
                                        value={data.full_description}
                                        onChange={(e) => setData('full_description', e.target.value)}
                                        placeholder="Detailed description of the car"
                                        className={errors.full_description ? 'border-red-500' : ''}
                                        rows={5}
                                    />
                                    {errors.full_description && <p className="mt-1 text-sm text-red-500">{errors.full_description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Features</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="e.g., Dual Zone Air Conditioning"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeFeature(index)}
                                            disabled={data.features.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addFeature}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Feature
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Specifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Specifications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.specifications.map((spec, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={spec.key}
                                            onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                                            placeholder="e.g., engine"
                                        />
                                        <Input
                                            value={spec.value}
                                            onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                            placeholder="e.g., 2.0L DOHC VVT-i"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeSpecification(index)}
                                            disabled={data.specifications.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addSpecification}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Specification
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Features Detail */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Features & Amenities</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.features_detail.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeaturesDetail(index, e.target.value)}
                                            placeholder="e.g., Electric Power Steering"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeFeaturesDetail(index)}
                                            disabled={data.features_detail.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addFeaturesDetail}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Feature Detail
                                </Button>
                            </CardContent>
                        </Card>

                        {/* What's Included */}
                        <Card>
                            <CardHeader>
                                <CardTitle>What's Included</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.included.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => updateIncluded(index, e.target.value)}
                                            placeholder="e.g., Vehicle rental"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeIncluded(index)}
                                            disabled={data.included.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addIncluded}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Included Item
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Terms & Conditions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Terms & Conditions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.terms.map((term, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={term}
                                            onChange={(e) => updateTerm(index, e.target.value)}
                                            placeholder="e.g., Valid driving license required"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeTerm(index)}
                                            disabled={data.terms.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addTerm}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Term
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Rental Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.pricing.map((price, index) => (
                                    <div key={index} className="grid gap-2 md:grid-cols-4">
                                        <Input
                                            value={price.duration}
                                            onChange={(e) => updatePricing(index, 'duration', e.target.value)}
                                            placeholder="e.g., 1 Day"
                                        />
                                        <Input
                                            value={price.price}
                                            onChange={(e) => updatePricing(index, 'price', e.target.value)}
                                            placeholder="e.g., Rp 350,000"
                                        />
                                        <Input
                                            value={price.note}
                                            onChange={(e) => updatePricing(index, 'note', e.target.value)}
                                            placeholder="e.g., 24 hours rental"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removePricing(index)}
                                            disabled={data.pricing.length === 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addPricing}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Pricing Option
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Image and Settings */}
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Car Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="image">Upload Image *</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                            className={errors.image ? 'border-red-500' : ''}
                                        />
                                        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                                        <p className="mt-1 text-sm text-muted-foreground">Max size: 2MB. Formats: JPEG, PNG, JPG, GIF, WebP</p>
                                    </div>
                                    
                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg border"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={removeImage}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <Card>
                            <CardContent className="pt-6">
                                <Button type="submit" className="w-full" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Car Rental'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
