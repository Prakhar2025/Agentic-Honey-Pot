'use client'

import * as React from 'react'
import { MessageSquare, Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SessionsEmptyProps {
    hasFilters?: boolean
    onClearFilters?: () => void
}

export function SessionsEmpty({ hasFilters = false, onClearFilters }: SessionsEmptyProps) {
    if (hasFilters) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No sessions found</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    No sessions match your current filters. Try adjusting your search
                    criteria or clearing the filters.
                </p>
                <div className="mt-6 flex gap-2">
                    <Button variant="outline" onClick={onClearFilters}>
                        <Filter className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                    <Button asChild>
                        <Link href="/chat">
                            <span className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                New Session
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-primary/10 p-4">
                <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No sessions yet</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Start engaging with scammers to gather intelligence. Each session
                will be recorded and analyzed automatically.
            </p>
            <Button className="mt-6" asChild>
                <Link href="/chat">
                    <span className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Start New Session
                    </span>
                </Link>
            </Button>
        </div>
    )
}
