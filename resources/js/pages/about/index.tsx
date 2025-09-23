import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Info, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'About',
        href: '/about',
    },
];

interface AboutContent {
    id: number;
    company_name: string;
    company_address: string;
    founded_year: number;
    owner_director: string;
    legality: string;
    email: string;
    phone: string;
    social_media: string;
    vision: string;
    missions: string[];
    updated_at: string;
}

interface AboutIndexProps {
    about: AboutContent | null;
}

export default function AboutIndex({ about }: AboutIndexProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Page Management" />

            <div className="space-y-8 px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">About Page Management</h1>
                        <p className="text-muted-foreground">Manage your company information and about page content</p>
                    </div>
                    <Link href="/about/edit">
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            {about ? 'Edit Content' : 'Create Content'}
                        </Button>
                    </Link>
                </div>

                {about ? (
                    <div className="grid gap-6">
                        {/* Company Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Info className="h-5 w-5" />
                                    Company Information
                                </CardTitle>
                                <CardDescription>
                                    Last updated: {new Date(about.updated_at).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Company Name</h3>
                                        <p className="text-muted-foreground">{about.company_name}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Founded Year</h3>
                                        <p className="text-muted-foreground">{about.founded_year}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Owner/Director</h3>
                                        <p className="text-muted-foreground">{about.owner_director}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Legality</h3>
                                        <p className="text-muted-foreground">{about.legality}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Company Address</h3>
                                    <p className="text-muted-foreground">{about.company_address}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 p-8">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <h3 className="font-semibold mb-2">Email</h3>
                                        <p className="text-muted-foreground">{about.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Phone</h3>
                                        <p className="text-muted-foreground">{about.phone}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Social Media</h3>
                                        <p className="text-muted-foreground">{about.social_media}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vision & Mission */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vision</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="whitespace-pre-wrap text-muted-foreground">{about.vision}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Mission</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-2">
                                        {about.missions.map((mission, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <span className="text-sm font-medium text-muted-foreground mt-1">{index + 1}.</span>
                                                <p className="text-muted-foreground">{mission}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <Card className="flex flex-col items-center justify-center py-16">
                        <Info className="mb-4 h-16 w-16 text-muted-foreground" />
                        <CardTitle className="mb-2">No about content found</CardTitle>
                        <CardDescription className="mb-4">Get started by creating your about page content</CardDescription>
                        <Link href="/about/edit">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create About Content
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
