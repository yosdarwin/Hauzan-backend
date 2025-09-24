import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Save, Video, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Settings',
        href: '/settings',
    },
    {
        title: 'Section Settings',
        href: '/settings/sections',
    },
    {
        title: 'Welcome Section',
        href: '/settings/sections/welcome',
    },
];

interface WelcomeSection {
    title: string;
    subtitle: string;
    video_url: string;
}

interface WelcomeSectionProps {
    welcome_section: WelcomeSection;
}

export default function WelcomeSectionSettings({ welcome_section }: WelcomeSectionProps) {
    const { data, setData, processing, errors, put } = useForm({
        title: welcome_section?.title || '',
        subtitle: welcome_section?.subtitle || '',
        video_url: welcome_section?.video_url || '',
    });

    const { props } = usePage<{ flash: { success?: string; error?: string } }>();

    // Handle flash messages
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/settings/sections/welcome');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Welcome Section Settings" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome Section Settings</h1>
                        <p className="text-muted-foreground">Configure the welcome section displayed on your website</p>
                    </div>
                    <Link href="/settings/sections">
                        <div className="flex items-center gap-2">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            <span>Back to Section Settings</span>
                        </div>
                    </Link>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Video className="h-5 w-5" />
                            Welcome Section Configuration
                        </CardTitle>
                        <CardDescription>
                            Set up the title, subtitle, and video URL for your welcome section
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter welcome section title"
                                        className={errors.title ? 'border-destructive' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                                </div>

                                {/* Subtitle */}
                                <div className="space-y-2">
                                    <Label htmlFor="subtitle">Subtitle *</Label>
                                    <Textarea
                                        id="subtitle"
                                        value={data.subtitle}
                                        onChange={(e) => setData('subtitle', e.target.value)}
                                        placeholder="Enter welcome section subtitle"
                                        className={`min-h-[100px] ${errors.subtitle ? 'border-destructive' : ''}`}
                                        rows={4}
                                    />
                                    {errors.subtitle && <p className="text-sm text-destructive">{errors.subtitle}</p>}
                                    <p className="text-sm text-muted-foreground">
                                        This subtitle will appear below the main title in the welcome section
                                    </p>
                                </div>

                                {/* Video URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="video_url">Video URL *</Label>
                                    <Input
                                        id="video_url"
                                        type="url"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className={errors.video_url ? 'border-destructive' : ''}
                                    />
                                    {errors.video_url && <p className="text-sm text-destructive">{errors.video_url}</p>}
                                    <p className="text-sm text-muted-foreground">
                                        Enter a YouTube, Vimeo, or direct video URL. This video will be displayed in the welcome section.
                                    </p>
                                </div>
                            </div>

                            {/* Video Preview */}
                            {data.video_url && (
                                <div className="space-y-2">
                                    <Label>Video Preview</Label>
                                    <div className="rounded-lg border p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Video className="h-4 w-4" />
                                            <span>Video URL: {data.video_url}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Saving...' : 'Save Welcome Section'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}