import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MapPin, Plus, Trash2 } from 'lucide-react';

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
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface ToursIndexProps {
    tours: Tour[];
}

export default function ToursIndex({ tours }: ToursIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tour package?')) {
            router.delete(`/tours/${id}`);
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
                    <Link href="/tours/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Tour
                        </Button>
                    </Link>
                </div>

                {/* Tours Grid */}
                {tours && tours.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tours.map((tour) => (
                            <Card key={tour.id} className="overflow-hidden">
                                <div className="relative aspect-video overflow-hidden">
                                    {tour.image ? (
                                        <img src={`/storage/${tour.image}`} alt={tour.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted">
                                            <MapPin className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={tour.is_active ? 'default' : 'secondary'}>{tour.is_active ? 'Active' : 'Inactive'}</Badge>
                                    </div>
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
                                        <span className="text-sm text-muted-foreground">/{tour.slug}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/tours/${tour.slug}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="mr-2 h-3 w-3" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/tours/${tour.slug}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="mr-2 h-3 w-3" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(tour.id)}
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
                        <Link href="/tours/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add First Tour
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
