'use client'

import { useEffect } from 'react'

type ShortcutMap = Record<string, () => void>

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const isMod = e.metaKey || e.ctrlKey
            const isShift = e.shiftKey

            for (const [combo, action] of Object.entries(shortcuts)) {
                const parts = combo.toLowerCase().split('+')
                const key = parts[parts.length - 1]
                const needsMod = parts.includes('mod')
                const needsShift = parts.includes('shift')

                if (
                    e.key.toLowerCase() === key &&
                    needsMod === isMod &&
                    needsShift === isShift
                ) {
                    e.preventDefault()
                    action()
                    return
                }
            }
        }

        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [shortcuts])
}
