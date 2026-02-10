// Entity display formatters and utilities

export function formatEntityValue(value: string, type: string): string {
    switch (type) {
        case 'PHONE_NUMBER':
            return formatPhoneNumber(value)
        case 'BANK_ACCOUNT':
            return formatBankAccount(value)
        case 'UPI_ID':
            return value.toLowerCase()
        case 'URL':
            try {
                return decodeURIComponent(value)
            } catch {
                return value
            }
        case 'EMAIL':
            return value.toLowerCase()
        default:
            return value
    }
}

export function maskSensitiveValue(value: string, type: string): string {
    switch (type) {
        case 'PHONE_NUMBER':
            // Show first 4 and last 2 digits
            if (value.length > 6) {
                const digits = value.replace(/\D/g, '')
                if (digits.length > 6) {
                    return value.slice(0, 4) + '••••' + value.slice(-2)
                }
            }
            return value
        case 'BANK_ACCOUNT':
            // Show first 4 and last 4 digits
            const accountDigits = value.replace(/\D/g, '')
            if (accountDigits.length > 8) {
                return accountDigits.slice(0, 4) + '••••' + accountDigits.slice(-4)
            }
            return value
        case 'UPI_ID':
            // Show first part before @
            const parts = value.split('@')
            if (parts[0] && parts[0].length > 3 && parts[1]) {
                return parts[0].slice(0, 3) + '•••@' + parts[1]
            }
            return value
        case 'EMAIL':
            // Show first 2 chars and domain
            const emailParts = value.split('@')
            if (emailParts[0] && emailParts[0].length > 2 && emailParts[1]) {
                return emailParts[0].slice(0, 2) + '•••@' + emailParts[1]
            }
            return value
        case 'CRYPTO_WALLET':
            // Show first 6 and last 4 chars
            if (value.length > 10) {
                return value.slice(0, 6) + '••••' + value.slice(-4)
            }
            return value
        default:
            return value
    }
}

function formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')

    // Indian format: +91 XXXXX XXXXX
    if (digits.startsWith('91') && digits.length === 12) {
        return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
    }

    // Already formatted or 10-digit format
    if (digits.length === 10) {
        return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
    }

    return phone
}

function formatBankAccount(account: string): string {
    // Format in groups of 4
    const digits = account.replace(/\D/g, '')
    return digits.match(/.{1,4}/g)?.join(' ') || account
}

export function getEntityColor(type: string): string {
    const colors: Record<string, string> = {
        PHONE_NUMBER: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
        UPI_ID: 'text-green-600 bg-green-100 dark:bg-green-900/30',
        BANK_ACCOUNT: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
        URL: 'text-red-600 bg-red-100 dark:bg-red-900/30',
        EMAIL: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30',
        IFSC_CODE: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
        CRYPTO_WALLET: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
    }
    return colors[type] || 'text-gray-600 bg-gray-100 dark:bg-gray-800'
}

export function getEntityIcon(type: string): string {
    const icons: Record<string, string> = {
        PHONE_NUMBER: '📞',
        UPI_ID: '💳',
        BANK_ACCOUNT: '🏦',
        URL: '🔗',
        EMAIL: '📧',
        IFSC_CODE: '🔢',
        CRYPTO_WALLET: '₿',
    }
    return icons[type] || '📄'
}

export function getRiskLevel(score: number): { label: string; color: string; bgColor: string } {
    if (score >= 9) return { label: 'Critical', color: 'text-red-600', bgColor: 'bg-red-600' }
    if (score >= 7) return { label: 'High', color: 'text-red-500', bgColor: 'bg-red-500' }
    if (score >= 5) return { label: 'Medium', color: 'text-orange-500', bgColor: 'bg-orange-500' }
    if (score >= 3) return { label: 'Low', color: 'text-yellow-500', bgColor: 'bg-yellow-500' }
    return { label: 'Minimal', color: 'text-green-500', bgColor: 'bg-green-500' }
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}

export function formatPercentage(value: number): string {
    return `${Math.round(value)}%`
}
