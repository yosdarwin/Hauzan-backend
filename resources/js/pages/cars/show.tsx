import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Car, CheckCircle, Clock, Edit, FileText, Settings, Star } from 'lucide-react';

interface CarRental {
    id: number;
    title: string;
    slug: string;
    full_description: string;
    price: number;
    duration: string;
    image: string;
    features: string[];
    specifications: Array<{ key: string; value: string }>;
    features_detail: string[];
    included: string[];
    terms: string[];
    pricing: Array<{ duration: string; price: string; note: string }>;
    featured: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface CarShowProps {
    car: CarRental;
}

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
        title: 'Details',
        href: '#',
    },
];

export default function CarShow({ car }: CarShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={car.title} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <h1 className="text-3xl font-bold">{car.title}</h1>
                            </div>
                            {/* Short description removed */}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/cars/${car.slug}/edit`} className={cn(buttonVariants())}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Car
                        </Link>
                        <Link href="/cars" className={cn(buttonVariants({ variant: 'outline' }))}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cars
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Car Image */}
                        <Card>
                            <CardContent className="p-0">
                                {car.image ? (
                                    <img src={`/storage/${car.image}`} alt={car.title} className="h-96 w-full rounded-lg object-cover" />
                                ) : (
                                    <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200">
                                        <Car className="h-16 w-16 text-gray-400" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Full Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{car.full_description}</p>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        {car.features && car.features.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="h-5 w-5" />
                                        Key Features
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {car.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Specifications */}
                        {car.specifications && car.specifications.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5" />
                                        Specifications
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {car.specifications.map((spec, index) => (
                                            <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <span className="font-medium text-gray-700 capitalize">{spec.key}</span>
                                                <span className="text-gray-600">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Features Detail */}
                        {car.features_detail && car.features_detail.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Features & Amenities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {car.features_detail.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-blue-500" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* What's Included */}
                        {car.included && car.included.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>What's Included</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {car.included.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Terms & Conditions */}
                        {car.terms && car.terms.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Not Included</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {car.terms.map((term, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <span className="mt-1 text-gray-400">•</span>
                                                <span>{term}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Pricing and Info */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">Pricing Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-lg bg-blue-50 p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })
                                            .format(car.price)
                                            .replace('Rp', 'Rp.')}
                                    </div>
                                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        {car.duration}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rental Pricing Options */}
                        {car.pricing && car.pricing.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rental Options</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {car.pricing.map((price, index) => (
                                        <div key={index} className="rounded-lg border p-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="font-medium">{price.duration}</div>
                                                    {price.note && <div className="text-sm text-gray-600">{price.note}</div>}
                                                </div>
                                                <div className="text-lg font-bold text-blue-600">{price.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Record Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Created:</span>
                                    <span>{new Date(car.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Updated:</span>
                                    <span>{new Date(car.updated_at).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href={`/cars/${car.slug}/edit`} className={cn(buttonVariants({ className: 'w-full' }))}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Car Details
                                </Link>
                                <Link href="/cars" className={cn(buttonVariants({ variant: 'outline', className: 'w-full' }))}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Car List
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
