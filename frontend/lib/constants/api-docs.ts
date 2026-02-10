// Complete API endpoint documentation for the ScamShield API reference
export interface EndpointDoc {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    path: string
    title: string
    description: string
    parameters?: Array<{
        name: string
        type: string
        required: boolean
        description: string
        example?: string
    }>
    requestBody?: {
        description: string
        schema: Record<string, unknown>
        example: Record<string, unknown>
    }
    responses: {
        [code: string]: {
            description: string
            schema?: Record<string, unknown>
            example?: Record<string, unknown>
        }
    }
    examples: {
        curl: string
        python: string
        javascript: string
    }
}

export const API_ENDPOINTS_DOCS: Record<string, EndpointDoc> = {
    engage: {
        method: 'POST',
        path: '/api/v1/honeypot/engage',
        title: 'Engage Scammer',
        description:
            'Start a new honeypot session by processing an initial scammer message. The AI will analyze the message, detect the scam type, select an appropriate persona, and generate a realistic victim response.',
        requestBody: {
            description: 'Initial scammer message and optional configuration',
            schema: {
                type: 'object',
                properties: {
                    scammer_message: { type: 'string', description: 'The scammer message to respond to' },
                    persona: { type: 'string', description: 'Specific persona to use (optional)' },
                },
                required: ['scammer_message'],
            },
            example: {
                scammer_message:
                    'Dear Customer, Your SBI account has been suspended due to incomplete KYC. Update immediately.',
                persona: 'elderly_victim',
            },
        },
        responses: {
            '200': {
                description: 'Session created successfully',
                example: {
                    session_id: 'sess_abc123',
                    response: 'Oh my! My SBI account is suspended? What should I do?',
                    persona_used: 'elderly_victim',
                    scam_type: 'KYC_FRAUD',
                    confidence: 0.92,
                    extracted_intelligence: { phone_numbers: [], upi_ids: [], bank_accounts: [], phishing_links: [] },
                    session_status: 'ACTIVE',
                    turn_number: 1,
                },
            },
            '400': { description: 'Invalid request body' },
            '500': { description: 'Internal server error' },
        },
        examples: {
            curl: `curl -X POST https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage \\
  -H "Content-Type: application/json" \\
  -d '{
    "scammer_message": "Your SBI account has been suspended...",
    "persona": "elderly_victim"
  }'`,
            python: `import requests

response = requests.post(
    "https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage",
    json={
        "scammer_message": "Your SBI account has been suspended...",
        "persona": "elderly_victim"
    }
)
print(response.json())`,
            javascript: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scammer_message: 'Your SBI account has been suspended...',
      persona: 'elderly_victim'
    })
  }
);
const data = await response.json();`,
        },
    },
    continue: {
        method: 'POST',
        path: '/api/v1/honeypot/continue',
        title: 'Continue Conversation',
        description:
            'Continue an existing session by sending the next scammer message. The AI maintains conversation context and continues extracting intelligence.',
        requestBody: {
            description: 'Session ID and follow-up scammer message',
            schema: {
                type: 'object',
                properties: {
                    session_id: { type: 'string' },
                    scammer_message: { type: 'string' },
                },
                required: ['session_id', 'scammer_message'],
            },
            example: {
                session_id: 'sess_abc123',
                scammer_message: 'Please share your account number and OTP for verification.',
            },
        },
        responses: {
            '200': {
                description: 'Conversation continued successfully',
                example: {
                    session_id: 'sess_abc123',
                    response: 'My account number? Let me check... it starts with 1234...',
                    persona_used: 'elderly_victim',
                    scam_type: 'KYC_FRAUD',
                    confidence: 0.95,
                    extracted_intelligence: { phone_numbers: [], upi_ids: [], bank_accounts: [], phishing_links: [] },
                    session_status: 'ACTIVE',
                    turn_number: 2,
                },
            },
            '404': { description: 'Session not found' },
            '500': { description: 'Internal server error' },
        },
        examples: {
            curl: `curl -X POST https://scamshield-honeypot.onrender.com/api/v1/honeypot/continue \\
  -H "Content-Type: application/json" \\
  -d '{
    "session_id": "sess_abc123",
    "scammer_message": "Please share your account number and OTP"
  }'`,
            python: `import requests

response = requests.post(
    "https://scamshield-honeypot.onrender.com/api/v1/honeypot/continue",
    json={
        "session_id": "sess_abc123",
        "scammer_message": "Please share your account number and OTP"
    }
)
print(response.json())`,
            javascript: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/honeypot/continue',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: 'sess_abc123',
      scammer_message: 'Please share your account number and OTP'
    })
  }
);
const data = await response.json();`,
        },
    },
    session: {
        method: 'GET',
        path: '/api/v1/honeypot/session/{session_id}',
        title: 'Get Session Details',
        description: 'Retrieve complete details of a specific session including all messages and extracted intelligence.',
        parameters: [
            { name: 'session_id', type: 'string', required: true, description: 'Session ID', example: 'sess_abc123' },
        ],
        responses: {
            '200': {
                description: 'Session details retrieved',
                example: {
                    session_id: 'sess_abc123',
                    status: 'ACTIVE',
                    scam_type: 'KYC_FRAUD',
                    persona_used: 'elderly_victim',
                    turn_count: 3,
                    created_at: '2026-02-10T08:00:00Z',
                    messages: [],
                    extracted_intelligence: {},
                },
            },
            '404': { description: 'Session not found' },
        },
        examples: {
            curl: `curl https://scamshield-honeypot.onrender.com/api/v1/honeypot/session/sess_abc123`,
            python: `import requests
response = requests.get(
    "https://scamshield-honeypot.onrender.com/api/v1/honeypot/session/sess_abc123"
)
print(response.json())`,
            javascript: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/honeypot/session/sess_abc123'
);
const data = await response.json();`,
        },
    },
    'delete-session': {
        method: 'DELETE',
        path: '/api/v1/honeypot/session/{session_id}',
        title: 'Delete Session',
        description: 'Delete a specific session and all associated data.',
        parameters: [
            { name: 'session_id', type: 'string', required: true, description: 'Session ID to delete' },
        ],
        responses: {
            '200': { description: 'Session deleted', example: { message: 'Session deleted successfully' } },
            '404': { description: 'Session not found' },
        },
        examples: {
            curl: `curl -X DELETE https://scamshield-honeypot.onrender.com/api/v1/honeypot/session/sess_abc123`,
            python: `import requests
response = requests.delete(
    "https://scamshield-honeypot.onrender.com/api/v1/honeypot/session/sess_abc123"
)
print(response.json())`,
            javascript: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/honeypot/session/sess_abc123',
  { method: 'DELETE' }
);
const data = await response.json();`,
        },
    },
    'list-sessions': {
        method: 'GET',
        path: '/api/v1/sessions',
        title: 'List All Sessions',
        description: 'Retrieve all sessions with optional filtering and pagination.',
        parameters: [
            { name: 'skip', type: 'integer', required: false, description: 'Number of records to skip', example: '0' },
            { name: 'limit', type: 'integer', required: false, description: 'Max records to return', example: '20' },
            { name: 'status', type: 'string', required: false, description: 'Filter by status' },
        ],
        responses: {
            '200': {
                description: 'Sessions list',
                example: { sessions: [], total: 0, skip: 0, limit: 20 },
            },
        },
        examples: {
            curl: `curl "https://scamshield-honeypot.onrender.com/api/v1/sessions?limit=20"`,
            python: `import requests
response = requests.get(
    "https://scamshield-honeypot.onrender.com/api/v1/sessions",
    params={"limit": 20}
)
print(response.json())`,
            javascript: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/sessions?limit=20'
);
const data = await response.json();`,
        },
    },
    'session-intelligence': {
        method: 'GET',
        path: '/api/v1/sessions/{session_id}/intelligence',
        title: 'Get Session Intelligence',
        description: 'Retrieve all extracted intelligence for a specific session.',
        parameters: [
            { name: 'session_id', type: 'string', required: true, description: 'Session ID' },
        ],
        responses: {
            '200': {
                description: 'Intelligence data',
                example: { session_id: 'sess_abc123', entities: [], scam_indicators: [] },
            },
        },
        examples: {
            curl: `curl https://scamshield-honeypot.onrender.com/api/v1/sessions/sess_abc123/intelligence`,
            python: `import requests
response = requests.get(
    "https://scamshield-honeypot.onrender.com/api/v1/sessions/sess_abc123/intelligence"
)`,
            javascript: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/sessions/sess_abc123/intelligence'
);`,
        },
    },
    'list-intelligence': {
        method: 'GET',
        path: '/api/v1/intelligence',
        title: 'List All Intelligence',
        description: 'Retrieve all extracted entities across all sessions.',
        parameters: [
            { name: 'entity_type', type: 'string', required: false, description: 'Filter by entity type' },
            { name: 'limit', type: 'integer', required: false, description: 'Max records', example: '50' },
        ],
        responses: {
            '200': { description: 'Intelligence list', example: { entities: [], total: 0 } },
        },
        examples: {
            curl: `curl "https://scamshield-honeypot.onrender.com/api/v1/intelligence?limit=50"`,
            python: `import requests
response = requests.get("https://scamshield-honeypot.onrender.com/api/v1/intelligence")`,
            javascript: `const response = await fetch('https://scamshield-honeypot.onrender.com/api/v1/intelligence');`,
        },
    },
    'analytics-summary': {
        method: 'GET',
        path: '/api/v1/analytics/summary',
        title: 'Analytics Summary',
        description: 'Get aggregated analytics including session counts, entity stats, and scam type distribution.',
        responses: {
            '200': {
                description: 'Analytics summary',
                example: {
                    total_sessions: 156,
                    active_sessions: 3,
                    total_entities: 423,
                    detection_rate: 94.2,
                    scam_types: {},
                },
            },
        },
        examples: {
            curl: `curl https://scamshield-honeypot.onrender.com/api/v1/analytics/summary`,
            python: `import requests
response = requests.get("https://scamshield-honeypot.onrender.com/api/v1/analytics/summary")`,
            javascript: `const response = await fetch('https://scamshield-honeypot.onrender.com/api/v1/analytics/summary');`,
        },
    },
    'scam-types': {
        method: 'GET',
        path: '/api/v1/analytics/scam-types',
        title: 'Scam Type Distribution',
        description: 'Get distribution of detected scam types.',
        responses: {
            '200': { description: 'Scam type stats', example: { types: [] } },
        },
        examples: {
            curl: `curl https://scamshield-honeypot.onrender.com/api/v1/analytics/scam-types`,
            python: `import requests
response = requests.get("https://scamshield-honeypot.onrender.com/api/v1/analytics/scam-types")`,
            javascript: `const response = await fetch('https://scamshield-honeypot.onrender.com/api/v1/analytics/scam-types');`,
        },
    },
    timeline: {
        method: 'GET',
        path: '/api/v1/analytics/timeline',
        title: 'Activity Timeline',
        description: 'Get session activity over time for charting.',
        parameters: [
            { name: 'days', type: 'integer', required: false, description: 'Number of days', example: '30' },
        ],
        responses: {
            '200': { description: 'Timeline data', example: { data: [] } },
        },
        examples: {
            curl: `curl "https://scamshield-honeypot.onrender.com/api/v1/analytics/timeline?days=30"`,
            python: `import requests
response = requests.get("https://scamshield-honeypot.onrender.com/api/v1/analytics/timeline", params={"days": 30})`,
            javascript: `const response = await fetch('https://scamshield-honeypot.onrender.com/api/v1/analytics/timeline?days=30');`,
        },
    },
    health: {
        method: 'GET',
        path: '/api/v1/health',
        title: 'Health Check',
        description: 'Basic health check endpoint.',
        responses: {
            '200': { description: 'System healthy', example: { status: 'healthy', timestamp: '2026-02-10T08:00:00Z' } },
        },
        examples: {
            curl: `curl https://scamshield-honeypot.onrender.com/api/v1/health`,
            python: `import requests
response = requests.get("https://scamshield-honeypot.onrender.com/api/v1/health")`,
            javascript: `const response = await fetch('https://scamshield-honeypot.onrender.com/api/v1/health');`,
        },
    },
    'health-detailed': {
        method: 'GET',
        path: '/api/v1/health/detailed',
        title: 'Detailed Health Check',
        description: 'Detailed health check with component statuses.',
        responses: {
            '200': {
                description: 'Detailed health',
                example: {
                    status: 'healthy',
                    components: { database: 'healthy', llm: 'healthy', cache: 'healthy' },
                    uptime: 99.9,
                },
            },
        },
        examples: {
            curl: `curl https://scamshield-honeypot.onrender.com/api/v1/health/detailed`,
            python: `import requests
response = requests.get("https://scamshield-honeypot.onrender.com/api/v1/health/detailed")`,
            javascript: `const response = await fetch('https://scamshield-honeypot.onrender.com/api/v1/health/detailed');`,
        },
    },
}
