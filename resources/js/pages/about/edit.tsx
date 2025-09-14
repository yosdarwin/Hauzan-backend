import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

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
    title: string;
    content: string;
    mission: string;
    vision: string;
    values: string;
    team_info: string;
    contact_info: string;
}

interface AboutEditProps {
    about: AboutContent | null;
}

export default function AboutEdit({ about }: AboutEditProps) {
    const { data, setData, put, post, processing, errors } = useForm({
        title: about?.title || 'About Hauzan Tour',
        content: about?.content || '',
        mission: about?.mission || '',
        vision: about?.vision || '',
        values: about?.values || '',
        team_info: about?.team_info || '',
        contact_info: about?.contact_info || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (about?.id) {
            put('/about');
        } else {
            post('/about');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${about ? 'Edit' : 'Create'} About Content`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/about">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to About
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{about ? 'Edit' : 'Create'} About Content</h1>
                            <p className="text-muted-foreground">Manage your company information and about page content</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Basic Information</h3>
                            
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Page Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="About Hauzan Tour"
                                    className={errors.title ? 'border-destructive' : ''}
                                />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>

                            {/* Main Content */}
                            <div className="space-y-2">
                                <Label htmlFor="content">Main Content *</Label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Write about your company, history, what makes you special..."
                                    className={`min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.content ? 'border-destructive' : ''}`}
                                />
                                {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                            </div>
                        </div>

                        {/* Mission, Vision, Values */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Mission, Vision & Values</h3>
                            
                            <div className="grid gap-4 md:grid-cols-3">
                                {/* Mission */}
                                <div className="space-y-2">
                                    <Label htmlFor="mission">Mission</Label>
                                    <textarea
                                        id="mission"
                                        value={data.mission}
                                        onChange={(e) => setData('mission', e.target.value)}
                                        placeholder="Your company mission..."
                                        className={`min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.mission ? 'border-destructive' : ''}`}
                                    />
                                    {errors.mission && <p className="text-sm text-destructive">{errors.mission}</p>}
                                </div>

                                {/* Vision */}
                                <div className="space-y-2">
                                    <Label htmlFor="vision">Vision</Label>
                                    <textarea
                                        id="vision"
                                        value={data.vision}
                                        onChange={(e) => setData('vision', e.target.value)}
                                        placeholder="Your company vision..."
                                        className={`min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.vision ? 'border-destructive' : ''}`}
                                    />
                                    {errors.vision && <p className="text-sm text-destructive">{errors.vision}</p>}
                                </div>

                                {/* Values */}
                                <div className="space-y-2">
                                    <Label htmlFor="values">Values</Label>
                                    <textarea
                                        id="values"
                                        value={data.values}
                                        onChange={(e) => setData('values', e.target.value)}
                                        placeholder="Your company values..."
                                        className={`min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.values ? 'border-destructive' : ''}`}
                                    />
                                    {errors.values && <p className="text-sm text-destructive">{errors.values}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Team & Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Additional Information</h3>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Team Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="team_info">Team Information</Label>
                                    <textarea
                                        id="team_info"
                                        value={data.team_info}
                                        onChange={(e) => setData('team_info', e.target.value)}
                                        placeholder="Information about your team, experience, expertise..."
                                        className={`min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.team_info ? 'border-destructive' : ''}`}
                                    />
                                    {errors.team_info && <p className="text-sm text-destructive">{errors.team_info}</p>}
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="contact_info">Contact Information</Label>
                                    <textarea
                                        id="contact_info"
                                        value={data.contact_info}
                                        onChange={(e) => setData('contact_info', e.target.value)}
                                        placeholder="Contact details, office address, phone, email..."
                                        className={`min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.contact_info ? 'border-destructive' : ''}`}
                                    />
                                    {errors.contact_info && <p className="text-sm text-destructive">{errors.contact_info}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Link href="/about">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Saving...' : (about ? 'Update Content' : 'Create Content')}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
