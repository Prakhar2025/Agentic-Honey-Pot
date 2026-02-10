// Intelligence Filters Store
import { create } from 'zustand'

interface IntelligenceFiltersState {
    isFiltersOpen: boolean
    activeFilterCount: number
    toggleFilters: () => void
    setFiltersOpen: (open: boolean) => void
    setActiveFilterCount: (count: number) => void
}

export const useIntelligenceFiltersStore = create<IntelligenceFiltersState>((set) => ({
    isFiltersOpen: false,
    activeFilterCount: 0,
    toggleFilters: () => set((state) => ({ isFiltersOpen: !state.isFiltersOpen })),
    setFiltersOpen: (open: boolean) => set({ isFiltersOpen: open }),
    setActiveFilterCount: (count: number) => set({ activeFilterCount: count }),
}))
