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
    title: string;
    content: string;
    mission: string;
    vision: string;
    values: string;
    team_info: string;
    contact_info: string;
    updated_at: string;
}

interface AboutIndexProps {
    about: AboutContent | null;
}

export default function AboutIndex({ about }: AboutIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Page Management" />

            <div className="space-y-6">
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
                        {/* Main Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Info className="h-5 w-5" />
                                    About Content
                                </CardTitle>
                                <CardDescription>
                                    Last updated: {new Date(about.updated_at).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Title</h3>
                                    <p className="text-muted-foreground">{about.title}</p>
                                </div>

                                {/* Main Content */}
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Main Content</h3>
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap text-muted-foreground">{about.content}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mission, Vision, Values */}
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="whitespace-pre-wrap text-muted-foreground">{about.mission}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="whitespace-pre-wrap text-muted-foreground">{about.vision}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Values</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="whitespace-pre-wrap text-muted-foreground">{about.values}</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Team & Contact Info */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="whitespace-pre-wrap text-muted-foreground">{about.team_info}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="whitespace-pre-wrap text-muted-foreground">{about.contact_info}</div>
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
