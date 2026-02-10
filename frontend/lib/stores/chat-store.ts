// Zustand store for chat state management
'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Message, MessageStatus } from '@/types/message'
import { ExtractedEntity, ScamDetection, SessionInfo } from '@/types/chat'

interface ChatState {
    // Session
    activeSession: SessionInfo | null
    hasActiveSession: boolean

    // Messages
    messages: Message[]

    // UI State
    isLoading: boolean
    isTyping: boolean

    // Intelligence
    extractedEntities: ExtractedEntity[]
    lastScamDetection: ScamDetection | null
    riskScore: number | undefined
    scamType: string | null

    // Settings
    soundEnabled: boolean
    autoScroll: boolean

    // Actions
    startSession: (params: { scammerMessage: string; persona?: string; scenario?: string }) => void
    loadSession: (sessionId: string) => void
    clearSession: () => void
    updateSession: (updates: Partial<SessionInfo>) => void

    // Message actions
    addMessage: (message: Message) => void
    updateMessage: (id: string, updates: Partial<Message>) => void
    removeMessage: (id: string) => void
    clearMessages: () => void

    // State setters
    setIsLoading: (loading: boolean) => void
    setIsTyping: (typing: boolean) => void
    setLastScamDetection: (detection: ScamDetection | null) => void
    addExtractedEntities: (entities: ExtractedEntity[]) => void
    setRiskScore: (score: number | undefined) => void
    setScamType: (type: string | null) => void

    // Settings
    setSoundEnabled: (enabled: boolean) => void
    setAutoScroll: (enabled: boolean) => void
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            // Initial state
            activeSession: null,
            hasActiveSession: false,
            messages: [],
            isLoading: false,
            isTyping: false,
            extractedEntities: [],
            lastScamDetection: null,
            riskScore: undefined,
            scamType: null,
            soundEnabled: true,
            autoScroll: true,

            // Session actions
            startSession: (params) => {
                // Add initial scammer message
                const scammerMessage: Message = {
                    id: crypto.randomUUID(),
                    role: 'scammer',
                    content: params.scammerMessage,
                    timestamp: new Date().toISOString(),
                    status: 'sent',
                }

                set({
                    isLoading: true,
                    messages: [scammerMessage],
                    extractedEntities: [],
                    lastScamDetection: null,
                    riskScore: undefined,
                    scamType: null,
                })
            },

            loadSession: (sessionId) => {
                set({
                    isLoading: true,
                    activeSession: { id: sessionId } as SessionInfo,
                    hasActiveSession: true,
                })
            },

            clearSession: () => {
                set({
                    activeSession: null,
                    hasActiveSession: false,
                    messages: [],
                    extractedEntities: [],
                    lastScamDetection: null,
                    riskScore: undefined,
                    scamType: null,
                    isTyping: false,
                    isLoading: false,
                })
            },

            updateSession: (updates) => {
                const currentSession = get().activeSession
                set({
                    activeSession: currentSession
                        ? { ...currentSession, ...updates }
                        : updates as SessionInfo,
                    hasActiveSession: true,
                    isLoading: false,
                })
            },

            // Message actions
            addMessage: (message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }))
            },

            updateMessage: (id, updates) => {
                set((state) => ({
                    messages: state.messages.map((m) =>
                        m.id === id ? { ...m, ...updates } : m
                    ),
                }))
            },

            removeMessage: (id) => {
                set((state) => ({
                    messages: state.messages.filter((m) => m.id !== id),
                }))
            },

            clearMessages: () => {
                set({ messages: [] })
            },

            // State setters
            setIsLoading: (loading) => {
                set({ isLoading: loading })
            },

            setIsTyping: (typing) => {
                set({ isTyping: typing })
            },

            setLastScamDetection: (detection) => {
                set({ lastScamDetection: detection })
            },

            addExtractedEntities: (entities) => {
                const existingValues = new Set(get().extractedEntities.map((e) => e.value))
                const newEntities = entities.filter((e) => !existingValues.has(e.value))
                set((state) => ({
                    extractedEntities: [...state.extractedEntities, ...newEntities],
                }))
            },

            setRiskScore: (score) => {
                set({ riskScore: score })
            },

            setScamType: (type) => {
                set({ scamType: type })
            },

            // Settings
            setSoundEnabled: (enabled) => {
                set({ soundEnabled: enabled })
            },

            setAutoScroll: (enabled) => {
                set({ autoScroll: enabled })
            },
        }),
        {
            name: 'scamshield-chat',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                soundEnabled: state.soundEnabled,
                autoScroll: state.autoScroll,
            }),
        }
    )
)
