'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ScamDetectionChart } from '@/components/dashboard/scam-detection-chart'
import { ScamTypesChart } from '@/components/dashboard/scam-types-chart'
import { RecentSessions } from '@/components/dashboard/recent-sessions'
import { ThreatLevelCard } from '@/components/dashboard/threat-level-card'
import { SystemHealth } from '@/components/dashboard/system-health'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { IntelligenceSummary } from '@/components/dashboard/intelligence-summary'

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4 },
    }),
}

export default function DashboardPage() {
    const [timeRange, setTimeRange] = React.useState('7d')

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            {/* Header Section */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
                <DashboardHeader
                    timeRange={timeRange}
                    onTimeRangeChange={setTimeRange}
                />
            </motion.section>

            {/* Stats Cards */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
                <StatsCards />
            </motion.section>

            {/* Main Charts Row */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                className="grid gap-6 lg:grid-cols-3"
            >
                <ScamDetectionChart timeRange={timeRange} />
                <ScamTypesChart />
            </motion.section>

            {/* Sessions and Threat Level Row */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="grid gap-6 lg:grid-cols-3"
            >
                <RecentSessions />
                <ThreatLevelCard />
            </motion.section>

            {/* Bottom Grid - Health, Actions, Intelligence */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                <SystemHealth />
                <QuickActions />
                <IntelligenceSummary />
            </motion.section>

            {/* Activity Feed */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={5}
            >
                <ActivityFeed />
            </motion.section>
        </div>
    )
}
