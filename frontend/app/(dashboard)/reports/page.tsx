// Reports Page - Report Generation and History
import { Suspense } from 'react'
import { Metadata } from 'next'
import { FileText, Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ReportGenerator, ReportsList } from '@/components/reports'

export const metadata: Metadata = {
    title: 'Reports | ScamShield',
    description: 'Generate and manage analytics reports',
}

function ReportsSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                    <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
                    <p className="text-sm text-muted-foreground">
                        Generate, download, and schedule analytics reports
                    </p>
                </div>
            </div>

            {/* Content */}
            <Tabs defaultValue="generate" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="generate" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Generate New
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Report History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="mt-6">
                    <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
                        <ReportGenerator />
                    </Suspense>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                    <Suspense fallback={<ReportsSkeleton />}>
                        <ReportsList />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    )
}
