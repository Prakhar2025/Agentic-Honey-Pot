// Entity highlighting utility for conversation messages

export interface ExtractedEntity {
    type: string
    value: string
    confidence?: number
    source_message_id?: string
    extracted_at?: string
    verified?: boolean
}

export function highlightEntities(content: string, entities: ExtractedEntity[]): string {
    if (!entities || entities.length === 0) return escapeHtml(content)

    let result = content

    // Sort entities by length (longest first) to avoid partial replacements
    const sortedEntities = [...entities].sort((a, b) => b.value.length - a.value.length)

    for (const entity of sortedEntities) {
        const escapedValue = escapeRegExp(entity.value)
        const regex = new RegExp(`(${escapedValue})`, 'gi')

        const tooltipContent = entity.type.replace(/_/g, ' ')
        const className = getEntityClassName(entity.type)

        result = result.replace(
            regex,
            `<span class="${className}" data-entity-type="${entity.type}" title="${tooltipContent}">$1</span>`
        )
    }

    return result
}

function getEntityClassName(type: string): string {
    const baseClass = 'entity-highlight px-1 py-0.5 rounded cursor-help font-medium'

    const typeClasses: Record<string, string> = {
        PHONE_NUMBER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        UPI_ID: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        BANK_ACCOUNT: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        URL: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        EMAIL: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
        IFSC_CODE: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
        CRYPTO_WALLET: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    }

    return `${baseClass} ${typeClasses[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function countEntitiesByType(entities: ExtractedEntity[]): Record<string, number> {
    return entities.reduce((acc, entity) => {
        acc[entity.type] = (acc[entity.type] || 0) + 1
        return acc
    }, {} as Record<string, number>)
}
