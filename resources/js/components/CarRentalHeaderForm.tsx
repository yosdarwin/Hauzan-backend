import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Save, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface HeaderData {
    title: string;
    subtitle: string;
    description: string;
}

export default function CarRentalHeaderForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, setData, processing, errors, reset } = useForm<HeaderData>({
        title: '',
        subtitle: '',
        description: '',
    });

    // Fetch current header data
    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch('/api/cars/header');
                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data) {
                        setData({
                            title: result.data.title || '',
                            subtitle: result.data.subtitle || '',
                            description: result.data.description || '',
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to fetch header data:', error);
                toast.error('Failed to load header data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeaderData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/cars/header', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success(result.message || 'Header settings updated successfully!');
                setIsExpanded(false);

                // Refresh the data to show the updated values
                const refreshResponse = await fetch('/api/cars/header');
                if (refreshResponse.ok) {
                    const refreshResult = await refreshResponse.json();
                    if (refreshResult.success && refreshResult.data) {
                        setData({
                            title: refreshResult.data.title || '',
                            subtitle: refreshResult.data.subtitle || '',
                            description: refreshResult.data.description || '',
                        });
                    }
                }
            } else {
                toast.error(result.message || 'Failed to update header settings');
                console.error('API Error:', result);
            }
        } catch (error) {
            console.error('Error updating header:', error);
            toast.error('An error occurred while updating header settings');
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                        <div className="h-10 rounded bg-gray-200"></div>
                        <div className="h-10 rounded bg-gray-200"></div>
                        <div className="h-20 rounded bg-gray-200"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Car Rentals Header Settings
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Collapse' : 'Edit Header'}
                    </Button>
                </div>
                {!isExpanded && (
                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                            <strong>Title:</strong> {data.title || 'Not set'}
                        </p>
                        <p>
                            <strong>Subtitle:</strong> {data.subtitle || 'Not set'}
                        </p>
                        <p>
                            <strong>Description:</strong> {data.description || 'Not set'}
                        </p>
                    </div>
                )}
            </CardHeader>

            {isExpanded && (
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter page title (e.g., Car Rentals)"
                                className={errors.title ? 'border-red-500' : ''}
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                type="text"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                placeholder="Enter page subtitle (e.g., Premium Car Rental Services)"
                                className={errors.subtitle ? 'border-red-500' : ''}
                            />
                            {errors.subtitle && <p className="text-sm text-red-500">{errors.subtitle}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter page description (e.g., Explore our premium car rental options...)"
                                rows={4}
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsExpanded(false);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            )}
        </Card>
    );
}