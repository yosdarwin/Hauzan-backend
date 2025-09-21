import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Car, Grid2x2, Images, Info, LayoutGrid, MapPin, MessageSquareQuote, Settings, ShoppingBag } from 'lucide-react';

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
                <NavMain items={featuredNavItems} pages={pageNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
