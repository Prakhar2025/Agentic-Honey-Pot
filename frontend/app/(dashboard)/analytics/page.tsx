// Analytics Dashboard Page - FAANG-level Analytics Module
import { Suspense } from 'react'
import { Metadata } from 'next'

import {
    AnalyticsHeader,
    AnalyticsOverview,
    AnalyticsOverviewSkeleton,
    SessionsOverTime,
    ScamTypeDistribution,
    PersonaEffectiveness,
    GeographicHeatmap,
    HourlyActivityHeatmap,
    EntityExtractionChart,
    DetectionFunnel,
    LLMPerformance,
} from '@/components/analytics'
import { ReportGenerator } from '@/components/reports'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = {
    title: 'Analytics | ScamShield',
    description: 'Comprehensive analytics and insights from honeypot operations',
}

function ChartSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
            </CardContent>
        </Card>
    )
}

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header with Controls */}
            <AnalyticsHeader />

            {/* KPI Overview Section */}
            <section aria-label="Key Performance Indicators">
                <Suspense fallback={<AnalyticsOverviewSkeleton />}>
                    <AnalyticsOverview />
                </Suspense>
            </section>

            {/* Primary Charts Row */}
            <section className="grid gap-6 lg:grid-cols-2" aria-label="Primary Charts">
                <Suspense fallback={<ChartSkeleton />}>
                    <SessionsOverTime />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <ScamTypeDistribution />
                </Suspense>
            </section>

            {/* Secondary Charts Row */}
            <section className="grid gap-6 lg:grid-cols-2" aria-label="Secondary Charts">
                <Suspense fallback={<ChartSkeleton />}>
                    <PersonaEffectiveness />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <EntityExtractionChart />
                </Suspense>
            </section>

            {/* Geographic & Activity Heatmaps */}
            <section className="grid gap-6 lg:grid-cols-2" aria-label="Activity Analysis">
                <Suspense fallback={<ChartSkeleton />}>
                    <GeographicHeatmap />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <HourlyActivityHeatmap />
                </Suspense>
            </section>

            {/* Detection Funnel & LLM Performance */}
            <section className="grid gap-6 lg:grid-cols-2" aria-label="System Performance">
                <Suspense fallback={<ChartSkeleton />}>
                    <DetectionFunnel />
                </Suspense>
                <Suspense fallback={<ChartSkeleton />}>
                    <LLMPerformance />
                </Suspense>
            </section>

            {/* Report Generator */}
            <section aria-label="Report Generation">
                <Suspense fallback={<ChartSkeleton />}>
                    <ReportGenerator />
                </Suspense>
            </section>
        </div>
    )
}
