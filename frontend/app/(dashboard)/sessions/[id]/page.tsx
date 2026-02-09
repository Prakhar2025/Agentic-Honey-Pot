'use client'

import { useParams } from 'next/navigation'
import { useSessionDetail } from '@/lib/hooks/use-sessions'
import {
    SessionDetailHeader,
    ConversationView,
    SessionDetailSidebar,
    SessionDetailSkeleton
} from '@/components/sessions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function SessionDetailPage() {
    const params = useParams()
    const sessionId = params.id as string

    const {
        data: session,
        isLoading,
        isError,
        refetch
    } = useSessionDetail(sessionId)

    if (isLoading) {
        return <SessionDetailSkeleton />
    }

    if (isError || !session) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="rounded-full bg-destructive/10 p-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold">Session Not Found</h2>
                <p className="text-muted-foreground text-center max-w-sm">
                    The session you're looking for doesn't exist or may have been deleted.
                </p>
                <div className="flex gap-2 mt-2">
                    <Button variant="outline" asChild>
                        <Link href="/sessions">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Sessions
                        </Link>
                    </Button>
                    <Button onClick={() => refetch()}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Header */}
            <SessionDetailHeader session={session} />

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Conversation area */}
                <div className="flex-1 relative">
                    <ConversationView
                        sessionId={sessionId}
                        initialSession={session}
                    />
                </div>

                {/* Sidebar with stats, intel, timeline */}
                <SessionDetailSidebar
                    sessionId={sessionId}
                    session={session}
                />
            </div>
        </div>
    )
}
