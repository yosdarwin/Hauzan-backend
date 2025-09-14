import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Eye, Image, Car, MapPin, MessageSquare, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    sliders_count: number;
    tours_count: number;
    cars_count: number;
    testimonials_count: number;
    recent_tours: Array<{
        id: number;
        title: string;
        slug: string;
        price: number;
        duration: string;
        created_at: string;
    }>;
}

export default function Dashboard({ 
    sliders_count, 
    tours_count, 
    cars_count, 
    testimonials_count, 
    recent_tours 
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Welcome to Hauzan Tour Admin</h1>
                            <p className="text-blue-100">Manage your tourism business with ease. Here's your overview:</p>
                        </div>
                        <FileText className="h-12 w-12 text-blue-200" />
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Link href="/sliders" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Home Sliders</CardTitle>
                                <Image className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{sliders_count}</div>
                                <p className="text-xs text-muted-foreground">Click to manage</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/tours" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tour Packages</CardTitle>
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tours_count}</div>
                                <p className="text-xs text-muted-foreground">Click to manage</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/cars" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-cyan-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Car Rentals</CardTitle>
                                <Car className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{cars_count}</div>
                                <p className="text-xs text-muted-foreground">Click to manage</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/testimonials" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-yellow-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{testimonials_count}</div>
                                <p className="text-xs text-muted-foreground">Click to manage</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Action Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5 text-blue-600" />
                                Quick Actions
                            </CardTitle>
                            <CardDescription>Create new content quickly</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/sliders/create">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4 text-blue-600" />
                                    Add New Slider
                                </Button>
                            </Link>
                            <Link href="/tours/create">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4 text-green-600" />
                                    Add New Tour
                                </Button>
                            </Link>
                            <Link href="/cars/create">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4 text-cyan-600" />
                                    Add New Car
                                </Button>
                            </Link>
                            <Link href="/testimonials/create">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4 text-yellow-600" />
                                    Add New Testimonial
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Edit className="h-5 w-5 text-green-600" />
                                Management
                            </CardTitle>
                            <CardDescription>Manage existing content</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/sliders">
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <Image className="mr-2 h-4 w-4 text-blue-600" />
                                        Manage Sliders
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        {sliders_count}
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/tours">
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-green-600" />
                                        Manage Tours
                                    </span>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                        {tours_count}
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/cars">
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <Car className="mr-2 h-4 w-4 text-cyan-600" />
                                        Manage Cars
                                    </span>
                                    <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs">
                                        {cars_count}
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/testimonials">
                                <Button variant="outline" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <MessageSquare className="mr-2 h-4 w-4 text-yellow-600" />
                                        Manage Testimonials
                                    </span>
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                        {testimonials_count}
                                    </span>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-cyan-600" />
                                Recent Activities
                            </CardTitle>
                            <CardDescription>Latest tour packages added</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recent_tours && recent_tours.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_tours.slice(0, 3).map((tour) => (
                                        <div key={tour.id} className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{tour.title.substring(0, 25)}...</p>
                                                <p className="text-xs text-muted-foreground">New tour package</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(tour.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                    <Link href="/tours">
                                        <Button variant="outline" size="sm" className="w-full mt-3">
                                            <Eye className="mr-2 h-3 w-3" />
                                            View All Tours
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">No recent activities</p>
                                    <p className="text-xs text-muted-foreground">Start by adding some content</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
