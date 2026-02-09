// Intelligence Table Component
'use client'

import { flexRender, Table } from '@tanstack/react-table'
import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { ExtractedEntity } from '@/types/intelligence'
import { cn } from '@/lib/utils'

interface IntelligenceTableProps {
    table: Table<ExtractedEntity>
    onRowClick?: (entity: ExtractedEntity) => void
}

export function IntelligenceTable({ table, onRowClick }: IntelligenceTableProps) {
    return (
        <div className="rounded-lg border bg-card overflow-hidden">
            <UITable>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-muted/40 hover:bg-muted/40">
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    style={{ width: header.getSize() }}
                                    className="font-semibold"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className={cn(
                                    'cursor-pointer transition-colors',
                                    row.getIsSelected() && 'bg-muted/50'
                                )}
                                onClick={() => onRowClick?.(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="h-24 text-center"
                            >
                                No entities found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </UITable>
        </div>
    )
}
