// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://scamshield-honeypot.onrender.com'

// Scam Types
export const SCAM_TYPES = {
    KYC_FRAUD: {
        label: 'KYC Fraud',
        icon: '🏦',
        description: 'Fraudulent KYC/bank verification requests',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
    },
    LOTTERY_SCAM: {
        label: 'Lottery Scam',
        icon: '🎰',
        description: 'Fake lottery/prize winning notifications',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
    },
    TECH_SUPPORT: {
        label: 'Tech Support',
        icon: '💻',
        description: 'Fake technical support calls/messages',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
    },
    INVESTMENT_FRAUD: {
        label: 'Investment Fraud',
        icon: '📈',
        description: 'Fraudulent investment schemes',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
    },
    OTP_FRAUD: {
        label: 'OTP Fraud',
        icon: '🔐',
        description: 'OTP phishing attempts',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
    },
    ROMANCE_SCAM: {
        label: 'Romance Scam',
        icon: '💕',
        description: 'Romantic relationship-based fraud',
        color: 'text-pink-600',
        bgColor: 'bg-pink-100',
    },
    JOB_SCAM: {
        label: 'Job Scam',
        icon: '💼',
        description: 'Fake job offer frauds',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
    },
    PARCEL_SCAM: {
        label: 'Parcel Scam',
        icon: '📦',
        description: 'Fake delivery/customs frauds',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
    },
    UNKNOWN: {
        label: 'Unknown',
        icon: '❓',
        description: 'Unclassified scam type',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
    },
} as const

// Personas
export const PERSONAS = {
    elderly_victim: {
        label: 'Elderly Victim',
        icon: '👴',
        description: 'Elderly person persona who is trusting and confused by technology',
        riskLevel: 'high',
    },
    eager_investor: {
        label: 'Eager Investor',
        icon: '💰',
        description: 'Greedy investor looking for quick returns',
        riskLevel: 'high',
    },
    tech_novice: {
        label: 'Tech Novice',
        icon: '🤷',
        description: 'Person unfamiliar with technology',
        riskLevel: 'medium',
    },
    busy_professional: {
        label: 'Busy Professional',
        icon: '👔',
        description: 'Distracted professional who might fall for urgency tactics',
        riskLevel: 'medium',
    },
    cautious_senior: {
        label: 'Cautious Senior',
        icon: '👵',
        description: 'Careful elderly person who asks many questions',
        riskLevel: 'low',
    },
    naive_student: {
        label: 'Naive Student',
        icon: '📚',
        description: 'Young student unfamiliar with financial frauds',
        riskLevel: 'high',
    },
    suspicious_user: {
        label: 'Suspicious User',
        icon: '🤔',
        description: 'Skeptical person who probes for more information',
        riskLevel: 'low',
    },
} as const

// Session Status
export const SESSION_STATUS = {
    ONGOING: { label: 'Active', color: 'green' },
    ACTIVE: { label: 'Active', color: 'green' },
    COMPLETED: { label: 'Completed', color: 'blue' },
    TERMINATED: { label: 'Terminated', color: 'orange' },
    FAILED: { label: 'Failed', color: 'red' },
    MAX_TURNS_REACHED: { label: 'Max Turns', color: 'purple' },
    SAFETY_EXIT: { label: 'Safety Exit', color: 'yellow' },
} as const

// Entity Types
export const ENTITY_TYPES = {
    PHONE_NUMBER: { label: 'Phone Number', icon: '📱', color: 'blue' },
    UPI_ID: { label: 'UPI ID', icon: '💳', color: 'green' },
    BANK_ACCOUNT: { label: 'Bank Account', icon: '🏦', color: 'purple' },
    IFSC_CODE: { label: 'IFSC Code', icon: '🔢', color: 'indigo' },
    URL: { label: 'URL', icon: '🔗', color: 'red' },
    EMAIL: { label: 'Email', icon: '📧', color: 'pink' },
    CRYPTO_WALLET: { label: 'Crypto Wallet', icon: '₿', color: 'orange' },
    SOCIAL_MEDIA: { label: 'Social Media', icon: '📲', color: 'cyan' },
} as const

// Polling intervals (in ms)
export const POLLING_INTERVALS = {
    ACTIVE_SESSION_MESSAGES: 3000,
    SESSIONS_LIST: 30000,
    DASHBOARD_STATS: 60000,
} as const

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const

// Date formats
export const DATE_FORMATS = {
    DISPLAY_DATE: 'MMM d, yyyy',
    DISPLAY_TIME: 'h:mm a',
    DISPLAY_DATETIME: 'MMM d, yyyy h:mm a',
    API_DATE: 'yyyy-MM-dd',
    API_DATETIME: "yyyy-MM-dd'T'HH:mm:ss'Z'",
} as const
