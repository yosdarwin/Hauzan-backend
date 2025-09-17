import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Package, ShoppingBag, Tag } from 'lucide-react';

interface Souvenir {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface SouvenirShowProps {
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
        title: 'Details',
        href: '#',
    },
];

export default function SouvenirShow({ souvenir }: SouvenirShowProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price).replace('Rp', 'Rp.');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${souvenir.name} - Souvenir Details`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold">{souvenir.name}</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-lg font-semibold">
                                    {formatPrice(souvenir.price)}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/souvenirs/${souvenir.id}/edit`} className={cn(buttonVariants())}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Souvenir
                        </Link>
                        <Link href="/souvenirs" className={cn(buttonVariants({ variant: 'outline' }))}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Souvenirs
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Souvenir Image */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-center">
                                    {souvenir.image ? (
                                        <img 
                                            src={`/storage/${souvenir.image}`} 
                                            alt={souvenir.name} 
                                            className="h-64 w-full max-w-md rounded-lg object-cover border-4 border-gray-100" 
                                        />
                                    ) : (
                                        <div className="flex h-64 w-full max-w-md items-center justify-center rounded-lg bg-gray-100 border-4 border-gray-200">
                                            <Package className="h-24 w-24 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5" />
                                    Product Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-gray max-w-none">
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        {souvenir.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Price Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Pricing Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Price</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-green-600">
                                                {formatPrice(souvenir.price)}
                                            </span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="text-sm text-muted-foreground">
                                        Price includes all applicable taxes and fees
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Product Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Product Name</p>
                                        <p className="font-medium">{souvenir.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Price</p>
                                        <p className="font-medium text-green-600">{formatPrice(souvenir.price)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Created</p>
                                    <p className="font-medium">{formatDate(souvenir.created_at)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Last Updated</p>
                                    <p className="font-medium">{formatDate(souvenir.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Product Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="default" className="w-full justify-center">
                                    Available
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}