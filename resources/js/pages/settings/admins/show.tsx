import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, MessageCircle, Trash2, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Settings',
        href: '/settings/app',
    },
    {
        title: 'Admin Management',
        href: '/settings/admins',
    },
    {
        title: 'Admin Details',
        href: '#',
    },
];

interface Admin {
    id: number;
    whatsapp_number: string;
    title: string;
    department: string;
    status_online: boolean;
    whatsapp_url: string;
    created_at: string;
    updated_at: string;
}

interface AdminShowProps {
    admin: Admin;
}

export default function AdminShow({ admin }: AdminShowProps) {
    const toggleStatus = () => {
        router.patch(
            `/settings/admins/${admin.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const deleteAdmin = () => {
        if (confirm(`Are you sure you want to delete this admin?`)) {
            router.delete(`/settings/admins/${admin.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Details" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/settings/admins">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Admins
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <User className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">Admin Details</h1>
                            <Badge variant={admin.status_online ? 'default' : 'secondary'}>
                                {admin.status_online ? 'Online' : 'Offline'}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={admin.whatsapp_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800"
                        >
                            <Button variant="outline" size="sm">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                WhatsApp
                            </Button>
                        </a>
                        <Link href={`/settings/admins/${admin.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={deleteAdmin}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Information</CardTitle>
                            <CardDescription>Basic details about this administrator</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Job Title</label>
                                <p className="text-lg">{admin.title}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Department</label>
                                <p className="text-lg">{admin.department}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact & Status</CardTitle>
                            <CardDescription>WhatsApp contact information and online status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">WhatsApp Number</label>
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4 text-green-600" />
                                    <p className="text-lg">{admin.whatsapp_number}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Online Status</label>
                                    <p className="text-lg">
                                        {admin.status_online ? 'Available for orders' : 'Currently offline'}
                                    </p>
                                </div>
                                <Switch checked={admin.status_online} onCheckedChange={toggleStatus} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Created</label>
                                <p className="text-lg">{new Date(admin.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                <p className="text-lg">{new Date(admin.updated_at).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}