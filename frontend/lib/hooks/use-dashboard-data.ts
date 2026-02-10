'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api/dashboard'

// Query keys for cache management
export const dashboardKeys = {
    all: ['dashboard'] as const,
    stats: () => [...dashboardKeys.all, 'stats'] as const,
    timeline: (range: string) => [...dashboardKeys.all, 'timeline', range] as const,
    scamTypes: () => [...dashboardKeys.all, 'scam-types'] as const,
    recentSessions: (limit: number) => [...dashboardKeys.all, 'recent-sessions', limit] as const,
    threatLevel: () => [...dashboardKeys.all, 'threat-level'] as const,
    systemHealth: () => [...dashboardKeys.all, 'system-health'] as const,
    intelligenceSummary: () => [...dashboardKeys.all, 'intelligence-summary'] as const,
    activityFeed: () => [...dashboardKeys.all, 'activity-feed'] as const,
}

// Hook for dashboard statistics (refreshes every 10s)
export function useDashboardStats() {
    return useQuery({
        queryKey: dashboardKeys.stats(),
        queryFn: dashboardApi.getStats,
        refetchInterval: 10000,
        staleTime: 5000,
        retry: 2,
    })
}

// Hook for timeline data
export function useTimelineData(range: string) {
    return useQuery({
        queryKey: dashboardKeys.timeline(range),
        queryFn: () => dashboardApi.getTimeline(range),
        staleTime: 30000,
        retry: 2,
    })
}

// Hook for scam types distribution
export function useScamTypesData() {
    return useQuery({
        queryKey: dashboardKeys.scamTypes(),
        queryFn: dashboardApi.getScamTypes,
        staleTime: 60000,
        retry: 2,
    })
}

// Hook for recent sessions (refreshes every 5s)
export function useRecentSessions(limit: number = 10) {
    return useQuery({
        queryKey: dashboardKeys.recentSessions(limit),
        queryFn: () => dashboardApi.getRecentSessions(limit),
        refetchInterval: 5000,
        staleTime: 3000,
        retry: 2,
    })
}

// Hook for threat level
export function useThreatLevel() {
    return useQuery({
        queryKey: dashboardKeys.threatLevel(),
        queryFn: dashboardApi.getThreatLevel,
        refetchInterval: 15000,
        staleTime: 10000,
        retry: 2,
    })
}

// Hook for system health
export function useSystemHealth() {
    return useQuery({
        queryKey: dashboardKeys.systemHealth(),
        queryFn: dashboardApi.getSystemHealth,
        refetchInterval: 30000,
        staleTime: 15000,
        retry: 2,
    })
}

// Hook for intelligence summary
export function useIntelligenceSummary() {
    return useQuery({
        queryKey: dashboardKeys.intelligenceSummary(),
        queryFn: dashboardApi.getIntelligenceSummary,
        refetchInterval: 30000,
        staleTime: 20000,
        retry: 2,
    })
}

// Hook for activity feed
export function useActivityFeed(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: dashboardKeys.activityFeed(),
        queryFn: dashboardApi.getActivityFeed,
        refetchInterval: 5000,
        staleTime: 2000,
        enabled: options?.enabled ?? true,
        retry: 2,
    })
}

// Hook to prefetch dashboard data
export function usePrefetchDashboard() {
    const queryClient = useQueryClient()

    return () => {
        queryClient.prefetchQuery({
            queryKey: dashboardKeys.stats(),
            queryFn: dashboardApi.getStats,
        })
        queryClient.prefetchQuery({
            queryKey: dashboardKeys.recentSessions(10),
            queryFn: () => dashboardApi.getRecentSessions(10),
        })
        queryClient.prefetchQuery({
            queryKey: dashboardKeys.systemHealth(),
            queryFn: dashboardApi.getSystemHealth,
        })
    }
}

// Hook to invalidate all dashboard data
export function useInvalidateDashboard() {
    const queryClient = useQueryClient()

    return () => {
        queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
    }
}
