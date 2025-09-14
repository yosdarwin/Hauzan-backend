import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Car } from 'lucide-react';

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
    name: string;
    slug: string;
    description: string;
    price_per_day: number;
    capacity: number;
    transmission: string;
    fuel_type: string;
    image: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface CarsIndexProps {
    cars: CarRental[];
}

export default function CarsIndex({ cars }: CarsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this car rental?')) {
            router.delete(`/cars/${id}`);
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
                    <Link href="/cars/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Car
                        </Button>
                    </Link>
                </div>

                {/* Cars Grid */}
                {cars && cars.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {cars.map((car) => (
                            <Card key={car.id} className="overflow-hidden">
                                <div className="aspect-video relative overflow-hidden">
                                    {car.image ? (
                                        <img
                                            src={`/storage/${car.image}`}
                                            alt={car.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-muted">
                                            <Car className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={car.is_active ? "default" : "secondary"}>
                                            {car.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{car.name}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {car.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                                        <span>Capacity: {car.capacity} people</span>
                                        <span>{car.transmission}</span>
                                        <span>{car.fuel_type}</span>
                                        <span>/{car.slug}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-green-600">
                                            ${car.price_per_day}/day
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/cars/${car.slug}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="mr-2 h-3 w-3" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/cars/${car.slug}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="mr-2 h-3 w-3" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(car.id)}
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
                        <Car className="h-16 w-16 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">No car rentals found</CardTitle>
                        <CardDescription className="mb-4">
                            Get started by adding your first car rental
                        </CardDescription>
                        <Link href="/cars/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add First Car
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
