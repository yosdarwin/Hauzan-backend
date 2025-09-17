import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus } from 'lucide-react';

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
        title: 'Add Admin',
        href: '/settings/admins/create',
    },
];

export default function AdminCreate() {
    const { data, setData, post, processing, errors } = useForm({
        whatsapp_number: '',
        title: '',
        department: '',
        status_online: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings/admins');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <Link href="/settings/admins">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <UserPlus className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Add New Admin</h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Admin Information</CardTitle>
                        <CardDescription>Add a new administrator who can receive WhatsApp orders</CardDescription>
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
                                        <p className="text-sm text-muted-foreground">Set initial online status</p>
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
                                    {processing ? 'Creating...' : 'Create Admin'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
