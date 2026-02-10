// Utility hooks for chat functionality
'use client'

import { useEffect, RefObject } from 'react'

// Auto-scroll to bottom hook
export function useScrollToBottom(
    ref: RefObject<HTMLElement>,
    deps: unknown[] = []
) {
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, deps)
}

// Keyboard shortcuts hook
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMod = e.metaKey || e.ctrlKey

            Object.entries(shortcuts).forEach(([key, handler]) => {
                const parts = key.toLowerCase().split('+')
                const requiresMod = parts.includes('mod')
                const targetKey = parts[parts.length - 1]

                if (requiresMod && isMod && e.key.toLowerCase() === targetKey) {
                    e.preventDefault()
                    handler()
                } else if (!requiresMod && e.key.toLowerCase() === targetKey) {
                    handler()
                }
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [shortcuts])
}

// Media query hook
export function useMediaQuery(query: string): boolean {
    const getMatches = (query: string): boolean => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches
        }
        return false
    }

    const [matches, setMatches] = useState(getMatches(query))

    useEffect(() => {
        const matchMedia = window.matchMedia(query)
        const handleChange = () => setMatches(matchMedia.matches)

        matchMedia.addEventListener('change', handleChange)
        return () => matchMedia.removeEventListener('change', handleChange)
    }, [query])

    return matches
}

import { useState, useCallback } from 'react'

// Message sound hook
export function useMessageSound() {
    const playSound = useCallback((type: 'received' | 'sent' | 'error') => {
        // Sound effects would be played here
        // For now, just console log
        if (typeof window !== 'undefined') {
            console.log(`[Sound] ${type}`)
        }
    }, [])

    return {
        playReceived: () => playSound('received'),
        playSent: () => playSound('sent'),
        playError: () => playSound('error'),
    }
}
