export const APP_CONFIG = {
    name: 'ScamShield',
    description: 'AI-Powered Scam Intelligence Platform',
    version: '1.0.0',
} as const

export const SCAM_TYPES = {
    KYC_FRAUD: { label: 'KYC Fraud', color: 'bg-red-500', textColor: 'text-red-500', icon: 'Shield' },
    LOTTERY_SCAM: { label: 'Lottery Scam', color: 'bg-orange-500', textColor: 'text-orange-500', icon: 'Gift' },
    TECH_SUPPORT: { label: 'Tech Support', color: 'bg-yellow-500', textColor: 'text-yellow-500', icon: 'Monitor' },
    INVESTMENT_FRAUD: { label: 'Investment Fraud', color: 'bg-purple-500', textColor: 'text-purple-500', icon: 'TrendingUp' },
    JOB_SCAM: { label: 'Job Scam', color: 'bg-blue-500', textColor: 'text-blue-500', icon: 'Briefcase' },
    LOAN_SCAM: { label: 'Loan Scam', color: 'bg-green-500', textColor: 'text-green-500', icon: 'Banknote' },
    OTP_FRAUD: { label: 'OTP Fraud', color: 'bg-pink-500', textColor: 'text-pink-500', icon: 'Key' },
    UNKNOWN: { label: 'Unknown', color: 'bg-gray-500', textColor: 'text-gray-500', icon: 'HelpCircle' },
} as const

export const SESSION_STATUS = {
    INITIAL: { label: 'Initial', color: 'bg-gray-500', textColor: 'text-gray-500' },
    ONGOING: { label: 'Ongoing', color: 'bg-blue-500', textColor: 'text-blue-500' },
    COMPLETED: { label: 'Completed', color: 'bg-green-500', textColor: 'text-green-500' },
    TERMINATED: { label: 'Terminated', color: 'bg-red-500', textColor: 'text-red-500' },
    MAX_TURNS_REACHED: { label: 'Max Turns', color: 'bg-orange-500', textColor: 'text-orange-500' },
    SAFETY_EXIT: { label: 'Safety Exit', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
} as const

export const PERSONAS = {
    elderly_victim: { label: 'Elderly Victim', description: 'Confused, trusting grandparent', icon: '👵' },
    tech_novice: { label: 'Tech Novice', description: 'Overwhelmed by technology', icon: '🤷' },
    eager_investor: { label: 'Eager Investor', description: 'Greedy, impatient investor', icon: '💰' },
    busy_professional: { label: 'Busy Professional', description: 'Distracted, time-pressed', icon: '👔' },
    helpful_auntie: { label: 'Helpful Auntie', description: 'Oversharing, chatty', icon: '👩' },
} as const

export const ENTITY_TYPES = {
    PHONE_NUMBER: { label: 'Phone Number', icon: 'Phone', color: 'blue' },
    UPI_ID: { label: 'UPI ID', icon: 'CreditCard', color: 'green' },
    BANK_ACCOUNT: { label: 'Bank Account', icon: 'Building', color: 'purple' },
    IFSC_CODE: { label: 'IFSC Code', icon: 'Hash', color: 'orange' },
    EMAIL: { label: 'Email', icon: 'Mail', color: 'pink' },
    URL: { label: 'Phishing Link', icon: 'Link', color: 'red' },
    CRYPTO_WALLET: { label: 'Crypto Wallet', icon: 'Coins', color: 'yellow' },
} as const

export const SOURCE_TYPES = {
    sms: { label: 'SMS', icon: 'MessageSquare' },
    whatsapp: { label: 'WhatsApp', icon: 'MessageCircle' },
    email: { label: 'Email', icon: 'Mail' },
    chat: { label: 'Chat', icon: 'MessagesSquare' },
} as const

// Analytics constants
export * from './time-ranges'
export * from './chart-colors'
