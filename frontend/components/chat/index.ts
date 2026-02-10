// Chat component barrel exports

// Core
export { ChatContainer } from './chat-container'
export { ChatMessages } from './chat-messages'
export { ChatMessage } from './chat-message'
export { ChatInput } from './chat-input'
export { ChatHeader } from './chat-header'
export { ChatStatusBar } from './chat-status-bar'
export { ChatTypingIndicator } from './chat-typing-indicator'

// Welcome & Onboarding
export { ChatWelcome } from './chat-welcome'
export { PersonaSelector } from './persona-selector'
export { PersonaAvatar } from './persona-avatar'
export { PersonaInfoCard } from './persona-info-card'
export { ScenarioLibrary } from './scenario-library'
export { ScenarioCard } from './scenario-card'
export { QuickScenarioPicker } from './quick-scenario-picker'

// Intelligence
export { IntelligenceFeed } from './intelligence-feed'
export { IntelligenceItem } from './intelligence-item'
export { EntityHighlight } from './entity-highlight'
export { RiskMeter } from './risk-meter'
export { ScamDetectionAlert } from './scam-detection-alert'

// Session
export { SessionPanel } from './session-panel'
export { SessionMetrics } from './session-metrics'
export { SessionTimeline } from './session-timeline'

// Sidebar
export { ChatSidebar } from './chat-sidebar'

// Input Extensions
export { ChatInputActions } from './chat-input-actions'
export { MessageTemplates } from './message-templates'
export { MessageActions } from './message-actions'
export { MessageContextMenu } from './message-context-menu'

// Modals & Dialogs
export { ChatSettingsModal } from './chat-settings-modal'
export { ChatExportModal } from './chat-export-modal'
export { EndSessionDialog } from './end-session-dialog'

// Status & Utility
export { ConnectionStatus } from './connection-status'
export { ChatEmptyState } from './chat-empty-state'
export { ChatErrorBoundary } from './chat-error-boundary'

// Skeletons
export {
    ChatMessageSkeleton,
    ChatHeaderSkeleton,
    ChatInputSkeleton,
    IntelligenceSkeleton,
    SessionPanelSkeleton,
    SidebarSkeleton,
} from './chat-skeletons'
