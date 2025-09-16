import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, ExternalLink } from 'lucide-react';
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
    {
        title: 'View Slider',
        href: '#',
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

interface SliderShowProps {
    slider: Slider;
}

export default function SliderShow({ slider }: SliderShowProps) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this slider?')) {
            router.delete(`/sliders/${slider.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Slider: ${slider.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{slider.title}</h1>
                        <p className="text-muted-foreground">View slider details</p>
                    </div>
                    <div className="flex gap-2">
                        <Link 
                            href={`/sliders/${slider.id}/edit`}
                            className={cn(buttonVariants())}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Slider
                        </Link>
                        <Link 
                            href="/sliders"
                            className={cn(buttonVariants({ variant: "outline" }))}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Image Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Slider Preview</CardTitle>
                                <CardDescription>How this slider appears on your website</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video relative overflow-hidden rounded-lg border">
                                    {slider.image ? (
                                        <img
                                            src={`/storage/${slider.image}`}
                                            alt={slider.title}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-muted">
                                            <p className="text-muted-foreground">No image uploaded</p>
                                        </div>
                                    )}
                                    
                                    {/* Overlay content simulation */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="text-center text-white p-6">
                                            <h2 className="text-4xl font-bold mb-4">{slider.title}</h2>
                                            {slider.subtitle && (
                                                <p className="text-xl mb-6">{slider.subtitle}</p>
                                            )}
                                            {slider.button_text && (
                                                <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg">
                                                    {slider.button_text}
                                                    {slider.button_link && (
                                                        <ExternalLink className="ml-2 h-4 w-4" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Slider Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">
                                        <Badge variant={slider.is_active ? "default" : "secondary"}>
                                            {slider.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Button Text</label>
                                    <p className="mt-1">{slider.button_text || 'No button text'}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Button Link</label>
                                    <p className="mt-1 break-all">{slider.button_link || 'No button link'}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                                    <p className="mt-1">{new Date(slider.created_at).toLocaleDateString()}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <p className="mt-1">{new Date(slider.updated_at).toLocaleDateString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link 
                                    href={`/sliders/${slider.id}/edit`} 
                                    className={cn(buttonVariants({ variant: "outline", className: "w-full" }))}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Slider
                                </Link>
                                <Button
                                    variant="outline"
                                    className="w-full text-destructive hover:text-destructive"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Slider
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
