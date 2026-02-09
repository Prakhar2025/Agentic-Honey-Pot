// Entity Actions Menu Component
'use client'

import { useState } from 'react'
import {
    MoreHorizontal,
    Eye,
    Download,
    Flag,
    CheckCircle2,
    Trash2,
    ExternalLink,
    Copy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { useDeleteEntity, useVerifyEntity } from '@/lib/hooks/use-entity-detail'
import type { ExtractedEntity } from '@/types/intelligence'
import { toast } from 'sonner'

interface EntityActionsMenuProps {
    entity: ExtractedEntity
    onViewDetails?: () => void
    onReport?: () => void
    onExport?: () => void
}

export function EntityActionsMenu({
    entity,
    onViewDetails,
    onReport,
    onExport,
}: EntityActionsMenuProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const deleteMutation = useDeleteEntity()
    const verifyMutation = useVerifyEntity()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(entity.value)
            toast.success('Copied to clipboard')
        } catch {
            toast.error('Failed to copy')
        }
    }

    const handleVerify = () => {
        verifyMutation.mutate({
            entityId: entity.id,
            verified: !entity.verified,
            source: 'manual_review',
        })
    }

    const handleDelete = () => {
        deleteMutation.mutate(entity.id, {
            onSuccess: () => setShowDeleteDialog(false),
        })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    {onViewDetails && (
                        <DropdownMenuItem onClick={onViewDetails}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Value
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleVerify}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {entity.verified ? 'Remove Verification' : 'Mark as Verified'}
                    </DropdownMenuItem>
                    {onReport && (
                        <DropdownMenuItem onClick={onReport}>
                            <Flag className="mr-2 h-4 w-4" />
                            Report Entity
                        </DropdownMenuItem>
                    )}
                    {onExport && (
                        <DropdownMenuItem onClick={onExport}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </DropdownMenuItem>
                    )}
                    {entity.sessions && entity.sessions.length > 0 && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a href={`/sessions/${entity.sessions[0].id}`}>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Session
                                </a>
                            </DropdownMenuItem>
                        </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Entity</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this entity? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
