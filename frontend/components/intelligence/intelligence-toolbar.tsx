// Intelligence Toolbar Component
'use client'

import { useState, useCallback, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    LayoutList,
    Download,
    X,
    Loader2,
    RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDebouncedCallback } from 'use-debounce'
import { useIntelligenceFiltersStore } from '@/lib/stores'
import { useExportEntities } from '@/lib/hooks'
import { cn } from '@/lib/utils'

export function IntelligenceToolbar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const { isFiltersOpen, toggleFilters, activeFilterCount } = useIntelligenceFiltersStore()
    const exportMutation = useExportEntities()

    const currentSearch = searchParams.get('search') || ''
    const currentView = (searchParams.get('view') as 'table' | 'grid') || 'table'
    const [searchValue, setSearchValue] = useState(currentSearch)

    // Debounced search
    const debouncedSearch = useDebouncedCallback((value: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set('search', value)
            } else {
                params.delete('search')
            }
            params.delete('page')
            router.push(`${pathname}?${params.toString()}`)
        })
    }, 300)

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setSearchValue(value)
            debouncedSearch(value)
        },
        [debouncedSearch]
    )

    const clearSearch = useCallback(() => {
        setSearchValue('')
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.delete('search')
            params.delete('page')
            router.push(`${pathname}?${params.toString()}`)
        })
    }, [searchParams, pathname, router])

    const toggleView = useCallback(() => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('view', currentView === 'table' ? 'grid' : 'table')
            router.push(`${pathname}?${params.toString()}`)
        })
    }, [searchParams, pathname, router, currentView])

    const handleRefresh = useCallback(() => {
        router.refresh()
    }, [router])

    const handleExport = useCallback(
        (format: 'json' | 'csv' | 'stix' | 'misp') => {
            exportMutation.mutate({
                format,
                includeMetadata: true,
            })
        },
        [exportMutation]
    )

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search entities, values, types..."
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

                {/* Refresh */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleRefresh}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Refresh data</TooltipContent>
                </Tooltip>
            </div>

            <div className="flex items-center gap-2">
                {/* View toggle */}
                <div className="flex items-center rounded-lg border bg-muted/40 p-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    'h-8 w-8 p-0',
                                    currentView === 'table' && 'bg-background shadow-sm'
                                )}
                                onClick={() => currentView !== 'table' && toggleView()}
                            >
                                <LayoutList className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Table view</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    'h-8 w-8 p-0',
                                    currentView === 'grid' && 'bg-background shadow-sm'
                                )}
                                onClick={() => currentView !== 'grid' && toggleView()}
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
                        <Button variant="outline" disabled={exportMutation.isPending}>
                            {exportMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleExport('json')}>
                            Export as JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('csv')}>
                            Export as CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('stix')}>
                            Export as STIX 2.1
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('misp')}>
                            Export as MISP
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
