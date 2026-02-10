'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Trash2, Download, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useBulkDeleteSessions, useExportSessions } from '@/lib/hooks'

interface SessionsBulkActionsProps {
    selectedCount: number
    selectedIds: string[]
    onClearSelection: () => void
}

export function SessionsBulkActions({
    selectedCount,
    selectedIds,
    onClearSelection
}: SessionsBulkActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
    const bulkDelete = useBulkDeleteSessions()
    const exportSessions = useExportSessions()

    const handleBulkDelete = async () => {
        await bulkDelete.mutateAsync(selectedIds)
        onClearSelection()
        setShowDeleteDialog(false)
    }

    const handleExport = async (format: 'json' | 'csv' | 'pdf') => {
        await exportSessions.mutateAsync({ sessionIds: selectedIds, format })
    }

    return (
        <>
            <motion.div
                className="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
                layout
            >
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                        {selectedCount} session{selectedCount !== 1 ? 's' : ''} selected
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearSelection}
                        className="h-7 gap-1"
                    >
                        <X className="h-3 w-3" />
                        Clear
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Export dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={exportSessions.isPending}
                            >
                                {exportSessions.isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Download className="mr-2 h-4 w-4" />
                                )}
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleExport('json')}>
                                Export as JSON
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('csv')}>
                                Export as CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('pdf')}>
                                Export as PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Delete button */}
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={bulkDelete.isPending}
                    >
                        {bulkDelete.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                    </Button>
                </div>
            </motion.div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedCount} Sessions</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete {selectedCount} session{selectedCount !== 1 ? 's' : ''}?
                            This action cannot be undone and all conversation data and extracted intelligence
                            will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleBulkDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={bulkDelete.isPending}
                        >
                            {bulkDelete.isPending ? 'Deleting...' : `Delete ${selectedCount} Sessions`}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
