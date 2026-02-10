import { useQuery } from '@tanstack/react-query'
import { getHealth, getHealthReady, getHealthLive } from '@/lib/api/health'

export const healthKeys = {
    all: ['health'] as const,
    status: () => [...healthKeys.all, 'status'] as const,
    ready: () => [...healthKeys.all, 'ready'] as const,
    live: () => [...healthKeys.all, 'live'] as const,
}

export function useHealth() {
    return useQuery({
        queryKey: healthKeys.status(),
        queryFn: getHealth,
        refetchInterval: 30000, // Refetch every 30 seconds
    })
}

export function useHealthReady() {
    return useQuery({
        queryKey: healthKeys.ready(),
        queryFn: getHealthReady,
    })
}

export function useHealthLive() {
    return useQuery({
        queryKey: healthKeys.live(),
        queryFn: getHealthLive,
        refetchInterval: 5000, // Check liveness every 5 seconds
    })
}
