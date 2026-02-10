export function generateId(): string {
    return Math.random().toString(36).substring(2, 11)
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
}

export function isValidUPI(upi: string): boolean {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/
    return upiRegex.test(upi)
}

export function getScamTypeColor(scamType: string): string {
    const colors: Record<string, string> = {
        KYC_FRAUD: 'red',
        LOTTERY_SCAM: 'orange',
        TECH_SUPPORT: 'yellow',
        INVESTMENT_FRAUD: 'purple',
        JOB_SCAM: 'blue',
        LOAN_SCAM: 'green',
        OTP_FRAUD: 'pink',
        UNKNOWN: 'gray',
    }
    return colors[scamType] || 'gray'
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        INITIAL: 'gray',
        ONGOING: 'blue',
        COMPLETED: 'green',
        TERMINATED: 'red',
        MAX_TURNS_REACHED: 'orange',
        SAFETY_EXIT: 'yellow',
    }
    return colors[status] || 'gray'
}
