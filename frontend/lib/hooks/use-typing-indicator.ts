'use client'

import { useState, useEffect, useCallback } from 'react'

export function useTypingIndicator(duration = 3000) {
    const [isTyping, setIsTyping] = useState(false)

    const startTyping = useCallback(() => {
        setIsTyping(true)
    }, [])

    const stopTyping = useCallback(() => {
        setIsTyping(false)
    }, [])

    useEffect(() => {
        if (!isTyping) return
        const timer = setTimeout(() => setIsTyping(false), duration)
        return () => clearTimeout(timer)
    }, [isTyping, duration])

    return { isTyping, startTyping, stopTyping }
}
