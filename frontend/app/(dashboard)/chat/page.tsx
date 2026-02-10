'use client'

import { useState, useCallback, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Library, Clock, Settings,
    PanelRightOpen, PanelRightClose,
    PanelLeftOpen, PanelLeftClose,
    Brain, Activity
} from 'lucide-react'
import { ChatContainer } from '@/components/chat/chat-container'
import { ChatWelcome } from '@/components/chat/chat-welcome'
import { ChatSidebar } from '@/components/chat/chat-sidebar'
import { IntelligenceFeed } from '@/components/chat/intelligence-feed'
import { SessionPanel } from '@/components/chat/session-panel'
import { ChatSettingsModal } from '@/components/chat/chat-settings-modal'
import { ChatExportModal } from '@/components/chat/chat-export-modal'
import { EndSessionDialog } from '@/components/chat/end-session-dialog'
import { ChatErrorBoundary } from '@/components/chat/chat-error-boundary'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useChat, useTypingIndicator, useMediaQuery, useKeyboardShortcuts } from '@/lib/hooks'
import { useChatStore } from '@/lib/stores'
import { cn } from '@/lib/utils/cn'

function ChatPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session') || undefined

    // State
    const [showLeftPanel, setShowLeftPanel] = useState(true)
    const [showRightPanel, setShowRightPanel] = useState(true)
    const [leftTab, setLeftTab] = useState<'scenarios' | 'history'>('scenarios')
    const [rightTab, setRightTab] = useState<'intelligence' | 'session'>('intelligence')
    const [showSettings, setShowSettings] = useState(false)
    const [showExport, setShowExport] = useState(false)
    const [showEndSession, setShowEndSession] = useState(false)
    const [mobileTab, setMobileTab] = useState<'chat' | 'intel' | 'scenarios'>('chat')

    // Store
    const {
        messages, activeSession, extractedEntities,
        riskScore, scamType, clearSession
    } = useChatStore()

    // Chat logic
    const { startSession, continueSession, isStarting, isContinuing } = useChat()

    // Typing animation
    const { isTyping, startTyping, stopTyping } = useTypingIndicator(3000)

    // Responsive
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isTablet = useMediaQuery('(max-width: 1024px)')

    // Build scam detection from store
    const scamDetection = useMemo(() => {
        if (!scamType) return null
        return {
            is_scam: true,
            scam_type: scamType,
            confidence: riskScore || 0,
            risk_level: (riskScore || 0) >= 0.8 ? 'CRITICAL' as const :
                (riskScore || 0) >= 0.6 ? 'HIGH' as const :
                    (riskScore || 0) >= 0.4 ? 'MEDIUM' as const : 'LOW' as const,
        }
    }, [scamType, riskScore])

    // Handle starting a session
    const handleStartSession = useCallback(async (params: {
        scammerMessage: string
        persona?: string
        scenario?: string
    }) => {
        startTyping()
        await startSession(params)
        stopTyping()
        if (isMobile) setMobileTab('chat')
    }, [startSession, startTyping, stopTyping, isMobile])

    // Handle sending a message in an active session
    const handleSendMessage = useCallback(async (message: string) => {
        if (!activeSession?.id) return
        startTyping()
        await continueSession(activeSession.id, message)
        stopTyping()
    }, [activeSession, continueSession, startTyping, stopTyping])

    // Handle scenario selection from sidebar
    const handleScenarioSelect = useCallback((params: {
        scammerMessage: string
        persona?: string
        scenario?: string
    }) => {
        handleStartSession(params)
    }, [handleStartSession])

    // Handle session selection from history
    const handleSessionSelect = useCallback((sessionId: string) => {
        router.push(`/chat?session=${sessionId}`)
    }, [router])

    // Handle new chat
    const handleNewChat = useCallback(() => {
        clearSession()
        router.push('/chat')
    }, [clearSession, router])

    // Handle end session
    const handleEndSession = useCallback(async () => {
        clearSession()
        setShowEndSession(false)
        router.push('/chat')
    }, [clearSession, router])

    // Keyboard shortcuts
    useKeyboardShortcuts(useMemo(() => ({
        'mod+n': handleNewChat,
        'mod+e': () => setShowSettings(true),
    }), [handleNewChat]))

    const hasSession = !!activeSession

    // =================
    // MOBILE LAYOUT
    // =================
    if (isMobile) {
        return (
            <div className="flex flex-col h-[calc(100vh-64px)]">
                {/* Mobile Tab Bar */}
                <div className="flex border-b bg-background">
                    <button
                        onClick={() => setMobileTab('chat')}
                        className={cn(
                            'flex-1 py-3 text-xs font-medium text-center border-b-2 transition-colors',
                            mobileTab === 'chat' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
                        )}
                    >
                        💬 Chat
                    </button>
                    <button
                        onClick={() => setMobileTab('intel')}
                        className={cn(
                            'flex-1 py-3 text-xs font-medium text-center border-b-2 transition-colors relative',
                            mobileTab === 'intel' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
                        )}
                    >
                        🧠 Intel
                        {extractedEntities.length > 0 && (
                            <span className="absolute top-2 right-4 h-4 w-4 rounded-full bg-primary text-[9px] text-primary-foreground flex items-center justify-center">
                                {extractedEntities.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setMobileTab('scenarios')}
                        className={cn(
                            'flex-1 py-3 text-xs font-medium text-center border-b-2 transition-colors',
                            mobileTab === 'scenarios' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
                        )}
                    >
                        📚 Scenarios
                    </button>
                </div>

                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {mobileTab === 'chat' && (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                {hasSession ? (
                                    <ChatContainer
                                        session={activeSession}
                                        messages={messages}
                                        isTyping={isTyping}
                                        isLoading={isStarting || isContinuing}
                                        scamDetection={scamDetection}
                                        onSendMessage={handleSendMessage}
                                    />
                                ) : (
                                    <ChatWelcome onStartSession={handleStartSession} />
                                )}
                            </motion.div>
                        )}
                        {mobileTab === 'intel' && (
                            <motion.div
                                key="intel"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <IntelligenceFeed sessionId={activeSession?.id} />
                            </motion.div>
                        )}
                        {mobileTab === 'scenarios' && (
                            <motion.div
                                key="scenarios"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <ChatSidebar
                                    mode="scenarios"
                                    onSelectScenario={handleScenarioSelect}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Modals */}
                <ChatSettingsModal open={showSettings} onOpenChange={setShowSettings} />
                <ChatExportModal open={showExport} onOpenChange={setShowExport} />
                <EndSessionDialog
                    open={showEndSession}
                    onOpenChange={setShowEndSession}
                    onConfirm={handleEndSession}
                />
            </div>
        )
    }

    // =================
    // DESKTOP LAYOUT
    // =================
    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Left Sidebar */}
            <AnimatePresence>
                {showLeftPanel && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: isTablet ? 260 : 300, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="border-r bg-background/50 overflow-hidden flex flex-col"
                    >
                        {/* Left Panel Header */}
                        <div className="border-b p-3 flex items-center justify-between">
                            <div className="flex gap-1">
                                <Button
                                    variant={leftTab === 'scenarios' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => setLeftTab('scenarios')}
                                >
                                    <Library className="h-3 w-3" />
                                    Scenarios
                                </Button>
                                <Button
                                    variant={leftTab === 'history' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => setLeftTab('history')}
                                >
                                    <Clock className="h-3 w-3" />
                                    History
                                </Button>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleNewChat}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Left Panel Content */}
                        <div className="flex-1 overflow-hidden">
                            <ChatSidebar
                                mode={leftTab}
                                onSelectScenario={handleScenarioSelect}
                                onSelectSession={handleSessionSelect}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Left Panel */}
            <div className="flex flex-col border-r">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 m-1 rounded-full"
                    onClick={() => setShowLeftPanel(!showLeftPanel)}
                >
                    {showLeftPanel ? (
                        <PanelLeftClose className="h-4 w-4" />
                    ) : (
                        <PanelLeftOpen className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <ChatErrorBoundary>
                    {hasSession ? (
                        <ChatContainer
                            session={activeSession}
                            messages={messages}
                            isTyping={isTyping}
                            isLoading={isStarting || isContinuing}
                            scamDetection={scamDetection}
                            onSendMessage={handleSendMessage}
                        />
                    ) : (
                        <ChatWelcome onStartSession={handleStartSession} />
                    )}
                </ChatErrorBoundary>
            </div>

            {/* Toggle Right Panel */}
            <div className="flex flex-col border-l">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 m-1 rounded-full"
                    onClick={() => setShowRightPanel(!showRightPanel)}
                >
                    {showRightPanel ? (
                        <PanelRightClose className="h-4 w-4" />
                    ) : (
                        <PanelRightOpen className="h-4 w-4" />
                    )}
                </Button>
                {/* Settings Button */}
                <div className="mt-auto mb-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 m-1 rounded-full"
                        onClick={() => setShowSettings(true)}
                    >
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Right Panel */}
            <AnimatePresence>
                {showRightPanel && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: isTablet ? 280 : 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="border-l bg-background/50 overflow-hidden flex flex-col"
                    >
                        {/* Right Panel Tabs */}
                        <div className="border-b p-3">
                            <div className="flex gap-1">
                                <Button
                                    variant={rightTab === 'intelligence' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => setRightTab('intelligence')}
                                >
                                    <Brain className="h-3 w-3" />
                                    Intelligence
                                </Button>
                                <Button
                                    variant={rightTab === 'session' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => setRightTab('session')}
                                >
                                    <Activity className="h-3 w-3" />
                                    Session
                                </Button>
                            </div>
                        </div>

                        {/* Right Panel Content */}
                        <div className="flex-1 overflow-hidden">
                            {rightTab === 'intelligence' ? (
                                <IntelligenceFeed sessionId={activeSession?.id} />
                            ) : (
                                <SessionPanel session={activeSession} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <ChatSettingsModal open={showSettings} onOpenChange={setShowSettings} />
            <ChatExportModal open={showExport} onOpenChange={setShowExport} />
            <EndSessionDialog
                open={showEndSession}
                onOpenChange={setShowEndSession}
                onConfirm={handleEndSession}
            />
        </div>
    )
}

export default function ChatPage() {
    return (
        <TooltipProvider>
            <Suspense fallback={
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="animate-pulse text-muted-foreground">Loading chat interface...</div>
                </div>
            }>
                <ChatPageContent />
            </Suspense>
        </TooltipProvider>
    )
}
