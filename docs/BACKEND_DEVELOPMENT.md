<![CDATA[# 💻 Backend Development Guide

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?style=for-the-badge&logo=fastapi)

**Complete Guide to Backend Development**

</div>

---

## 📋 Prerequisites

| Requirement | Version | Installation |
|-------------|---------|--------------|
| Python | 3.11+ | [python.org](https://python.org) |
| pip | Latest | Comes with Python |
| Git | Latest | [git-scm.com](https://git-scm.com) |
| Groq API Key | Free tier | [console.groq.com](https://console.groq.com) |

---

## 🚀 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Prakhar2025/Agentic-Honey-Pot.git
cd Agentic-Honey-Pot
```

### 2. Create Virtual Environment

```bash
# Create venv
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file
notepad .env  # Windows
nano .env     # Linux/macOS
```

Required environment variables:
```env
# LLM Configuration (Required)
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Security (Required for production)
API_KEY=your_secure_api_key_here

# Database (Optional - defaults to SQLite)
DATABASE_URL=sqlite+aiosqlite:///./honeypot.db

# Environment
ENVIRONMENT=development
DEBUG=true
```

### 5. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Access points:
- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📁 Project Structure

```
app/
├── main.py                    # FastAPI application entry
├── config.py                  # Settings management
│
├── api/                       # API layer
│   ├── v1/
│   │   ├── router.py         # v1 router aggregator
│   │   ├── honeypot.py       # Core honeypot endpoints
│   │   ├── hackathon.py      # Hackathon-compliant endpoint
│   │   ├── sessions.py       # Session management
│   │   ├── analytics.py      # Analytics endpoints
│   │   └── health.py         # Health checks
│   └── debug.py              # Debug endpoints
│
├── agent/                     # Agentic AI core
│   ├── orchestrator.py       # Main conversation loop
│   ├── state_machine.py      # Conversation states
│   ├── decision_engine.py    # Continue/exit logic
│   └── safety.py             # Safety boundaries
│
├── personas/                  # Victim personas
│   ├── base.py               # Base persona class
│   ├── elderly_victim.py     # Confused grandparent
│   ├── tech_novice.py        # Overwhelmed user
│   ├── eager_investor.py     # Greedy target
│   ├── busy_professional.py  # Distracted worker
│   └── helpful_auntie.py     # Chatty oversharer
│
├── intelligence/              # Entity extraction
│   ├── extractor.py          # Main extraction logic
│   ├── patterns.py           # Regex patterns
│   ├── validators.py         # Entity validators
│   └── aggregator.py         # Intelligence merger
│
├── scam_detection/            # Scam classification
│   ├── detector.py           # Scam type detection
│   └── classifier.py         # ML-based classification
│
├── services/                  # External services
│   ├── groq_client.py        # Groq LLM client
│   └── guvi_callback.py      # Hackathon callback
│
├── db/                        # Database layer
│   ├── database.py           # Async engine setup
│   ├── models.py             # SQLAlchemy models
│   └── repositories/         # Data access
│       ├── base.py           # Base repository
│       ├── sessions.py       # Session repo
│       ├── messages.py       # Message repo
│       └── intelligence.py   # Intelligence repo
│
├── middleware/                # HTTP middleware
│   └── auth.py               # API key authentication
│
└── models/                    # Pydantic schemas
    ├── requests.py           # Request models
    └── responses.py          # Response models
```

---

## 🔧 Code Conventions

### Python Style
- **Formatter**: Black (line length 88)
- **Linter**: Ruff
- **Type Hints**: Required for all functions
- **Docstrings**: Google style

### Example Function

```python
async def process_message(
    session_id: str,
    message: str,
    persona: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Process an incoming scam message.
    
    Args:
        session_id: Unique session identifier.
        message: Scam message content.
        persona: Optional persona override.
    
    Returns:
        Dict containing response, extracted entities,
        and conversation metadata.
    
    Raises:
        ValueError: If session_id is invalid.
        LLMError: If LLM call fails.
    """
    # Implementation
    pass
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Variables | snake_case | `session_id` |
| Functions | snake_case | `get_session()` |
| Classes | PascalCase | `SessionRepository` |
| Constants | UPPER_SNAKE | `MAX_TURNS` |
| Files | snake_case | `groq_client.py` |

---

## ➕ Adding New Endpoints

### Step 1: Define Route

```python
# app/api/v1/my_endpoint.py
from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter(prefix="/custom", tags=["Custom"])

class MyRequest(BaseModel):
    data: str

class MyResponse(BaseModel):
    result: str

@router.post("/action", response_model=MyResponse)
async def my_action(request: MyRequest) -> MyResponse:
    """Custom action endpoint."""
    return MyResponse(result=f"Processed: {request.data}")
```

### Step 2: Register Router

```python
# app/api/v1/router.py
from app.api.v1.my_endpoint import router as custom_router

router.include_router(custom_router)
```

---

## 🎭 Adding New Personas

### Step 1: Create Persona File

```python
# app/personas/scared_student.py
from app.personas.base import BasePersona

class ScaredStudent(BasePersona):
    """A nervous college student afraid of trouble."""
    
    id = "scared_student"
    name = "Scared Student"
    description = "Anxious student worried about getting in trouble"
    
    system_prompt = """
    You are a nervous 19-year-old college student.
    - You're scared of authority figures
    - You panic easily and ask many questions
    - You're afraid of getting your parents involved
    - You want to resolve things quickly
    """
    
    response_patterns = [
        "Oh no, am I in trouble?",
        "Please don't tell my parents!",
        "I'll do anything, just tell me what to do...",
    ]
```

### Step 2: Register Persona

```python
# app/personas/__init__.py
from app.personas.scared_student import ScaredStudent

PERSONAS = {
    # existing personas...
    "scared_student": ScaredStudent(),
}
```

---

## 🔍 Adding New Scam Types

### Step 1: Add to Enum

```python
# app/scam_detection/classifier.py
class ScamType(str, Enum):
    # existing types...
    ROMANCE_SCAM = "ROMANCE_SCAM"
```

### Step 2: Add Detection Patterns

```python
# app/scam_detection/detector.py
SCAM_PATTERNS = {
    # existing patterns...
    ScamType.ROMANCE_SCAM: [
        r"i love you",
        r"send money for visa",
        r"stranded abroad",
        r"need help urgently",
    ],
}
```

---

## 🧪 Testing

### Run All Tests
```bash
pytest tests/ -v
```

### Run Specific Test
```bash
pytest tests/test_honeypot.py::test_engage -v
```

### Run with Coverage
```bash
pytest tests/ --cov=app --cov-report=html
```

### Test Scenarios
```bash
python scripts/test_with_scenarios.py
```

---

## 🐛 Debugging Tips

### Enable Debug Logging
```python
# app/config.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Use Debug Endpoint
```bash
curl -X POST "http://localhost:8000/v1/debug/echo" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Check LLM Responses
```python
# Temporarily log LLM output
logger.debug(f"LLM Response: {response}")
```

---

## 🔗 Related Documentation

- [API Reference](./API_REFERENCE.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Testing Guide](./TESTING.md)
]]>
