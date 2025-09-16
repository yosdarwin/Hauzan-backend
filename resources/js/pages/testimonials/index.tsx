import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, MessageSquare, Plus, Star, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
    },
];

interface Testimonial {
    id: number;
    name: string;
    email: string;
    review: string;
    rating: number;
    photo: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface TestimonialsIndexProps {
    testimonials: Testimonial[];
}

export default function TestimonialsIndex({ testimonials }: TestimonialsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(`/testimonials/${id}`);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testimonials" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Testimonials</h1>
                        <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
                    </div>
                    <Link 
                        href="/testimonials/create"
                        className={cn(buttonVariants())}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Testimonial
                    </Link>
                </div>

                {/* Testimonials Grid */}
                {testimonials && testimonials.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.id} className="overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                                                {testimonial.photo ? (
                                                    <img
                                                        src={`/storage/${testimonial.photo}`}
                                                        alt={testimonial.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center">
                                                        <MessageSquare className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                                <CardDescription className="text-sm">{testimonial.email}</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant={testimonial.is_active ? 'default' : 'secondary'}>
                                            {testimonial.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-3 flex items-center gap-1">
                                        {renderStars(testimonial.rating)}
                                        <span className="ml-2 text-sm text-muted-foreground">({testimonial.rating}/5)</span>
                                    </div>

                                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">"{testimonial.review}"</p>

                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/testimonials/${testimonial.id}`}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                        >
                                            <Eye className="mr-2 h-3 w-3" />
                                            View
                                        </Link>
                                        <Link 
                                            href={`/testimonials/${testimonial.id}/edit`}
                                            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(testimonial.id)}
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
                        <MessageSquare className="mb-4 h-16 w-16 text-muted-foreground" />
                        <CardTitle className="mb-2">No testimonials found</CardTitle>
                        <CardDescription className="mb-4">Get started by adding your first customer testimonial</CardDescription>
                        <Link 
                            href="/testimonials/create"
                            className={cn(buttonVariants())}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Testimonial
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
