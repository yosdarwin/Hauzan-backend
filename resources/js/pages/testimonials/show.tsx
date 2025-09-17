import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, MessageSquare, Star, User } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    review: string;
    rating: number;
    photo: string;
    date: string;
    created_at: string;
    updated_at: string;
}

interface TestimonialShowProps {
    testimonial: Testimonial;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
    },
    {
        title: 'Details',
        href: '#',
    },
];

export default function TestimonialShow({ testimonial }: TestimonialShowProps) {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
        ));
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
            <Head title={`${testimonial.name}'s Testimonial`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold">{testimonial.name}</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                {renderStars(testimonial.rating)}
                                <span className="ml-2 text-muted-foreground">({testimonial.rating}/5)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/testimonials/${testimonial.id}/edit`} className={cn(buttonVariants())}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Testimonial
                        </Link>
                        <Link href="/testimonials" className={cn(buttonVariants({ variant: 'outline' }))}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Testimonials
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Customer Photo */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-center">
                                    {testimonial.photo ? (
                                        <img 
                                            src={`/storage/${testimonial.photo}`} 
                                            alt={testimonial.name} 
                                            className="h-48 w-48 rounded-full object-cover border-4 border-gray-100" 
                                        />
                                    ) : (
                                        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gray-100 border-4 border-gray-200">
                                            <User className="h-24 w-24 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Review */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Customer Review
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <blockquote className="border-l-4 border-primary pl-4 italic text-lg leading-relaxed text-gray-700">
                                    "{testimonial.review}"
                                </blockquote>
                            </CardContent>
                        </Card>

                        {/* Rating Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5" />
                                    Rating Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Overall Rating</span>
                                        <div className="flex items-center gap-2">
                                            {renderStars(testimonial.rating)}
                                            <span className="text-lg font-bold">{testimonial.rating}/5</span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-5 gap-2">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <div key={i} className="text-center">
                                                <div className="text-sm font-medium">{5 - i}</div>
                                                <div className={`h-2 rounded ${i < testimonial.rating ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="font-medium">{testimonial.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-medium">{testimonial.date}</p>
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
                                    <p className="font-medium">{formatDate(testimonial.created_at)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">Last Updated</p>
                                    <p className="font-medium">{formatDate(testimonial.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}