import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Car, Grid2x2, Images, Info, LayoutGrid, MapPin, MessageSquareQuote, Settings, ShoppingBag, Users } from 'lucide-react';

// Core features and main functionality
const featuredNavItems: NavItem[] = [
    {
        title: 'Home Sliders',
        href: '/sliders',
        icon: Images,
    },
    {
        title: 'Home Sections',
        href: '/settings/sections',
        icon: Grid2x2,
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
        icon: MessageSquareQuote,
    },
    {
        title: 'Settings',
        href: '/settings/app',
        icon: Settings,
    },
    {
        title: 'User Management',
        href: '/admin/users',
        icon: Users,
    },
];

// Content management and configuration pages
const pageNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Tour Packages',
        href: '/tours',
        icon: MapPin,
    },
    {
        title: 'Car Rentals',
        href: '/cars',
        icon: Car,
    },
    {
        title: 'About',
        href: '/about',
        icon: Info,
    },

    {
        title: 'Souvenirs',
        href: '/souvenirs',
        icon: ShoppingBag,
    },
];

export function AppSidebar() {
    const { props } = usePage();
    const user = (props as any).auth?.user;

    // Check if user has super-admin role
    const isSuperAdmin = user?.roles?.some((role: any) => role.name === 'super-admin') || false;

    // Filter featured nav items based on user role
    const filteredFeaturedNavItems = featuredNavItems.filter((item) => {
        // Only show User Management to super-admin users
        if (item.title === 'User Management') {
            return isSuperAdmin;
        }
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <h1 className="text-2xl font-bold">GoTourPadang</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredFeaturedNavItems} pages={pageNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
