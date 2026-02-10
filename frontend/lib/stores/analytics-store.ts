// Zustand store for analytics state management
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DateRange } from 'react-day-picker'
import { TimeRangeKey, TIME_RANGES } from '@/lib/constants/time-ranges'
import { useQueryClient } from '@tanstack/react-query'

export type Granularity = 'hour' | 'day' | 'week' | 'month'

interface AnalyticsState {
    // Time range state
    timeRange: TimeRangeKey
    customRange: DateRange | undefined
    compareEnabled: boolean
    granularity: Granularity

    // UI state
    isRefreshing: boolean
    selectedChart: string | null
    fullscreenChart: string | null

    // Actions
    setTimeRange: (range: TimeRangeKey) => void
    setCustomRange: (range: DateRange | undefined) => void
    setCompareEnabled: (enabled: boolean) => void
    setGranularity: (granularity: Granularity) => void
    setIsRefreshing: (isRefreshing: boolean) => void
    setSelectedChart: (chartId: string | null) => void
    setFullscreenChart: (chartId: string | null) => void

    // Computed values
    getDateRange: () => { startDate: Date; endDate: Date }
    getQueryParams: () => {
        start_date: string
        end_date: string
        granularity: Granularity
        compare_previous: boolean
    }

    // Refresh function
    refreshData: () => Promise<void>
    resetFilters: () => void
}

export const useAnalyticsStore = create<AnalyticsState>()(
    persist(
        (set, get) => ({
            // Initial state
            timeRange: '7d',
            customRange: undefined,
            compareEnabled: false,
            granularity: 'day',
            isRefreshing: false,
            selectedChart: null,
            fullscreenChart: null,

            // Actions
            setTimeRange: (range) => {
                const config = TIME_RANGES[range]
                set({
                    timeRange: range,
                    granularity: config?.granularity || 'day'
                })
            },

            setCustomRange: (range) => set({ customRange: range }),

            setCompareEnabled: (enabled) => set({ compareEnabled: enabled }),

            setGranularity: (granularity) => set({ granularity }),

            setIsRefreshing: (isRefreshing) => set({ isRefreshing }),

            setSelectedChart: (chartId) => set({ selectedChart: chartId }),

            setFullscreenChart: (chartId) => set({ fullscreenChart: chartId }),

            // Get computed date range
            getDateRange: () => {
                const { timeRange, customRange } = get()

                if (timeRange === 'custom' && customRange?.from && customRange?.to) {
                    return {
                        startDate: customRange.from,
                        endDate: customRange.to,
                    }
                }

                const config = TIME_RANGES[timeRange]
                if (config) {
                    const { start, end } = config.getRange()
                    return { startDate: start, endDate: end }
                }

                // Default fallback
                const defaultConfig = TIME_RANGES['7d']
                const { start, end } = defaultConfig.getRange()
                return { startDate: start, endDate: end }
            },

            // Get query params for API calls
            getQueryParams: () => {
                const { granularity, compareEnabled } = get()
                const { startDate, endDate } = get().getDateRange()

                return {
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString(),
                    granularity,
                    compare_previous: compareEnabled,
                }
            },

            // Refresh data - invalidates all analytics queries
            refreshData: async () => {
                set({ isRefreshing: true })
                // The actual invalidation is handled by the component using queryClient
                await new Promise(resolve => setTimeout(resolve, 500))
                set({ isRefreshing: false })
            },

            // Reset all filters to default
            resetFilters: () => set({
                timeRange: '7d',
                customRange: undefined,
                compareEnabled: false,
                granularity: 'day',
            }),
        }),
        {
            name: 'scamshield-analytics-storage',
            partialize: (state) => ({
                timeRange: state.timeRange,
                compareEnabled: state.compareEnabled,
                granularity: state.granularity,
            }),
        }
    )
)

// Hook to use analytics store with query client for refreshing
export function useAnalyticsRefresh() {
    const queryClient = useQueryClient()
    const { setIsRefreshing } = useAnalyticsStore()

    const refreshAllData = async () => {
        setIsRefreshing(true)
        await queryClient.invalidateQueries({ queryKey: ['analytics'] })
        setIsRefreshing(false)
    }

    return { refreshAllData }
}
