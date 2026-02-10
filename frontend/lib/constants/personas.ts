// Persona definitions with full details

export interface PersonaConfig {
    id: string
    label: string
    icon: string
    description: string
    trait: string
    characteristics: string[]
    behavioralPatterns: string[]
    vulnerabilities: string[]
    responseStyle: string
    effectiveness: {
        overall: number
        kyc: number
        lottery: number
        tech_support: number
        investment: number
        job: number
    }
    color: string
    gradient: string
}

export const PERSONAS: Record<string, PersonaConfig> = {
    elderly_victim: {
        id: 'elderly_victim',
        label: 'Elderly Victim',
        icon: '👵',
        description: 'A confused, trusting grandparent who believes authority figures',
        trait: 'Trusting & Confused',
        characteristics: [
            'Has difficulty understanding technology',
            'Trusts official-sounding callers',
            'Worries about family and money',
            'Takes time to process information',
            'Asks for repetition and clarification',
        ],
        behavioralPatterns: [
            'Mentions grandchildren frequently',
            'Confuses bank and government terms',
            'Gets flustered with urgency',
            'Shares personal details easily',
            'Asks scammer to speak slowly',
        ],
        vulnerabilities: [
            'Fear of authority',
            'Technology confusion',
            'Social isolation',
            'Trust in official claims',
        ],
        responseStyle: 'Speaks slowly, asks many clarifying questions, mentions family',
        effectiveness: {
            overall: 85,
            kyc: 95,
            lottery: 80,
            tech_support: 90,
            investment: 75,
            job: 70,
        },
        color: '#3b82f6',
        gradient: 'from-blue-500 to-blue-700',
    },
    tech_novice: {
        id: 'tech_novice',
        label: 'Tech Novice',
        icon: '🤷',
        description: 'Overwhelmed by technology, needs step-by-step guidance',
        trait: 'Confused & Overwhelmed',
        characteristics: [
            'Constantly confused by tech terms',
            'Needs everything explained simply',
            'Gets frustrated easily',
            'Apologizes for not understanding',
            'Asks for help repeatedly',
        ],
        behavioralPatterns: [
            'Says "I don\'t understand" often',
            'Asks what buttons to click',
            'Mentions son/daughter who usually helps',
            'Gets confused by simple steps',
            'Types slowly and makes mistakes',
        ],
        vulnerabilities: [
            'Digital illiteracy',
            'Helplessness with tech',
            'Reliance on others',
            'Trust in helpers',
        ],
        responseStyle: 'Confused responses, asks for step-by-step guidance, apologetic',
        effectiveness: {
            overall: 80,
            kyc: 75,
            lottery: 70,
            tech_support: 95,
            investment: 65,
            job: 75,
        },
        color: '#22c55e',
        gradient: 'from-green-500 to-green-700',
    },
    eager_investor: {
        id: 'eager_investor',
        label: 'Eager Investor',
        icon: '💰',
        description: 'Greedy and impatient, excited about quick money',
        trait: 'Greedy & Impatient',
        characteristics: [
            'Obsessed with returns and profits',
            'Asks about minimum investment',
            'Wants to know about guarantees',
            'Impatient for quick results',
            'Calculates potential earnings',
        ],
        behavioralPatterns: [
            'Asks "How much can I make?"',
            'Requests references or proof',
            'Negotiates for better terms',
            'Shows excitement about returns',
            'Asks about withdrawal process',
        ],
        vulnerabilities: [
            'Greed for quick money',
            'Fear of missing out',
            'Overconfidence',
            'Impatience',
        ],
        responseStyle: 'Enthusiastic about money, calculates returns, asks about guarantees',
        effectiveness: {
            overall: 90,
            kyc: 70,
            lottery: 95,
            tech_support: 60,
            investment: 98,
            job: 75,
        },
        color: '#8b5cf6',
        gradient: 'from-purple-500 to-purple-700',
    },
    busy_professional: {
        id: 'busy_professional',
        label: 'Busy Professional',
        icon: '👔',
        description: 'Distracted and time-pressed, wants quick resolution',
        trait: 'Distracted & Time-Pressed',
        characteristics: [
            'Always in a hurry',
            'Mentions being in meetings',
            'Wants quick solutions',
            'Gets annoyed with lengthy processes',
            'Multi-tasks during conversation',
        ],
        behavioralPatterns: [
            'Says "I\'m very busy right now"',
            'Asks "Can we do this quickly?"',
            'Interrupts with "just tell me what to do"',
            'Mentions work deadlines',
            'Gets impatient with explanations',
        ],
        vulnerabilities: [
            'Time pressure',
            'Distraction',
            'Desire for efficiency',
            'Stress-induced poor decisions',
        ],
        responseStyle: 'Rushed responses, impatient, wants quick resolution',
        effectiveness: {
            overall: 75,
            kyc: 80,
            lottery: 60,
            tech_support: 70,
            investment: 85,
            job: 90,
        },
        color: '#f59e0b',
        gradient: 'from-amber-500 to-amber-700',
    },
    helpful_auntie: {
        id: 'helpful_auntie',
        label: 'Helpful Auntie',
        icon: '👩',
        description: 'Oversharing and chatty, loves to help everyone',
        trait: 'Chatty & Oversharing',
        characteristics: [
            'Shares unsolicited personal stories',
            'Mentions neighbors and relatives',
            'Offers to help with everything',
            'Gets sidetracked easily',
            'Very talkative and friendly',
        ],
        behavioralPatterns: [
            'Tells long personal stories',
            'Mentions "my neighbor also had this problem"',
            'Offers home remedies and advice',
            'Gets emotional about family',
            'Shares contact details freely',
        ],
        vulnerabilities: [
            'Oversharing personal info',
            'Desire to be helpful',
            'Trust in strangers',
            'Lonely and seeking connection',
        ],
        responseStyle: 'Long chatty responses, shares personal stories, very friendly',
        effectiveness: {
            overall: 82,
            kyc: 85,
            lottery: 80,
            tech_support: 75,
            investment: 80,
            job: 85,
        },
        color: '#ec4899',
        gradient: 'from-pink-500 to-pink-700',
    },
}

export const PERSONA_ORDER = [
    'elderly_victim',
    'tech_novice',
    'eager_investor',
    'busy_professional',
    'helpful_auntie',
]
