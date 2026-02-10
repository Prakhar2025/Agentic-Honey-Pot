// Intelligence List Component - Main list view with table/grid toggle
'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    RowSelectionState,
    SortingState,
    Updater,
} from '@tanstack/react-table'
import { useIntelligence } from '@/lib/hooks/use-intelligence'
import { IntelligenceTable } from './intelligence-table'
import { IntelligenceGrid } from './intelligence-grid'
import { IntelligencePagination } from './intelligence-pagination'
import { IntelligenceEmpty } from './intelligence-empty'
import { EntityDetailPanel } from './entity-detail-panel'
import { IntelligenceListSkeleton } from './skeletons'
import { EntityTypeBadge } from './entity-type-badge'
import { EntityRiskBadge } from './entity-risk-badge'
import { EntityConfidenceBar } from './entity-confidence-bar'
import { EntityVerificationBadge } from './entity-verification-badge'
import { EntityCopyButton } from './entity-copy-button'
import { EntityActionsMenu } from './entity-actions-menu'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useBulkDeleteEntities, useBulkVerifyEntities, useExportEntities } from '@/lib/hooks/use-entity-detail'
import type { ExtractedEntity } from '@/types/intelligence'
import { maskSensitiveValue, formatEntityValue } from '@/lib/utils/entity-formatters'
import { formatRelativeTime } from '@/lib/utils/date'
import { ArrowUpDown, Eye, Download, CheckCircle2, Trash2 } from 'lucide-react'

interface IntelligenceListProps {
    initialFilters?: Record<string, string | undefined>
}

export function IntelligenceList({ initialFilters = {} }: IntelligenceListProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Selected entity for detail panel
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null)
    const [showMasked, setShowMasked] = useState(true)

    // View mode from URL
    const viewMode = (searchParams.get('view') as 'table' | 'grid') || 'table'

    // Parse filters from URL
    const filters = useMemo(
        () => ({
            type: searchParams.get('type') || 'all',
            risk_level: searchParams.get('risk_level') || 'all',
            verified:
                searchParams.get('verified') === 'true'
                    ? true
                    : searchParams.get('verified') === 'false'
                        ? false
                        : undefined,
            search: searchParams.get('search') || '',
            sort: (searchParams.get('sort') || 'created_at') as 'created_at' | 'risk_score' | 'confidence' | 'frequency' | 'first_seen' | 'last_seen',
            order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
            page: parseInt(searchParams.get('page') || '1'),
            limit: 20,
        }),
        [searchParams]
    )

    // Fetch intelligence data
    const { data, isLoading, isError, refetch } = useIntelligence(filters)

    // Bulk operations
    const bulkDeleteMutation = useBulkDeleteEntities()
    const bulkVerifyMutation = useBulkVerifyEntities()
    const exportMutation = useExportEntities()

    // Table state
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([
        { id: filters.sort, desc: filters.order === 'desc' },
    ])

    // Selected entity IDs
    const selectedIds = useMemo(() => {
        if (!data?.entities) return []
        return Object.keys(rowSelection)
            .filter((key) => rowSelection[key])
            .map((key) => data.entities[parseInt(key)]?.id)
            .filter(Boolean) as string[]
    }, [rowSelection, data?.entities])

    // Get selected entity for detail panel
    const selectedEntity = useMemo(() => {
        if (!selectedEntityId || !data?.entities) return null
        return data.entities.find((e) => e.id === selectedEntityId) || null
    }, [selectedEntityId, data?.entities])

    // Update URL when sorting changes
    const handleSortingChange = useCallback(
        (updaterOrValue: Updater<SortingState>) => {
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
        },
        [searchParams, pathname, router, sorting]
    )

    // Bulk actions handlers
    const handleBulkDelete = useCallback(() => {
        if (selectedIds.length > 0) {
            bulkDeleteMutation.mutate(selectedIds, {
                onSuccess: () => setRowSelection({}),
            })
        }
    }, [selectedIds, bulkDeleteMutation])

    const handleBulkVerify = useCallback(() => {
        if (selectedIds.length > 0) {
            bulkVerifyMutation.mutate(
                { entityIds: selectedIds, verified: true },
                { onSuccess: () => setRowSelection({}) }
            )
        }
    }, [selectedIds, bulkVerifyMutation])

    const handleBulkExport = useCallback(() => {
        if (selectedIds.length > 0) {
            exportMutation.mutate({
                entityIds: selectedIds,
                format: 'csv',
                includeMetadata: true,
            })
        }
    }, [selectedIds, exportMutation])

    // Table columns definition
    const columns: ColumnDef<ExtractedEntity>[] = useMemo(
        () => [
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
                        onClick={(e) => e.stopPropagation()}
                    />
                ),
                enableSorting: false,
                size: 40,
            },
            {
                accessorKey: 'type',
                header: 'Type',
                cell: ({ row }) => <EntityTypeBadge type={row.original.type} />,
                size: 130,
            },
            {
                accessorKey: 'value',
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        className="-ml-4"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Value
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-sm truncate max-w-[200px]">
                            {showMasked
                                ? maskSensitiveValue(row.original.value, row.original.type)
                                : formatEntityValue(row.original.value, row.original.type)}
                        </span>
                        <EntityCopyButton value={row.original.value} />
                    </div>
                ),
                size: 250,
            },
            {
                accessorKey: 'risk_score',
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        className="-ml-4"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Risk
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => <EntityRiskBadge score={row.original.risk_score} />,
                size: 100,
            },
            {
                accessorKey: 'confidence',
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        className="-ml-4"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Confidence
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <EntityConfidenceBar confidence={row.original.confidence} />
                ),
                size: 140,
            },
            {
                accessorKey: 'occurrence_count',
                header: 'Seen',
                cell: ({ row }) => (
                    <Badge variant="secondary">{row.original.occurrence_count}x</Badge>
                ),
                size: 80,
            },
            {
                accessorKey: 'verified',
                header: 'Status',
                cell: ({ row }) => (
                    <EntityVerificationBadge
                        verified={row.original.verified}
                        verificationSource={row.original.verification_source}
                    />
                ),
                size: 110,
            },
            {
                accessorKey: 'first_seen',
                header: 'First Seen',
                cell: ({ row }) => (
                    <span className="text-sm text-muted-foreground">
                        {formatRelativeTime(row.original.first_seen)}
                    </span>
                ),
                size: 120,
            },
            {
                id: 'actions',
                cell: ({ row }) => (
                    <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedEntityId(row.original.id)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <EntityActionsMenu
                            entity={row.original}
                            onViewDetails={() => setSelectedEntityId(row.original.id)}
                        />
                    </div>
                ),
                size: 100,
            },
        ],
        [showMasked]
    )

    // TanStack Table instance
    const table = useReactTable({
        data: data?.entities || [],
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
        pageCount: data ? Math.ceil(data.total / filters.limit) : 0,
    })

    // Loading state
    if (isLoading) {
        return <IntelligenceListSkeleton />
    }

    // Error state
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Failed to load intelligence data</p>
                <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                    Try Again
                </Button>
            </div>
        )
    }

    // Empty state
    if (!data?.entities || data.entities.length === 0) {
        return (
            <IntelligenceEmpty hasFilters={!!filters.search || filters.type !== 'all'} />
        )
    }

    return (
        <>
            <div className="space-y-4">
                {/* Bulk actions bar */}
                <AnimatePresence>
                    {selectedIds.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
                        >
                            <span className="text-sm">
                                <strong>{selectedIds.length}</strong> entities selected
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleBulkExport}
                                    disabled={exportMutation.isPending}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleBulkVerify}
                                    disabled={bulkVerifyMutation.isPending}
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Verify
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={handleBulkDelete}
                                    disabled={bulkDeleteMutation.isPending}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setRowSelection({})}
                                >
                                    Clear
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mask toggle */}
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMasked(!showMasked)}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        {showMasked ? 'Show Full Values' : 'Mask Values'}
                    </Button>
                </div>

                {/* Table or Grid view */}
                {viewMode === 'table' ? (
                    <IntelligenceTable
                        table={table}
                        onRowClick={(entity) => setSelectedEntityId(entity.id)}
                    />
                ) : (
                    <IntelligenceGrid
                        entities={data.entities}
                        selectedIds={selectedIds}
                        showMasked={showMasked}
                        onEntityClick={(entity) => setSelectedEntityId(entity.id)}
                        onSelectEntity={(entity, selected) => {
                            const index = data.entities.findIndex((e) => e.id === entity.id)
                            if (index !== -1) {
                                setRowSelection((prev) => ({
                                    ...prev,
                                    [index]: selected,
                                }))
                            }
                        }}
                    />
                )}

                {/* Pagination */}
                <IntelligencePagination
                    currentPage={filters.page}
                    totalPages={Math.ceil(data.total / filters.limit)}
                    totalItems={data.total}
                    pageSize={filters.limit}
                />
            </div>

            {/* Entity Detail Slide-over */}
            <Sheet
                open={!!selectedEntityId}
                onOpenChange={() => setSelectedEntityId(null)}
            >
                <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                    {selectedEntity && (
                        <EntityDetailPanel
                            entity={selectedEntity}
                            onClose={() => setSelectedEntityId(null)}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}
