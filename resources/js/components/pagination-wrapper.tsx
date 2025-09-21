/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    data: unknown[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface PaginationWrapperProps {
    data: PaginationData;
    className?: string;
}

export default function PaginationWrapper({ data, className }: PaginationWrapperProps) {
    // Handle case where data might be undefined or incomplete
    if (!data || typeof data !== 'object') {
        return null;
    }

    const { current_page = 1, last_page = 1, links = [], prev_page_url, next_page_url, from, to, total = 0 } = data;

    const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, url: string | null) => {
        e.preventDefault();
        if (url && url !== '#') {
            try {
                router.get(url, {}, { preserveState: true, preserveScroll: true });
            } catch (error) {
                console.error('Navigation error:', error);
            }
        }
    };

    // Don't show pagination if there's only one page or no data
    if (last_page <= 1 || total === 0) {
        return null;
    }

    // Filter out "Previous" and "Next" from links array with better pattern matching
    const pageLinks = links.filter(
        (link) => link && link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;' && link.label !== 'Previous' && link.label !== 'Next',
    );

    return (
        <div className={className}>
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            size="sm"
                            href={prev_page_url || '#'}
                            onClick={(e) => handlePageChange(e, prev_page_url)}
                            className={prev_page_url ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed opacity-50'}
                            aria-disabled={!prev_page_url}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {pageLinks.map((link, index) => (
                        <PaginationItem key={link.url || `page-${index}`}>
                            {link.label === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    size="sm"
                                    href={link.url || '#'}
                                    onClick={(e) => handlePageChange(e, link.url)}
                                    isActive={link.active}
                                    className="cursor-pointer"
                                    aria-current={link.active ? 'page' : undefined}
                                >
                                    {link.label}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            size="sm"
                            href={next_page_url || '#'}
                            onClick={(e) => handlePageChange(e, next_page_url)}
                            className={next_page_url ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed opacity-50'}
                            aria-disabled={!next_page_url}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            {/* Pagination Info */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
                {from && to ? (
                    <>
                        Showing {from.toLocaleString()} to {to.toLocaleString()} of {total.toLocaleString()} results
                    </>
                ) : (
                    <>
                        Showing {total.toLocaleString()} result{total !== 1 ? 's' : ''}
                    </>
                )}
            </div>
        </div>
    );
}
