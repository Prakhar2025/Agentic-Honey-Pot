'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface SessionsPaginationProps {
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
}

export function SessionsPagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
}: SessionsPaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    const updatePage = React.useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams, pathname, router])

    const updatePageSize = React.useCallback((size: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('limit', size)
        params.set('page', '1')
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams, pathname, router])

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible + 2) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage > 3) {
                pages.push('ellipsis')
            }

            // Show pages around current
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i)
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis')
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    if (totalPages <= 1 && totalItems <= pageSize) {
        return (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {totalItems} session{totalItems !== 1 ? 's' : ''}</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Page info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                    Showing {startItem} - {endItem} of {totalItems}
                </span>
                <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={updatePageSize}
                    >
                        <SelectTrigger className="h-8 w-16">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
                {/* First page */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updatePage(1)}
                    disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">First page</span>
                </Button>

                {/* Previous page */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                </Button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                        page === 'ellipsis' ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={page}
                                variant={currentPage === page ? 'default' : 'outline'}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updatePage(page)}
                            >
                                {page}
                            </Button>
                        )
                    ))}
                </div>

                {/* Next page */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                </Button>

                {/* Last page */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updatePage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">Last page</span>
                </Button>
            </div>
        </div>
    )
}
