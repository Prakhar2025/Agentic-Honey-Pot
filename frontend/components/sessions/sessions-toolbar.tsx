'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    LayoutList,
    Download,
    Plus,
    X,
    Loader2,
    RefreshCw
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSessionFiltersStore } from '@/lib/stores/session-filters'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import { sessionKeys } from '@/lib/hooks/use-sessions'

export function SessionsToolbar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()
    const [isPending, startTransition] = React.useTransition()
    const [isRefreshing, setIsRefreshing] = React.useState(false)

    // Local search state for controlled input
    const [searchValue, setSearchValue] = React.useState(searchParams.get('search') || '')

    // Filter panel visibility
    const { isFiltersOpen, toggleFilters, activeFilterCount } = useSessionFiltersStore()

    // View mode from URL
    const viewMode = searchParams.get('view') || 'table'

    // Debounced search
    const debouncedSearch = useDebouncedCallback((value: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set('search', value)
            } else {
                params.delete('search')
            }
            params.set('page', '1') // Reset to first page on search
            router.push(`${pathname}?${params.toString()}`)
        })
    }, 300)

    // Handle search input
    const handleSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
        debouncedSearch(value)
    }, [debouncedSearch])

    // Clear search
    const clearSearch = React.useCallback(() => {
        setSearchValue('')
        const params = new URLSearchParams(searchParams.toString())
        params.delete('search')
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams, pathname, router])

    // Toggle view mode
    const toggleViewMode = React.useCallback(() => {
        const newMode = viewMode === 'table' ? 'grid' : 'table'
        const params = new URLSearchParams(searchParams.toString())
        params.set('view', newMode)
        router.push(`${pathname}?${params.toString()}`)
    }, [viewMode, searchParams, pathname, router])

    // Refresh data
    const handleRefresh = async () => {
        setIsRefreshing(true)
        await queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
        setIsRefreshing(false)
    }

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search and filters */}
            <div className="flex flex-1 items-center gap-2">
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search sessions, scam types, personas..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="pl-9 pr-9"
                    />
                    {searchValue && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                    {isPending && (
                        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                    )}
                </div>

                {/* Filters toggle */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={isFiltersOpen ? 'secondary' : 'outline'}
                            size="icon"
                            onClick={toggleFilters}
                            className="relative shrink-0"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            {activeFilterCount > 0 && (
                                <Badge
                                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                    variant="destructive"
                                >
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isFiltersOpen ? 'Hide filters' : 'Show filters'}
                    </TooltipContent>
                </Tooltip>

                {/* Refresh button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="shrink-0"
                        >
                            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Refresh sessions</TooltipContent>
                </Tooltip>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* View toggle */}
                <div className="flex rounded-lg border bg-muted p-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => viewMode !== 'table' && toggleViewMode()}
                            >
                                <LayoutList className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Table view</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => viewMode !== 'grid' && toggleViewMode()}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Grid view</TooltipContent>
                    </Tooltip>
                </div>

                {/* Export dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            Export as JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Export as CSV
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>
                            Export selected (0)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* New session button */}
                <Button asChild className="gap-2">
                    <Link href="/chat">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">New Session</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
