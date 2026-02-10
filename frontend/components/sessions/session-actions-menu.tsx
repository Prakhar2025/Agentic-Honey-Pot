'use client'

import * as React from 'react'
import Link from 'next/link'
import {
    MoreHorizontal,
    Eye,
    Download,
    Trash2,
    Copy,
    ExternalLink,
    Tag,
    Archive
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
import { useDeleteSession } from '@/lib/hooks'
import { toast } from 'sonner'

interface SessionActionsMenuProps {
    session: {
        id: string
        status: string
    }
}

export function SessionActionsMenu({ session }: SessionActionsMenuProps) {
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
    const deleteSession = useDeleteSession()

    const handleCopyId = async () => {
        await navigator.clipboard.writeText(session.id)
        toast.success('Session ID copied')
    }

    const handleDelete = async () => {
        try {
            await deleteSession.mutateAsync(session.id)
            setShowDeleteDialog(false)
        } catch (error) {
            // Error handled by mutation
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                        <Link href={`/sessions/${session.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/sessions/${session.id}`} target="_blank" className="flex items-center">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open in New Tab
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleCopyId}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Session ID
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        Add Tags
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
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
                        <AlertDialogTitle>Delete Session</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this session? This action cannot be undone
                            and all conversation data and extracted intelligence will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deleteSession.isPending}
                        >
                            {deleteSession.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
