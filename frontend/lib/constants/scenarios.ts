// Test scenario definitions for scam simulation

export interface ScamScenario {
    id: string
    name: string
    description: string
    icon: string
    category: string
    scamType: string
    initialMessage: string
    suggestedPersona: string
    difficulty: 'easy' | 'medium' | 'hard'
    tags: string[]
    expectedEntities: string[]
}

export const QUICK_START_SCENARIOS: ScamScenario[] = [
    {
        id: 'kyc-bank',
        name: 'KYC Bank Fraud',
        description: 'Fake bank KYC verification request',
        icon: '🏦',
        category: 'Financial',
        scamType: 'KYC_FRAUD',
        initialMessage: 'Dear Customer, Your SBI account has been suspended due to incomplete KYC. Update immediately: http://sbi-kyc-update.com or call 9876543210',
        suggestedPersona: 'elderly_victim',
        difficulty: 'easy',
        tags: ['bank', 'kyc', 'urgent'],
        expectedEntities: ['URL', 'PHONE_NUMBER'],
    },
    {
        id: 'lottery-winner',
        name: 'Lottery Winner',
        description: 'Fake lottery prize notification',
        icon: '🎰',
        category: 'Prize Scam',
        scamType: 'LOTTERY_SCAM',
        initialMessage: 'CONGRATULATIONS! You have won ₹50,00,000 in the Google Lucky Draw! Pay ₹5000 processing fee to claim. UPI: lottery.winner@ybl',
        suggestedPersona: 'eager_investor',
        difficulty: 'easy',
        tags: ['lottery', 'prize', 'payment'],
        expectedEntities: ['UPI_ID'],
    },
    {
        id: 'tech-support',
        name: 'Tech Support Scam',
        description: 'Fake Microsoft support call',
        icon: '💻',
        category: 'Tech Support',
        scamType: 'TECH_SUPPORT',
        initialMessage: 'ALERT: This is Microsoft Security Team. Your computer has been compromised with virus. Please download TeamViewer and share code to fix immediately.',
        suggestedPersona: 'tech_novice',
        difficulty: 'medium',
        tags: ['microsoft', 'virus', 'remote'],
        expectedEntities: ['URL'],
    },
    {
        id: 'investment-scheme',
        name: 'Crypto Investment',
        description: 'Fake cryptocurrency investment scheme',
        icon: '📈',
        category: 'Investment',
        scamType: 'INVESTMENT_FRAUD',
        initialMessage: 'Earn ₹1 Lakh daily! Join our exclusive crypto trading group. Minimum investment ₹10,000. Guaranteed 300% returns. WhatsApp: 8765432109',
        suggestedPersona: 'eager_investor',
        difficulty: 'medium',
        tags: ['crypto', 'investment', 'returns'],
        expectedEntities: ['PHONE_NUMBER'],
    },
]

export const ALL_SCENARIOS: ScamScenario[] = [
    ...QUICK_START_SCENARIOS,
    {
        id: 'job-offer',
        name: 'Work From Home Job',
        description: 'Fake job offer requiring payment',
        icon: '💼',
        category: 'Employment',
        scamType: 'JOB_SCAM',
        initialMessage: 'Hi! Amazon is hiring work-from-home data entry operators. Salary ₹30,000/month. Registration fee ₹500 only. Apply now: http://amazon-jobs-india.in',
        suggestedPersona: 'busy_professional',
        difficulty: 'easy',
        tags: ['job', 'amazon', 'work-from-home'],
        expectedEntities: ['URL'],
    },
    {
        id: 'loan-offer',
        name: 'Instant Loan Offer',
        description: 'Fake instant loan approval',
        icon: '💰',
        category: 'Financial',
        scamType: 'LOAN_SCAM',
        initialMessage: 'Pre-approved loan ₹5 Lakhs! No documents needed. Low interest 2% only. Processing fee ₹2000. Transfer to: A/C 12345678901234 IFSC: SBIN0001234',
        suggestedPersona: 'helpful_auntie',
        difficulty: 'medium',
        tags: ['loan', 'instant', 'approval'],
        expectedEntities: ['BANK_ACCOUNT', 'IFSC_CODE'],
    },
    {
        id: 'otp-request',
        name: 'OTP Theft Attempt',
        description: 'Social engineering for OTP',
        icon: '🔐',
        category: 'Identity Theft',
        scamType: 'OTP_FRAUD',
        initialMessage: 'This is HDFC Bank. A suspicious transaction of ₹49,999 detected on your account. Share OTP received on your mobile to block the transaction.',
        suggestedPersona: 'elderly_victim',
        difficulty: 'hard',
        tags: ['otp', 'bank', 'transaction'],
        expectedEntities: [],
    },
    {
        id: 'electricity-bill',
        name: 'Electricity Bill Scam',
        description: 'Fake electricity disconnection threat',
        icon: '⚡',
        category: 'Utility',
        scamType: 'KYC_FRAUD',
        initialMessage: 'URGENT: Your electricity will be disconnected today due to pending bill ₹3,500. Pay immediately via UPI: electricity.dept@oksbi or your connection will be cut.',
        suggestedPersona: 'tech_novice',
        difficulty: 'easy',
        tags: ['electricity', 'bill', 'urgent'],
        expectedEntities: ['UPI_ID'],
    },
    {
        id: 'customs-parcel',
        name: 'Customs Parcel Scam',
        description: 'Fake customs clearance for parcel',
        icon: '📦',
        category: 'Customs',
        scamType: 'KYC_FRAUD',
        initialMessage: 'Your international parcel is held at customs. Pay clearance fee of ₹15,000 to avoid legal action. Contact: customs.india@gmail.com or call 7654321098',
        suggestedPersona: 'busy_professional',
        difficulty: 'medium',
        tags: ['customs', 'parcel', 'international'],
        expectedEntities: ['EMAIL', 'PHONE_NUMBER'],
    },
    {
        id: 'insurance-claim',
        name: 'Insurance Claim Fraud',
        description: 'Fake unclaimed insurance money',
        icon: '📋',
        category: 'Insurance',
        scamType: 'LOTTERY_SCAM',
        initialMessage: 'Dear Policyholder, Your LIC policy has matured with bonus of ₹8,50,000. To claim, provide bank details and pay ₹6,000 tax. Reply with your bank A/C number.',
        suggestedPersona: 'elderly_victim',
        difficulty: 'medium',
        tags: ['insurance', 'lic', 'maturity'],
        expectedEntities: ['BANK_ACCOUNT'],
    },
]

export const SCENARIO_CATEGORIES = [
    { id: 'all', label: 'All Scenarios', count: ALL_SCENARIOS.length },
    { id: 'financial', label: 'Financial', count: ALL_SCENARIOS.filter(s => s.category === 'Financial').length },
    { id: 'prize', label: 'Prize Scams', count: ALL_SCENARIOS.filter(s => s.category === 'Prize Scam').length },
    { id: 'tech', label: 'Tech Support', count: ALL_SCENARIOS.filter(s => s.category === 'Tech Support').length },
    { id: 'employment', label: 'Employment', count: ALL_SCENARIOS.filter(s => s.category === 'Employment').length },
    { id: 'identity', label: 'Identity Theft', count: ALL_SCENARIOS.filter(s => s.category === 'Identity Theft').length },
]
