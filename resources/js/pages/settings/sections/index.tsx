import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Settings, Video } from 'lucide-react';
import { toast } from 'sonner';

interface Section {
    title: string;
    subtitle: string;
}

interface Sections {
    [key: string]: Section;
}

interface WelcomeSection {
    title: string;
    subtitle: string;
    video_url: string;
}

interface Props {
    sections: Sections;
    availableSections: { [key: string]: string };
    welcome_section: WelcomeSection;
}

export default function SectionSettings({ sections, availableSections, welcome_section }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        sections: sections,
        welcome_section: welcome_section,
    });

    const handleSectionChange = (sectionKey: string, field: 'title' | 'subtitle', value: string) => {
        const updatedSections = {
            ...data.sections,
            [sectionKey]: {
                ...data.sections[sectionKey],
                [field]: value,
            },
        };

        setData('sections', updatedSections);
    };

    const handleWelcomeSectionChange = (field: 'title' | 'subtitle' | 'video_url', value: string) => {
        const updatedWelcomeSection = {
            ...data.welcome_section,
            [field]: value,
        };

        setData('welcome_section', updatedWelcomeSection);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/settings/sections', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Section settings have been saved successfully!');
            },
        });
    };

    const breadcrumbs = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/settings' },
        { label: 'Section Settings', href: '/settings/sections' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs.map((item) => ({ ...item, title: item.label }))}>
            <Head title="Section Settings" />

            <div className="space-y-8 px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Section Settings</h1>
                        <p className="text-muted-foreground">Manage titles and subtitles for different sections of your website</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>

                {/* Welcome Section Form */}
                <Card className="border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Video className="h-5 w-5" />
                            Welcome Section
                        </CardTitle>
                        <CardDescription>Configure the welcome section with title, subtitle, and video URL</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="welcome_title" className="flex items-center gap-2">
                                    Title
                                </Label>
                                <Input
                                    id="welcome_title"
                                    type="text"
                                    value={data.welcome_section.title || ''}
                                    onChange={(e) => handleWelcomeSectionChange('title', e.target.value)}
                                    placeholder="Enter welcome section title"
                                    className="w-full"
                                />
                                {errors['welcome_section.title'] && <p className="text-sm text-red-600">{errors['welcome_section.title']}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="welcome_subtitle" className="flex items-center gap-2">
                                    Subtitle
                                </Label>
                                <Textarea
                                    id="welcome_subtitle"
                                    value={data.welcome_section.subtitle || ''}
                                    onChange={(e) => handleWelcomeSectionChange('subtitle', e.target.value)}
                                    placeholder="Enter welcome section subtitle"
                                    className="min-h-[80px] w-full"
                                    rows={3}
                                />
                                {errors['welcome_section.subtitle'] && <p className="text-sm text-red-600">{errors['welcome_section.subtitle']}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="welcome_video_url" className="flex items-center gap-2">
                                    Video URL
                                </Label>
                                <Input
                                    id="welcome_video_url"
                                    type="url"
                                    value={data.welcome_section.video_url || ''}
                                    onChange={(e) => handleWelcomeSectionChange('video_url', e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full"
                                />
                                {errors['welcome_section.video_url'] && <p className="text-sm text-red-600">{errors['welcome_section.video_url']}</p>}
                                <p className="text-sm text-muted-foreground">Enter a YouTube video URL</p>
                            </div>

                            {/* Video Preview */}
                            {data.welcome_section.video_url && <div className="space-y-2"></div>}
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6">
                        {Object.entries(availableSections).map(([sectionKey, sectionLabel]) => {
                            const sectionData = data.sections[sectionKey] || { title: '', subtitle: '' };

                            return (
                                <Card key={sectionKey}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">{sectionLabel}</CardTitle>
                                        <CardDescription>
                                            Configure the title and subtitle for the {sectionLabel.toLowerCase()} section
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`${sectionKey}_title`} className="flex items-center gap-2">
                                                    Title
                                                </Label>
                                                <Input
                                                    id={`${sectionKey}_title`}
                                                    type="text"
                                                    value={sectionData.title}
                                                    onChange={(e) => handleSectionChange(sectionKey, 'title', e.target.value)}
                                                    placeholder={`Enter ${sectionLabel.toLowerCase()} title`}
                                                    className="w-full"
                                                />
                                                {errors[`sections.${sectionKey}.title`] && (
                                                    <p className="text-sm text-red-600">{errors[`sections.${sectionKey}.title`]}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`${sectionKey}_subtitle`} className="flex items-center gap-2">
                                                    Subtitle
                                                </Label>
                                                <Textarea
                                                    id={`${sectionKey}_subtitle`}
                                                    value={sectionData.subtitle}
                                                    onChange={(e) => handleSectionChange(sectionKey, 'subtitle', e.target.value)}
                                                    placeholder={`Enter ${sectionLabel.toLowerCase()} subtitle`}
                                                    className="min-h-[80px] w-full"
                                                    rows={3}
                                                />
                                                {errors[`sections.${sectionKey}.subtitle`] && (
                                                    <p className="text-sm text-red-600">{errors[`sections.${sectionKey}.subtitle`]}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-end gap-6">
                        <Button type="submit" disabled={processing} className="min-w-[120px]">
                            {processing ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
