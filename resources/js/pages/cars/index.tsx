import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Car, Edit, Eye, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Car Rentals',
        href: '/cars',
    },
];

interface CarRental {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    duration: string;
    image: string;
    featured: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface CarsIndexProps {
    cars: CarRental[];
}

export default function CarsIndex({ cars }: CarsIndexProps) {
    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this car rental?')) {
            router.delete(`/cars/${slug}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Car Rentals" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Car Rentals</h1>
                        <p className="text-muted-foreground">Manage your car rental fleet</p>
                    </div>
                    <Link href="/cars/create" className={cn(buttonVariants())}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Car
                    </Link>
                </div>

                {/* Cars Grid */}
                {cars && cars.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {cars.map((car) => (
                            <Card key={car.id} className="overflow-hidden">
                                <div className="relative -mt-6 aspect-video overflow-hidden">
                                    {car.image ? (
                                        <img src={`/storage/${car.image}`} alt={car.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted">
                                            <Car className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{car.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{car.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                        <span>Duration: {car.duration}</span>
                                    </div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-2xl font-bold text-green-600">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }).format(Number(car.price)).replace('Rp', 'Rp.')}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 xl:flex-row">
                                        <Link
                                            href={`/cars/${car.slug}`}
                                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full xl:w-auto')}
                                        >
                                            <Eye className="mr-2 h-3 w-3" />
                                            View
                                        </Link>
                                        <Link
                                            href={`/cars/${car.slug}/edit`}
                                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full xl:w-auto')}
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(car.slug)}
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
                        <Car className="mb-4 h-16 w-16 text-muted-foreground" />
                        <CardTitle className="mb-2">No car rentals found</CardTitle>
                        <CardDescription className="mb-4">Get started by adding your first car rental</CardDescription>
                        <Link href="/cars/create" className={cn(buttonVariants())}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Car
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
