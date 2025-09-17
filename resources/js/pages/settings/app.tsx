import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Settings, Smartphone, Upload, UserCog, X } from 'lucide-react';
import { useState } from 'react';

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
        title: 'App Settings',
        href: '/settings/app',
    },
];

interface AppSettingsProps {
    settings: {
        logo?: string;
        whatsapp_accept_order?: boolean;
        whatsapp_number?: string;
    };
}

export default function AppSettings({ settings }: AppSettingsProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo ? `/storage/${settings.logo}` : null);

    const { data, setData, post, processing, errors, reset } = useForm({
        logo: null as File | null,
        whatsapp_accept_order: settings.whatsapp_accept_order || false,
        whatsapp_number: settings.whatsapp_number || '',
        _method: 'PUT',
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setData('logo', null);
        setLogoPreview(null);
        // Call API to remove logo
        post('/settings/app/remove-logo', {
            onSuccess: () => {
                setLogoPreview(null);
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings/app', {
            onSuccess: () => {
                reset('logo');
            },
        });
    };

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const settingsNavItems = [
        {
            title: 'App Settings',
            href: '/settings/app',
            icon: Settings,
        },
        {
            title: 'Admin Management',
            href: '/settings/admins',
            icon: UserCog,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="App Settings" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center gap-2">
                    <Settings className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>

                <div className="flex flex-col lg:flex-row lg:gap-8">
                    {/* Navigation Sidebar */}
                    <aside className="w-full lg:w-64">
                        <nav className="space-y-1">
                            {settingsNavItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', currentPath === item.href && 'bg-muted')}
                                >
                                    <Link href={item.href} prefetch>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 lg:hidden" />

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">App Settings</h2>
                            <p className="text-muted-foreground">Configure your application settings</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Logo Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Upload className="h-5 w-5" />
                                        Logo Settings
                                    </CardTitle>
                                    <CardDescription>Upload and manage your application logo</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="logo">Logo Image</Label>
                                        <div className="flex items-center gap-4">
                                            {logoPreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={logoPreview}
                                                        alt="Logo preview"
                                                        className="h-20 w-20 rounded-lg border object-contain"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                        onClick={removeLogo}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                                                    <Upload className="h-8 w-8 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <Input
                                                    id="logo"
                                                    type="file"
                                                    accept="image/*,.svg"
                                                    onChange={handleLogoChange}
                                                    className="cursor-pointer"
                                                />
                                                <p className="mt-1 text-sm text-muted-foreground">Recommended: PNG, JPG, or SVG, max 2MB</p>
                                            </div>
                                        </div>
                                        {errors.logo && <p className="text-sm text-red-600">{errors.logo}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Separator />

                            {/* WhatsApp Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Smartphone className="h-5 w-5" />
                                        WhatsApp Settings
                                    </CardTitle>
                                    <CardDescription>Configure WhatsApp order acceptance settings</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                                        <Input
                                            id="whatsapp_number"
                                            type="text"
                                            placeholder="e.g., +62812345678"
                                            value={data.whatsapp_number}
                                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Enter the WhatsApp number for customer orders (include country code)
                                        </p>
                                        {errors.whatsapp_number && <p className="text-sm text-red-600">{errors.whatsapp_number}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Settings'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
