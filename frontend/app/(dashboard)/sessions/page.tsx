import { Suspense } from 'react'
import { Metadata } from 'next'
import {
    SessionsList,
    SessionsToolbar,
    SessionsFilters,
    SessionsListSkeleton
} from '@/components/sessions'

export const metadata: Metadata = {
    title: 'Sessions | ScamShield',
    description: 'View and manage your scam engagement sessions. Analysis, intelligence extraction, and conversation history.',
}

interface SessionsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SessionsPage({ searchParams }: SessionsPageProps) {
    const params = await searchParams

    return (
        <div className="flex flex-col gap-6 p-6 lg:p-8">
            {/* Page header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
                <p className="text-muted-foreground">
                    Manage and analyze your scam engagement sessions
                </p>
            </div>

            {/* Toolbar with search, filters toggle, view switch, export */}
            <SessionsToolbar />

            {/* Filter panel (collapsible) */}
            <SessionsFilters />

            {/* Sessions list with loading state */}
            <Suspense fallback={<SessionsListSkeleton />}>
                <SessionsList
                    initialFilters={{
                        status: params.status as string,
                        scam_type: params.scam_type as string,
                        persona: params.persona as string,
                        search: params.search as string,
                    }}
                />
            </Suspense>
        </div>
    )
}
