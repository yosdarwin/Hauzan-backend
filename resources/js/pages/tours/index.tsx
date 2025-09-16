import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MapPin, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tour Packages',
        href: '/tours',
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
    created_at: string;
    updated_at: string;
}

interface ToursIndexProps {
    tours: Tour[];
}

export default function ToursIndex({ tours }: ToursIndexProps) {
    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this tour package?')) {
            router.delete(`/tours/${slug}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tour Packages" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tour Packages</h1>
                        <p className="text-muted-foreground">Manage your tour packages and destinations</p>
                    </div>
                    <Link 
                        href="/tours/create"
                        className={cn(buttonVariants())}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Tour
                    </Link>
                </div>

                {/* Tours Grid */}
                {tours && tours.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tours.map((tour) => (
                            <Card key={tour.id} className="overflow-hidden">
                                <div className="relative -mt-6 aspect-video overflow-hidden">
                                    {tour.image ? (
                                        <img src={`/storage/${tour.image}`} alt={tour.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted">
                                            <MapPin className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{tour.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{tour.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                                        <span>{tour.location}</span>
                                        <span>{tour.duration}</span>
                                    </div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-2xl font-bold text-green-600">{tour.price}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 xl:flex-row">
                                        <Link 
                                            href={`/tours/${tour.slug}`}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full xl:w-auto")}
                                        >
                                            <Eye className="mr-2 h-3 w-3" />
                                            View
                                        </Link>
                                        <Link 
                                            href={`/tours/${tour.slug}/edit`}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full xl:w-auto")}
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(tour.slug)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="mr-2 h-3 w-3" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="flex flex-col items-center justify-center py-16">
                        <MapPin className="mb-4 h-16 w-16 text-muted-foreground" />
                        <CardTitle className="mb-2">No tour packages found</CardTitle>
                        <CardDescription className="mb-4">Get started by creating your first tour package</CardDescription>
                        <Link 
                            href="/tours/create"
                            className={cn(buttonVariants())}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Tour
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
