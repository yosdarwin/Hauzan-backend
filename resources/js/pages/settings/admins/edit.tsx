import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserCog } from 'lucide-react';

interface Admin {
    id: number;
    whatsapp_number: string;
    title: string;
    department: string;
    status_online: boolean;
}

interface AdminEditProps {
    admin: Admin;
}

export default function AdminEdit({ admin }: AdminEditProps) {
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
            title: 'Edit Admin',
            href: `/settings/admins/${admin.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        whatsapp_number: admin.whatsapp_number,
        title: admin.title,
        department: admin.department,
        status_online: admin.status_online,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/settings/admins/${admin.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <Link href="/settings/admins">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <UserCog className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Edit Admin</h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Admin Information</CardTitle>
                        <CardDescription>Update administrator information and settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp_number">WhatsApp Number *</Label>
                                    <Input
                                        id="whatsapp_number"
                                        type="text"
                                        value={data.whatsapp_number}
                                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                                        placeholder="e.g., +628123456789"
                                        required
                                    />
                                    {errors.whatsapp_number && <p className="text-sm text-red-600">{errors.whatsapp_number}</p>}
                                    <p className="text-sm text-muted-foreground">Include country code (e.g., +62 for Indonesia)</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g., Customer Service Manager"
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="department">Department *</Label>
                                    <Input
                                        id="department"
                                        type="text"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        placeholder="e.g., Customer Service"
                                        required
                                    />
                                    {errors.department && <p className="text-sm text-red-600">{errors.department}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="status_online">Online Status</Label>
                                        <p className="text-sm text-muted-foreground">Current online status</p>
                                    </div>
                                    <Switch
                                        id="status_online"
                                        checked={data.status_online}
                                        onCheckedChange={(checked) => setData('status_online', checked)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Link href="/settings/admins">
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Admin'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
