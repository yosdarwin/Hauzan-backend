import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2, Users } from 'lucide-react';

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
];

interface Admin {
    id: number;
    whatsapp_number: string;
    title: string;
    department: string;
    status_online: boolean;
    whatsapp_url: string;
}

interface AdminIndexProps {
    admins: Admin[];
}

export default function AdminIndex({ admins }: AdminIndexProps) {
    const toggleStatus = (admin: Admin) => {
        router.patch(
            `/settings/admins/${admin.id}/toggle-status`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const deleteAdmin = (admin: Admin) => {
        if (confirm(`Are you sure you want to delete this admin?`)) {
            router.delete(`/settings/admins/${admin.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Management" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Admin Management</h1>
                    </div>
                    <Link href="/settings/admins/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Admin
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>WhatsApp Admins</CardTitle>
                        <CardDescription>Manage administrators who can receive WhatsApp orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {admins.length === 0 ? (
                            <div className="py-8 text-center">
                                <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No admins found</h3>
                                <p className="mb-4 text-gray-500">Get started by adding your first admin.</p>
                                <Link href="/settings/admins/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add First Admin
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {admins.map((admin) => (
                                    <div key={admin.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                    <Users className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={admin.status_online ? 'default' : 'secondary'}>
                                                        {admin.status_online ? 'Online' : 'Offline'}
                                                    </Badge>
                                                </div>
                                                <h4 className="text-lg font-medium text-gray-500">{admin.title}</h4>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-500">Status:</span>
                                                <Switch checked={admin.status_online} onCheckedChange={() => toggleStatus(admin)} />
                                            </div>

                                            <Link href={`/settings/admins/${admin.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/settings/admins/${admin.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deleteAdmin(admin)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
