import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface Section {
    title: string;
    subtitle: string;
}

interface Sections {
    [key: string]: Section;
}

interface Props {
    sections: Sections;
    availableSections: { [key: string]: string };
}

export default function SectionSettings({ sections, availableSections }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        sections: sections,
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
