import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    has_more_pages: boolean;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface PaginationWrapperProps {
    data: PaginationData;
    onPageChange: (page: number) => void;
    className?: string;
}

export function PaginationWrapper({ data, onPageChange, className }: PaginationWrapperProps) {
    const { current_page, last_page } = data;

    // Generate page numbers to show
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, current_page - delta); i <= Math.min(last_page - 1, current_page + delta); i++) {
            range.push(i);
        }

        if (current_page - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (current_page + delta < last_page - 1) {
            rangeWithDots.push('...', last_page);
        } else if (last_page > 1) {
            rangeWithDots.push(last_page);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    const handlePageClick = (page: number) => {
        if (page !== current_page && page >= 1 && page <= last_page) {
            onPageChange(page);
        }
    };

    if (last_page <= 1) {
        return null;
    }

    return (
        <Pagination className={cn(className)}>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageClick(current_page - 1)}
                        className={cn(
                            current_page === 1 && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {visiblePages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                onClick={() => handlePageClick(page as number)}
                                isActive={page === current_page}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageClick(current_page + 1)}
                        className={cn(
                            current_page === last_page && "pointer-events-none opacity-50"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}