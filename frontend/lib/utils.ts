// Barrel export for lib/utils
// Re-export commonly used utilities for convenience

export { cn } from './utils/cn'
export {
    formatRelativeTime,
    formatTime,
    formatDateTime,
    formatDuration,
    formatDateRange,
    getSessionDuration,
} from './utils/date'
export {
    formatEntityValue,
    maskSensitiveValue,
    getEntityColor,
    getEntityIcon,
    getRiskLevel,
    formatNumber,
    formatPercentage,
} from './utils/entity-formatters'
export {
    highlightEntities,
    countEntitiesByType,
} from './utils/entity-highlighter'
export {
    generateId,
    sleep,
    getInitials,
    isValidEmail,
    isValidPhoneNumber,
    isValidUPI,
    getScamTypeColor,
    getStatusColor,
} from './utils/helpers'
export {
    groupMessagesByDate,
    parseMessageContent,
    highlightSearchTerm,
    truncateMessage,
} from './utils/message-parser'

// Re-export types
export type { ParsedMessage } from './utils/message-parser'
