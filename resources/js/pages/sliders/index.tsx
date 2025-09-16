import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Image, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
                    <Link 
                        href="/sliders/create"
                        className={cn(buttonVariants())}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Slider
                    </Link>
                </div>

                {/* Sliders Grid */}
                {sliders && sliders.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sliders.map((slider) => (
                            <Card key={slider.id} className="overflow-hidden">
                                <div className="relative -mt-6 aspect-video overflow-hidden">
                                    {slider.image ? (
                                        <img src={`/storage/${slider.image}`} alt={slider.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted">
                                            <Image className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <Badge variant={slider.is_active ? 'default' : 'secondary'}>{slider.is_active ? 'Active' : 'Inactive'}</Badge>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{slider.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{slider.subtitle}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="align-center flex flex-col gap-2 xl:flex-row">
                                        <Link 
                                            href={`/sliders/${slider.id}`}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full xl:w-auto")}
                                        >
                                            <Eye className="mr-2 h-3 w-3" />
                                            View
                                        </Link>
                                        <Link 
                                            href={`/sliders/${slider.id}/edit`}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full xl:w-auto")}
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
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
                        <Image className="mb-4 h-16 w-16 text-muted-foreground" />
                        <CardTitle className="mb-2">No sliders found</CardTitle>
                        <CardDescription className="mb-4">Get started by creating your first slider</CardDescription>
                        <Link 
                            href="/sliders/create"
                            className={cn(buttonVariants())}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Slider
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
