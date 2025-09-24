import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Edit, Images, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
        title: 'View Tour',
        href: '#',
    },
];

interface Tour {
    id: number;
    title: string;
    slug: string;
    description: string;
    full_description: string;
    price: number;
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
    not_included: string[];
    visited_tours_images?: Array<{ image: string; description: string }> | string[];
    created_at: string;
    updated_at: string;
}

interface TourShowProps {
    tour: Tour;
}

export default function TourShow({ tour }: TourShowProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this tour package?')) {
            router.delete(`/tours/${tour.slug}`);
        }
    };

    const nextImage = () => {
        if (tour.visited_tours_images && tour.visited_tours_images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % tour.visited_tours_images!.length);
        }
    };

    const previousImage = () => {
        if (tour.visited_tours_images && tour.visited_tours_images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + tour.visited_tours_images!.length) % tour.visited_tours_images!.length);
        }
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${tour.title} - Tour Package`} />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="mb-4">
                    <Link href="/tours">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>Back to Tours</span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">{tour.title}</h1>
                            <p className="text-muted-foreground">Tour Package Details</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={`/tours/${tour.slug}/edit`}
                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium whitespace-nowrap ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Tour Image */}
                        <Card className="py-0">
                            <CardContent className="p-0">
                                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                    <img src={`/storage/${tour.image}`} alt={tour.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <h2 className="mb-2 text-xl font-semibold">About This Tour</h2>
                                    <p className="mb-4 text-muted-foreground">{tour.description}</p>
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap">{tour.full_description}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Highlights */}
                        {tour.highlights && Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="h-5 w-5" />
                                        Tour Highlights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {tour.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Itinerary */}
                        {tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Itinerary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {tour.itinerary.map((item, index) => (
                                            <div key={index} className="border-l-2 border-primary pl-4">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="text-sm font-medium text-primary">Day {item.day}</span>
                                                    {item.time && <span className="font-medium">{item.time}</span>}
                                                </div>
                                                {item.activity && <p className="text-sm text-muted-foreground">{item.activity}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* What's Included */}
                        {tour.included && Array.isArray(tour.included) && tour.included.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>What's Included</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {tour.included.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* What's Not Included */}
                        {tour.not_included && Array.isArray(tour.not_included) && tour.not_included.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>What's Not Included</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {tour.not_included.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Visited Tours Images Slider */}
                        {tour.visited_tours_images && Array.isArray(tour.visited_tours_images) && tour.visited_tours_images.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Images className="h-5 w-5" />
                                        Visited Tours Gallery
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative">
                                        {/* Main Image Display */}
                                        <div className="relative aspect-video overflow-hidden rounded-lg">
                                            {(() => {
                                                const currentImage = tour.visited_tours_images[currentImageIndex];
                                                const isLegacyFormat = typeof currentImage === 'string';
                                                const imagePath = isLegacyFormat ? currentImage : currentImage.image;
                                                const description = isLegacyFormat ? '' : currentImage.description;

                                                return (
                                                    <>
                                                        <img
                                                            src={`/storage/${imagePath}`}
                                                            alt={description || `Visited tour ${currentImageIndex + 1}`}
                                                            className="h-full w-full object-cover transition-all duration-300"
                                                        />
                                                        {/* Image Description Overlay */}
                                                        {description && (
                                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
                                                                <p className="text-sm">{description}</p>
                                                            </div>
                                                        )}
                                                    </>
                                                );
                                            })()}

                                            {/* Navigation Arrows */}
                                            {tour.visited_tours_images.length > 1 && (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                                                        onClick={previousImage}
                                                    >
                                                        <ChevronLeft className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                                                        onClick={nextImage}
                                                    >
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}

                                            {/* Image Counter */}
                                            <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-sm text-white">
                                                {currentImageIndex + 1} / {tour.visited_tours_images.length}
                                            </div>
                                        </div>

                                        {/* Thumbnail Navigation */}
                                        {tour.visited_tours_images.length > 1 && (
                                            <div className="mt-4 flex gap-2 overflow-x-auto">
                                                {tour.visited_tours_images.map((imageData, index) => {
                                                    const isLegacyFormat = typeof imageData === 'string';
                                                    const imagePath = isLegacyFormat ? imageData : imageData.image;
                                                    const description = isLegacyFormat ? '' : imageData.description;

                                                    return (
                                                        <button
                                                            key={index}
                                                            className={`flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                                                                index === currentImageIndex
                                                                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                                                                    : 'border-gray-200 hover:border-primary/50'
                                                            }`}
                                                            onClick={() => goToImage(index)}
                                                            title={description || `Image ${index + 1}`}
                                                        >
                                                            <img
                                                                src={`/storage/${imagePath}`}
                                                                alt={description || `Thumbnail ${index + 1}`}
                                                                className="h-16 w-20 object-cover"
                                                            />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Tour Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tour Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Price</p>
                                        <p className="font-semibold text-green-600">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })
                                                .format(tour.price)
                                                .replace('Rp', 'Rp.')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-semibold">{tour.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-semibold">{tour.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tour Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">URL Slug</p>
                                    <p className="font-mono text-sm">{tour.slug}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Created</p>
                                    <p className="text-sm">{new Date(tour.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Updated</p>
                                    <p className="text-sm">{new Date(tour.updated_at).toLocaleDateString()}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
