'use client'

import * as React from 'react'
import Link from 'next/link'
import { flexRender, Table as TableType, ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils/cn'

interface SessionsTableProps<TData> {
    table: TableType<TData>
    columns: ColumnDef<TData>[]
}

export function SessionsTable<TData>({ table, columns }: SessionsTableProps<TData>) {
    return (
        <div className="rounded-lg border overflow-hidden">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    style={{ width: header.column.getSize() }}
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
                        table.getRowModel().rows.map((row, index) => (
                            <motion.tr
                                key={row.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02, duration: 0.2 }}
                                className={cn(
                                    'border-b transition-colors hover:bg-muted/50',
                                    row.getIsSelected() && 'bg-muted'
                                )}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </motion.tr>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No sessions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
