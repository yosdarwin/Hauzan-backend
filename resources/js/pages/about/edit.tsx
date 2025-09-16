import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Building2, Eye, Info, Phone, Plus, Save, Target, Trash } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'About',
        href: '/about',
    },
    {
        title: 'Edit About',
        href: '#',
    },
];

interface AboutContent {
    id?: number;
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
}

interface AboutEditProps {
    about: AboutContent | null;
}

export default function AboutEdit({ about }: AboutEditProps) {
    const [activeTab, setActiveTab] = useState('company');

    const { data, setData, put, processing, errors } = useForm({
        company_name: about?.company_name ?? 'PT. Hauzan Tour & Rent Car',
        company_address: about?.company_address ?? 'Perum. Citra Bungo Pasang Blok B No. 6, Kota Padang, Sumatera Barat',
        founded_year: about?.founded_year ?? 2025,
        owner_director: about?.owner_director ?? 'Syafri Andi',
        legality: about?.legality ?? 'Memiliki NIB, dan NPWP Perusahaan',
        email: about?.email ?? 'hauzantourandrentcar@gmail.com',
        phone: about?.phone ?? '0813-7114-5628',
        social_media: about?.social_media ?? 'Instagram & Facebook – @pthauzantour&rentcar',
        vision:
            about?.vision ??
            'Menjadi perusahaan penyedia jasa transportasi dan pariwisata terpercaya di Sumatera Barat yang unggul dalam pelayanan, aman, nyaman, dan berorientasi pada kepuasan pelanggan.',
        missions: about?.missions ?? [
            'Menyediakan layanan rental mobil dan paket wisata yang berkualitas, aman, dan tepat waktu.',
            'Menawarkan armada kendaraan yang terawat dan siap digunakan untuk berbagai kebutuhan pelanggan.',
            'Mengembangkan layanan berbasis teknologi untuk meningkatkan kemudahan pemesanan.',
            'Menjalin kemitraan dengan pelaku pariwisata lokal dan nasional.',
            'Memberikan kontribusi nyata terhadap promosi wisata Sumatera Barat.',
            'Mengutamakan kepuasan dan keselamatan pelanggan.',
            'Meningkatkan profesionalisme sumber daya manusia di bidang transportasi wisata.',
        ],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Always use PUT for about content since the controller handles both create and update
        put('/about');
    };

    const tabs = [
        { id: 'company', label: 'Company Info', icon: Building2 },
        { id: 'contact', label: 'Contact Details', icon: Phone },
        { id: 'vision', label: 'Vision & Mission', icon: Target },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${about ? 'Edit' : 'Create'} About Content`} />

            <div className="space-y-8 px-8 py-8">
                {/* Back Button */}
                <div>
                    <Link href="/about">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to About
                        </Button>
                    </Link>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{about ? 'Edit' : 'Create'} About Content</h1>
                        <p className="text-muted-foreground">Manage your company information and about page content</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            <Eye className="mr-1 h-3 w-3" />
                            Live Preview Available
                        </Badge>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                    <Info className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Fill out the sections below to create a comprehensive about page for your website.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 rounded-lg bg-muted p-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Company Information Tab */}
                    {activeTab === 'company' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Company Information
                                </CardTitle>
                                <CardDescription>Basic company details and legal information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="company_name" className="text-sm font-medium">
                                        Company Name *
                                    </Label>
                                    <Input
                                        id="company_name"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="PT. Hauzan Tour & Rent Car"
                                        className={errors.company_name ? 'border-destructive' : ''}
                                    />
                                    {errors.company_name && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.company_name}
                                        </p>
                                    )}
                                </div>

                                {/* Company Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="company_address" className="text-sm font-medium">
                                        Company Address *
                                    </Label>
                                    <Textarea
                                        id="company_address"
                                        value={data.company_address || ''}
                                        onChange={(e) => setData('company_address', e.target.value)}
                                        placeholder="Perum. Citra Bungo Pasang Blok B No. 6, Kota Padang, Sumatera Barat"
                                        className={`min-h-[100px] resize-none ${errors.company_address ? 'border-destructive' : ''}`}
                                    />
                                    {errors.company_address && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.company_address}
                                        </p>
                                    )}
                                </div>

                                {/* Founded Year */}
                                <div className="space-y-2">
                                    <Label htmlFor="founded_year" className="text-sm font-medium">
                                        Founded Year *
                                    </Label>
                                    <Input
                                        id="founded_year"
                                        type="number"
                                        value={data.founded_year}
                                        onChange={(e) => setData('founded_year', parseInt(e.target.value))}
                                        placeholder="2025"
                                        className={errors.founded_year ? 'border-destructive' : ''}
                                    />
                                    {errors.founded_year && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.founded_year}
                                        </p>
                                    )}
                                </div>

                                {/* Owner/Director */}
                                <div className="space-y-2">
                                    <Label htmlFor="owner_director" className="text-sm font-medium">
                                        Owner/Director *
                                    </Label>
                                    <Input
                                        id="owner_director"
                                        value={data.owner_director}
                                        onChange={(e) => setData('owner_director', e.target.value)}
                                        placeholder="Syafri Andi"
                                        className={errors.owner_director ? 'border-destructive' : ''}
                                    />
                                    {errors.owner_director && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.owner_director}
                                        </p>
                                    )}
                                </div>

                                {/* Legality */}
                                <div className="space-y-2">
                                    <Label htmlFor="legality" className="text-sm font-medium">
                                        Legal Status *
                                    </Label>
                                    <Textarea
                                        id="legality"
                                        value={data.legality || ''}
                                        onChange={(e) => setData('legality', e.target.value)}
                                        placeholder="Memiliki NIB, dan NPWP Perusahaan"
                                        className={`min-h-[100px] resize-none ${errors.legality ? 'border-destructive' : ''}`}
                                    />
                                    {errors.legality && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.legality}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contact Details Tab */}
                    {activeTab === 'contact' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Contact Details
                                </CardTitle>
                                <CardDescription>Contact information for customers to reach you</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8">
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="hauzantourandrentcar@gmail.com"
                                        className={errors.email ? 'border-destructive' : ''}
                                    />
                                    {errors.email && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium">
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="0813-7114-5628"
                                        className={errors.phone ? 'border-destructive' : ''}
                                    />
                                    {errors.phone && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Social Media */}
                                <div className="space-y-2">
                                    <Label htmlFor="social_media" className="text-sm font-medium">
                                        Social Media *
                                    </Label>
                                    <Textarea
                                        id="social_media"
                                        value={data.social_media || ''}
                                        onChange={(e) => setData('social_media', e.target.value)}
                                        placeholder="Instagram & Facebook – @pthauzantour&rentcar"
                                        className={`min-h-[100px] resize-none ${errors.social_media ? 'border-destructive' : ''}`}
                                    />
                                    {errors.social_media && (
                                        <p className="flex items-center gap-1 text-sm text-destructive">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.social_media}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Vision & Mission Tab */}
                    {activeTab === 'vision' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="h-5 w-5" />
                                        Vision
                                    </CardTitle>
                                    <CardDescription>Where do you see your company in the future?</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-2">
                                        <Textarea
                                            id="vision"
                                            value={data.vision || ''}
                                            onChange={(e) => setData('vision', e.target.value)}
                                            placeholder="Menjadi perusahaan penyedia jasa transportasi dan pariwisata terpercaya di Sumatera Barat yang unggul dalam pelayanan, aman, nyaman, dan berorientasi pada kepuasan pelanggan."
                                            className={`min-h-[120px] resize-none ${errors.vision ? 'border-destructive' : ''}`}
                                        />
                                        {errors.vision && (
                                            <p className="flex items-center gap-1 text-sm text-destructive">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.vision}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        Missions
                                    </CardTitle>
                                    <CardDescription>List of your company's missions and goals</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-4">
                                        {data.missions.map((mission, index) => (
                                            <div key={index} className="flex gap-2">
                                                <div className="flex-1">
                                                    <Textarea
                                                        value={mission}
                                                        onChange={(e) => {
                                                            const newMissions = [...data.missions];
                                                            newMissions[index] = e.target.value;
                                                            setData('missions', newMissions);
                                                        }}
                                                        placeholder={`Mission ${index + 1}`}
                                                        className="min-h-[80px] resize-none"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        const newMissions = data.missions.filter((_, i) => i !== index);
                                                        setData('missions', newMissions);
                                                    }}
                                                    className="mt-0 h-10 w-10 text-orange-400 hover:text-destructive"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setData('missions', [...data.missions, '']);
                                            }}
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Mission
                                        </Button>

                                        {errors.missions && (
                                            <p className="flex items-center gap-1 text-sm text-destructive">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.missions}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    {/* Navigation & Submit */}
                    <div className="flex items-center justify-between border-t pt-6">
                        <div className="flex gap-2">
                            {activeTab !== 'company' && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
                                        if (currentIndex > 0) {
                                            setActiveTab(tabs[currentIndex - 1].id);
                                        }
                                    }}
                                >
                                    Previous
                                </Button>
                            )}
                            {activeTab !== 'vision' && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
                                        if (currentIndex < tabs.length - 1) {
                                            setActiveTab(tabs[currentIndex + 1].id);
                                        }
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Link href="/about">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : about ? 'Update Content' : 'Create Content'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
