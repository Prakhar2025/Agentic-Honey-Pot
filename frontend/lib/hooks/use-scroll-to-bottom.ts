'use client'

import { useEffect, useRef, RefObject } from 'react'
import { useChatStore } from '@/lib/stores'

export function useScrollToBottom(
    ref: RefObject<HTMLDivElement | null>,
    deps: unknown[] = []
) {
    const { autoScroll } = useChatStore()

    useEffect(() => {
        if (autoScroll && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

export function useAutoScroll() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { autoScroll } = useChatStore()

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return { scrollRef, scrollToBottom, autoScroll }
}
