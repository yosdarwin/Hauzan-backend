import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Car, Images, Info, LayoutGrid, MapPin, MessageSquareQuote, ShoppingBag } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Home Sliders',
        href: '/sliders',
        icon: Images,
    },
    {
        title: 'About',
        href: '/about',
        icon: Info,
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
        title: 'Souvenirs',
        href: '/souvenirs',
        icon: ShoppingBag,
    },
    {
        title: 'Testimonials',
        href: '/testimonials',
        icon: MessageSquareQuote,
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
                                <h1 className="text-2xl font-bold">HauzanTour</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
