'use client'

import { useCallback } from 'react'
import { useChatStore } from '@/lib/stores'

export function useMessageSound() {
    const { soundEnabled } = useChatStore()

    const playSound = useCallback((frequency: number, duration: number) => {
        if (!soundEnabled) return
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioCtx.createOscillator()
            const gainNode = audioCtx.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioCtx.destination)

            oscillator.frequency.value = frequency
            oscillator.type = 'sine'
            gainNode.gain.value = 0.1
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000)

            oscillator.start()
            oscillator.stop(audioCtx.currentTime + duration / 1000)
        } catch {
            // Audio not available
        }
    }, [soundEnabled])

    const playReceived = useCallback(() => {
        playSound(800, 150)
    }, [playSound])

    const playSent = useCallback(() => {
        playSound(600, 100)
    }, [playSound])

    const playError = useCallback(() => {
        playSound(300, 200)
    }, [playSound])

    return { playReceived, playSent, playError }
}
