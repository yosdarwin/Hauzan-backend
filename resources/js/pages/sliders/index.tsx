import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Image } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Home Sliders',
        href: '/sliders',
    },
];

interface Slider {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    button_text: string;
    button_link: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface SlidersIndexProps {
    sliders: Slider[];
}

export default function SlidersIndex({ sliders }: SlidersIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this slider?')) {
            router.delete(`/sliders/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home Sliders" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Home Sliders</h1>
                        <p className="text-muted-foreground">Manage your website's home page sliders</p>
                    </div>
                    <Link href="/sliders/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Slider
                        </Button>
                    </Link>
                </div>

                {/* Sliders Grid */}
                {sliders && sliders.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sliders.map((slider) => (
                            <Card key={slider.id} className="overflow-hidden">
                                <div className="aspect-video relative overflow-hidden">
                                    {slider.image ? (
                                        <img
                                            src={`/storage/${slider.image}`}
                                            alt={slider.title}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-muted">
                                            <Image className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={slider.is_active ? "default" : "secondary"}>
                                            {slider.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{slider.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {slider.subtitle}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                        <span>Order: {slider.order}</span>
                                        <span>Button: {slider.button_text}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/sliders/${slider.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="mr-2 h-3 w-3" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/sliders/${slider.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="mr-2 h-3 w-3" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(slider.id)}
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
                        <Image className="h-16 w-16 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">No sliders found</CardTitle>
                        <CardDescription className="mb-4">
                            Get started by creating your first slider
                        </CardDescription>
                        <Link href="/sliders/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add First Slider
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
