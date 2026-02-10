// Intelligence data hooks
'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { intelligenceApi } from '@/lib/api/intelligence'
import type { IntelligenceFilters } from '@/types/filters'

// Query keys
export const intelligenceKeys = {
    all: ['intelligence'] as const,
    lists: () => [...intelligenceKeys.all, 'list'] as const,
    list: (filters: IntelligenceFilters) => [...intelligenceKeys.lists(), filters] as const,
    details: () => [...intelligenceKeys.all, 'detail'] as const,
    detail: (id: string) => [...intelligenceKeys.details(), id] as const,
    stats: () => [...intelligenceKeys.all, 'stats'] as const,
    search: (query: string) => [...intelligenceKeys.all, 'search', query] as const,
}

// Hook for intelligence list
export function useIntelligence(filters: IntelligenceFilters) {
    return useQuery({
        queryKey: intelligenceKeys.list(filters),
        queryFn: () => intelligenceApi.getIntelligence(filters),
        staleTime: 30000,
        placeholderData: (previousData) => previousData,
    })
}

// Hook for single entity
export function useEntityDetail(id: string) {
    return useQuery({
        queryKey: intelligenceKeys.detail(id),
        queryFn: () => intelligenceApi.getEntity(id),
        staleTime: 60000,
        enabled: !!id,
    })
}

// Hook for intelligence stats
export function useIntelligenceStats() {
    return useQuery({
        queryKey: intelligenceKeys.stats(),
        queryFn: intelligenceApi.getStats,
        staleTime: 60000,
    })
}

// Hook for entity search with autocomplete
export function useEntitySearch(query: string) {
    return useQuery({
        queryKey: intelligenceKeys.search(query),
        queryFn: () => intelligenceApi.searchEntities(query),
        staleTime: 10000,
        enabled: query.length >= 2,
    })
}

// Hook for prefetching
export function usePrefetchEntity() {
    const queryClient = useQueryClient()

    return (id: string) => {
        queryClient.prefetchQuery({
            queryKey: intelligenceKeys.detail(id),
            queryFn: () => intelligenceApi.getEntity(id),
        })
    }
}
