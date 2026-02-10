'use client'

import { create } from 'zustand'

interface SessionFiltersState {
    isFiltersOpen: boolean
    activeFilterCount: number
    toggleFilters: () => void
    setFiltersOpen: (open: boolean) => void
    setActiveFilterCount: (count: number) => void
}

export const useSessionFiltersStore = create<SessionFiltersState>((set) => ({
    isFiltersOpen: false,
    activeFilterCount: 0,
    toggleFilters: () => set((state: SessionFiltersState) => ({ isFiltersOpen: !state.isFiltersOpen })),
    setFiltersOpen: (open: boolean) => set({ isFiltersOpen: open }),
    setActiveFilterCount: (count: number) => set({ activeFilterCount: count }),
}))
