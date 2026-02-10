// Analytics Data Hooks - TanStack Query
'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api/analytics'
import { useAnalyticsStore } from '@/lib/stores'
import type { AnalyticsParams } from '@/types/analytics'

// ============================================================================
// Query Keys
// ============================================================================

export const analyticsKeys = {
    all: ['analytics'] as const,
    overview: (params: AnalyticsParams) => [...analyticsKeys.all, 'overview', params] as const,
    sessionsOverTime: (params: AnalyticsParams) => [...analyticsKeys.all, 'sessions-over-time', params] as const,
    scamTypeDistribution: (params: AnalyticsParams) => [...analyticsKeys.all, 'scam-type-distribution', params] as const,
    personaEffectiveness: (params: AnalyticsParams) => [...analyticsKeys.all, 'persona-effectiveness', params] as const,
    entityExtraction: (params: AnalyticsParams) => [...analyticsKeys.all, 'entity-extraction', params] as const,
    geographicDistribution: (params: AnalyticsParams) => [...analyticsKeys.all, 'geographic', params] as const,
    hourlyActivity: (params: AnalyticsParams) => [...analyticsKeys.all, 'hourly-activity', params] as const,
    riskDistribution: (params: AnalyticsParams) => [...analyticsKeys.all, 'risk-distribution', params] as const,
    llmPerformance: (params: AnalyticsParams) => [...analyticsKeys.all, 'llm-performance', params] as const,
    detectionFunnel: (params: AnalyticsParams) => [...analyticsKeys.all, 'detection-funnel', params] as const,
}

// ============================================================================
// Common Query Config
// ============================================================================

const defaultQueryConfig = {
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
    retry: 2,
}

// ============================================================================
// Hook to get common params from store
// ============================================================================

function useAnalyticsParams(overrides?: Partial<AnalyticsParams>): AnalyticsParams {
    const store = useAnalyticsStore()
    const baseParams = store.getQueryParams()

    return {
        ...baseParams,
        ...overrides,
    }
}

// ============================================================================
// Analytics Overview Hook
// ============================================================================

export function useAnalyticsOverview() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.overview(params),
        queryFn: () => analyticsApi.getOverview(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Sessions Over Time Hook
// ============================================================================

interface SessionsOverTimeOptions {
    groupBy?: 'status' | 'scam_type' | 'persona'
}

export function useSessionsOverTime(options: SessionsOverTimeOptions = {}) {
    const params = useAnalyticsParams({ group_by: options.groupBy })

    return useQuery({
        queryKey: analyticsKeys.sessionsOverTime(params),
        queryFn: () => analyticsApi.getSessionsOverTime(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Scam Type Distribution Hook
// ============================================================================

export function useScamTypeDistribution() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.scamTypeDistribution(params),
        queryFn: () => analyticsApi.getScamTypeDistribution(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Persona Effectiveness Hook
// ============================================================================

export function usePersonaEffectiveness() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.personaEffectiveness(params),
        queryFn: () => analyticsApi.getPersonaEffectiveness(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Entity Extraction Hook
// ============================================================================

export function useEntityExtraction() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.entityExtraction(params),
        queryFn: () => analyticsApi.getEntityExtraction(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Geographic Distribution Hook
// ============================================================================

export function useGeographicDistribution() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.geographicDistribution(params),
        queryFn: () => analyticsApi.getGeographicDistribution(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Hourly Activity Hook
// ============================================================================

export function useHourlyActivity() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.hourlyActivity(params),
        queryFn: () => analyticsApi.getHourlyActivity(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Risk Distribution Hook
// ============================================================================

export function useRiskDistribution() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.riskDistribution(params),
        queryFn: () => analyticsApi.getRiskDistribution(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// LLM Performance Hook
// ============================================================================

export function useLLMPerformance() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.llmPerformance(params),
        queryFn: () => analyticsApi.getLLMPerformance(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Detection Funnel Hook
// ============================================================================

export function useDetectionFunnel() {
    const params = useAnalyticsParams()

    return useQuery({
        queryKey: analyticsKeys.detectionFunnel(params),
        queryFn: () => analyticsApi.getDetectionFunnel(params),
        ...defaultQueryConfig,
    })
}

// ============================================================================
// Refresh All Analytics Data
// ============================================================================

export function useRefreshAnalytics() {
    const queryClient = useQueryClient()
    const { setIsRefreshing } = useAnalyticsStore()

    const refresh = async () => {
        setIsRefreshing(true)
        await queryClient.invalidateQueries({ queryKey: analyticsKeys.all })
        setIsRefreshing(false)
    }

    return { refresh }
}

// ============================================================================
// Prefetch Analytics Data
// ============================================================================

export function usePrefetchAnalytics() {
    const queryClient = useQueryClient()
    const params = useAnalyticsParams()

    const prefetchAll = async () => {
        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: analyticsKeys.overview(params),
                queryFn: () => analyticsApi.getOverview(params),
            }),
            queryClient.prefetchQuery({
                queryKey: analyticsKeys.sessionsOverTime(params),
                queryFn: () => analyticsApi.getSessionsOverTime(params),
            }),
            queryClient.prefetchQuery({
                queryKey: analyticsKeys.scamTypeDistribution(params),
                queryFn: () => analyticsApi.getScamTypeDistribution(params),
            }),
        ])
    }

    return { prefetchAll }
}
