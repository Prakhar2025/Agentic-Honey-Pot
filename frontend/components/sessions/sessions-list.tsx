'use client'

import * as React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    ColumnDef,
    RowSelectionState,
    SortingState,
} from '@tanstack/react-table'
import { useSessions } from '@/lib/hooks'
import { SessionsTable } from './sessions-table'
import { SessionsGrid } from './sessions-grid'
import { SessionsPagination } from './sessions-pagination'
import { SessionsBulkActions } from './sessions-bulk-actions'
import { SessionsEmpty } from './sessions-empty'
import { SessionsListSkeleton } from './skeletons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { SessionStatusBadge } from './session-status-badge'
import { SessionActionsMenu } from './session-actions-menu'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { formatRelativeTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'
import {
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    MessageSquare,
    Brain,
    Clock,
    ExternalLink
} from 'lucide-react'

interface SessionsListProps {
    initialFilters?: Record<string, string | undefined>
}

export function SessionsList({ initialFilters = {} }: SessionsListProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // View mode from URL
    const viewMode = (searchParams.get('view') as 'table' | 'grid') || 'table'

    // Parse filters from URL
    const filters = React.useMemo(() => ({
        status: searchParams.get('status') || 'all',
        scam_type: searchParams.get('scam_type') || '',
        persona: searchParams.get('persona') || '',
        search: searchParams.get('search') || '',
        sort: (searchParams.get('sort') || 'created_at') as 'created_at' | 'updated_at' | 'turn_count' | 'extracted_count',
        order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
        page: parseInt(searchParams.get('page') || '1'),
        limit: parseInt(searchParams.get('limit') || '20'),
    }), [searchParams])

    // Fetch sessions with TanStack Query
    const {
        data,
        isLoading,
        isError,
        refetch
    } = useSessions(filters)

    // Table state
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: filters.sort, desc: filters.order === 'desc' }
    ])

    // Get sessions array from response
    const sessions = data?.items || []
    const totalItems = data?.total || 0
    const totalPages = Math.ceil(totalItems / filters.limit)

    // Selected session IDs
    const selectedIds = React.useMemo(() => {
        return Object.keys(rowSelection)
            .filter(key => rowSelection[key])
            .map(key => sessions[parseInt(key)]?.id)
            .filter(Boolean)
    }, [rowSelection, sessions])

    // Update URL when sorting changes
    const handleSortingChange: React.Dispatch<React.SetStateAction<SortingState>> = React.useCallback((updaterOrValue) => {
        const newSorting = typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting)
            : updaterOrValue
        setSorting(newSorting)
        if (newSorting.length > 0) {
            const params = new URLSearchParams(searchParams.toString())
            params.set('sort', newSorting[0].id)
            params.set('order', newSorting[0].desc ? 'desc' : 'asc')
            router.push(`${pathname}?${params.toString()}`)
        }
    }, [sorting, searchParams, pathname, router])

    // Handle grid selection
    const handleGridSelection = React.useCallback((id: string, selected: boolean) => {
        const index = sessions.findIndex((s: any) => s.id === id)
        if (index !== -1) {
            setRowSelection(prev => ({
                ...prev,
                [index]: selected
            }))
        }
    }, [sessions])

    // Table columns definition
    const columns: ColumnDef<any>[] = React.useMemo(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            size: 40,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <SessionStatusBadge status={row.original.status} />
            ),
            size: 110,
        },
        {
            accessorKey: 'scam_type',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Scam Type
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            ),
            cell: ({ row }) => {
                const scamType = SCAM_TYPES[row.original.scam_type as keyof typeof SCAM_TYPES]
                const initialMessage = row.original.metadata_json?.initial_message as string
                return (
                    <div className="flex flex-col">
                        <span className="flex items-center gap-2">
                            {scamType && <span>{scamType.icon}</span>}
                            <span className="font-medium">
                                {scamType?.label || row.original.scam_type || 'Unknown'}
                            </span>
                        </span>
                        {initialMessage && (
                            <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px] mt-0.5">
                                &ldquo;{initialMessage}&rdquo;
                            </span>
                        )}
                    </div>
                )
            },
            size: 220,
        },
        {
            accessorKey: 'persona_id',
            header: 'Persona',
            cell: ({ row }) => {
                const persona = PERSONAS[row.original.persona_id as keyof typeof PERSONAS]
                return (
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{persona?.icon || '🤖'}</span>
                        <span className="text-sm">{persona?.label || row.original.persona_id}</span>
                    </div>
                )
            },
            size: 150,
        },
        {
            accessorKey: 'turn_count',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Turns
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="tabular-nums font-medium">{row.original.turn_count}</span>
            ),
            size: 100,
        },
        {
            accessorKey: 'extracted_count',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <Brain className="mr-2 h-4 w-4" />
                    Intel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const count = row.original.extracted_count || 0
                return (
                    <Badge variant={count > 0 ? 'default' : 'secondary'} className="font-medium">
                        {count}
                    </Badge>
                )
            },
            size: 90,
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <Clock className="mr-2 h-4 w-4" />
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {formatRelativeTime(row.original.created_at)}
                </span>
            ),
            size: 120,
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/sessions/${row.original.id}`}>
                            <span className="flex items-center gap-1.5">
                                View
                                <ExternalLink className="h-3 w-3" />
                            </span>
                        </Link>
                    </Button>
                    <SessionActionsMenu session={row.original} />
                </div>
            ),
            size: 130,
        },
    ], [])

    // TanStack Table instance
    const table = useReactTable({
        data: sessions,
        columns,
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: handleSortingChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: totalPages,
    })

    // Loading state
    if (isLoading) {
        return <SessionsListSkeleton />
    }

    // Error state
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Failed to load sessions</p>
                <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                    Try Again
                </Button>
            </div>
        )
    }

    // Empty state
    if (sessions.length === 0) {
        return (
            <SessionsEmpty
                hasFilters={!!filters.search || filters.status !== 'all' || !!filters.scam_type || !!filters.persona}
                onClearFilters={() => router.push(pathname)}
            />
        )
    }

    return (
        <div className="space-y-4">
            {/* Bulk actions bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <SessionsBulkActions
                            selectedCount={selectedIds.length}
                            selectedIds={selectedIds}
                            onClearSelection={() => setRowSelection({})}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table or Grid view */}
            {viewMode === 'table' ? (
                <SessionsTable table={table} columns={columns} />
            ) : (
                <SessionsGrid
                    sessions={sessions}
                    selectedIds={selectedIds}
                    onSelectSession={handleGridSelection}
                />
            )}

            {/* Pagination */}
            <SessionsPagination
                currentPage={filters.page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={filters.limit}
            />
        </div>
    )
}
