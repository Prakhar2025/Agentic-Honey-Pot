// Intelligence Center Page
import { Suspense } from 'react'
import { Metadata } from 'next'
import { Database, ShieldAlert, Brain, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/common/page-header'
import { IntelligenceOverview } from '@/components/intelligence/intelligence-overview'
import { IntelligenceToolbar } from '@/components/intelligence/intelligence-toolbar'
import { IntelligenceFilters } from '@/components/intelligence/intelligence-filters'
import { IntelligenceList } from '@/components/intelligence/intelligence-list'
import {
    IntelligenceStatsSkeleton,
    IntelligenceListSkeleton,
} from '@/components/intelligence/skeletons'

export const metadata: Metadata = {
    title: 'Intelligence Center | ScamShield',
    description: 'Comprehensive scam intelligence database with extracted entities, patterns, and threat analysis.',
}

export default function IntelligencePage() {
    return (
        <div className="flex flex-col gap-6 p-6 pb-10">
            {/* Page header */}
            <PageHeader
                icon={<Database className="h-8 w-8" />}
                title="Intelligence Center"
                description="Comprehensive database of extracted scam intelligence. Analyze patterns, verify entities, and export threat data."
                badge={{ label: 'REAL-TIME', variant: 'default' }}
            />

            {/* Feature highlights */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                        <ShieldAlert className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <p className="font-medium">Threat Detection</p>
                        <p className="text-sm text-muted-foreground">
                            AI-powered risk scoring
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="font-medium">Pattern Analysis</p>
                        <p className="text-sm text-muted-foreground">
                            Cross-session correlation
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-medium">Export Ready</p>
                        <p className="text-sm text-muted-foreground">
                            STIX, MISP, CSV formats
                        </p>
                    </div>
                </div>
            </div>

            {/* Overview stats */}
            <section>
                <h2 className="text-lg font-semibold mb-4">Overview</h2>
                <Suspense fallback={<IntelligenceStatsSkeleton />}>
                    <IntelligenceOverview />
                </Suspense>
            </section>

            {/* Main content */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Intelligence Database</h2>
                </div>

                <IntelligenceToolbar />
                <IntelligenceFilters />

                <Suspense fallback={<IntelligenceListSkeleton />}>
                    <IntelligenceList />
                </Suspense>
            </section>
        </div>
    )
}
