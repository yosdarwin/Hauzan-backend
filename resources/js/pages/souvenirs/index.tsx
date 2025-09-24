import PaginationWrapper from '@/components/pagination-wrapper';
import SouvenirHeaderForm from '@/components/SouvenirHeaderForm';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Gift, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Souvenirs',
        href: '/souvenirs',
    },
];

interface Souvenir {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedSouvenirs {
    current_page: number;
    data: Souvenir[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface SouvenirsIndexProps {
    souvenirs: PaginatedSouvenirs;
}

export default function SouvenirsIndex({ souvenirs }: SouvenirsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this souvenir?')) {
            router.delete(`/souvenirs/${id}`);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price).replace('Rp', 'Rp.');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Souvenirs" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header Settings Form */}
                <SouvenirHeaderForm />

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Souvenirs</h1>
                        <p className="text-muted-foreground">Manage souvenir products and inventory</p>
                    </div>
                    <Link href="/souvenirs/create" className={cn(buttonVariants())}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Souvenir
                    </Link>
                </div>

                {/* Souvenirs Grid */}
                {souvenirs.data && souvenirs.data.length > 0 ? (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {souvenirs.data.map((souvenir) => (
                            <Card key={souvenir.id} className="overflow-hidden">
                                <CardHeader className="p-0">
                                    <div className="aspect-video w-full overflow-hidden bg-muted">
                                        {souvenir.image ? (
                                            <img src={`/storage/${souvenir.image}`} alt={souvenir.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <Gift className="h-12 w-12 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="mb-2">
                                        <CardTitle className="line-clamp-1 text-lg">{souvenir.name}</CardTitle>
                                        <Badge variant="secondary" className="mt-1">
                                            {formatPrice(souvenir.price)}
                                        </Badge>
                                    </div>

                                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{souvenir.description}</p>

                                    <div className="flex gap-2">
                                        <Link href={`/souvenirs/${souvenir.id}`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                                            <Eye className="mr-2 h-3 w-3" />
                                            View
                                        </Link>
                                        <Link
                                            href={`/souvenirs/${souvenir.id}/edit`}
                                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(souvenir.id)}
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

                        {/* Pagination */}
                        <PaginationWrapper data={souvenirs} className="mt-8" />
                    </>
                ) : (
                    <Card className="flex flex-col items-center justify-center py-16">
                        <Gift className="mb-4 h-16 w-16 text-muted-foreground" />
                        <CardTitle className="mb-2">No souvenirs found</CardTitle>
                        <CardDescription className="mb-4">Get started by adding your first souvenir product</CardDescription>
                        <Link href="/souvenirs/create" className={cn(buttonVariants())}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Souvenir
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
