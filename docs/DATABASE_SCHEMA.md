<![CDATA[# 🗄️ Database Schema

<div align="center">

![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.25-orange?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-Async-blue?style=for-the-badge)

**Complete Database Documentation**

</div>

---

## 📊 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATABASE SCHEMA                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐       ┌──────────────────┐                    │
│  │     sessions     │       │     messages     │                    │
│  ├──────────────────┤       ├──────────────────┤                    │
│  │ id (PK)          │───┐   │ id (PK)          │                    │
│  │ scam_type        │   │   │ session_id (FK)  │◄──┐                │
│  │ persona_id       │   │   │ role             │   │                │
│  │ status           │   │   │ content          │   │                │
│  │ is_scam          │   │   │ turn_number      │   │                │
│  │ source_type      │   │   │ metadata_json    │   │                │
│  │ turn_count       │   │   │ created_at       │   │                │
│  │ metadata_json    │   │   └──────────────────┘   │                │
│  │ started_at       │   │                          │                │
│  │ ended_at         │   └──────────────────────────┘                │
│  │ created_at       │                                                │
│  │ updated_at       │   ┌──────────────────────────┐                │
│  └──────────────────┘   │  extracted_intelligence  │                │
│           │             ├──────────────────────────┤                │
│           │             │ id (PK)                  │                │
│           └─────────────│ session_id (FK)          │                │
│                         │ bank_accounts_json       │                │
│                         │ upi_ids_json             │                │
│                         │ phone_numbers_json       │                │
│                         │ phishing_links_json      │                │
│                         │ other_intel_json         │                │
│                         │ created_at               │                │
│                         │ updated_at               │                │
│                         └──────────────────────────┘                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Tables

### sessions

Stores honeypot conversation sessions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | VARCHAR(36) | No | UUID | Primary key |
| `scam_type` | VARCHAR(50) | Yes | NULL | Detected scam type |
| `persona_id` | VARCHAR(50) | No | 'elderly_victim' | Active persona |
| `status` | VARCHAR(20) | No | 'ONGOING' | Session status |
| `is_scam` | BOOLEAN | No | true | Scam confirmed |
| `source_type` | VARCHAR(20) | Yes | NULL | Message source |
| `turn_count` | INTEGER | No | 0 | Message turns |
| `metadata_json` | JSON | Yes | NULL | Extra metadata |
| `started_at` | TIMESTAMP | No | NOW | Session start |
| `ended_at` | TIMESTAMP | Yes | NULL | Session end |
| `created_at` | TIMESTAMP | No | NOW | Record created |
| `updated_at` | TIMESTAMP | No | NOW | Last updated |

**Status Values:**
- `INITIAL` - Session created
- `ONGOING` - Active conversation
- `COMPLETED` - Successfully concluded
- `TERMINATED` - Scammer stopped responding
- `MAX_TURNS_REACHED` - Turn limit hit
- `SAFETY_EXIT` - Safety boundary triggered

**Indexes:**
- `ix_sessions_status` on `status`
- `ix_sessions_scam_type` on `scam_type`
- `ix_sessions_created_at` on `created_at`

---

### messages

Stores individual messages in conversations.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | VARCHAR(36) | No | UUID | Primary key |
| `session_id` | VARCHAR(36) | No | - | FK to sessions |
| `role` | VARCHAR(20) | No | - | 'scammer' or 'agent' |
| `content` | TEXT | No | - | Message content |
| `turn_number` | INTEGER | No | - | Turn sequence |
| `metadata_json` | JSON | Yes | NULL | Extra metadata |
| `created_at` | TIMESTAMP | No | NOW | Message time |

**Indexes:**
- `ix_messages_session_id` on `session_id`
- `ix_messages_turn_number` on `turn_number`

**Foreign Key:**
- `session_id` → `sessions.id` (CASCADE DELETE)

---

### extracted_intelligence

Stores extracted scammer information.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | VARCHAR(36) | No | UUID | Primary key |
| `session_id` | VARCHAR(36) | No | - | FK to sessions |
| `bank_accounts_json` | JSON | Yes | '[]' | Bank accounts |
| `upi_ids_json` | JSON | Yes | '[]' | UPI IDs |
| `phone_numbers_json` | JSON | Yes | '[]' | Phone numbers |
| `phishing_links_json` | JSON | Yes | '[]' | Phishing URLs |
| `other_intel_json` | JSON | Yes | '[]' | Other entities |
| `created_at` | TIMESTAMP | No | NOW | Record created |
| `updated_at` | TIMESTAMP | No | NOW | Last updated |

**JSON Structure Example:**
```json
{
  "bank_accounts_json": [
    {
      "account_number": "50100123456789",
      "ifsc_code": "HDFC0001234",
      "bank_name": "HDFC Bank",
      "confidence": 0.95,
      "extracted_at": "2026-02-04T10:00:00Z"
    }
  ],
  "upi_ids_json": [
    {
      "id": "scammer@ybl",
      "confidence": 0.98,
      "extracted_at": "2026-02-04T10:00:00Z"
    }
  ]
}
```

**Foreign Key:**
- `session_id` → `sessions.id` (CASCADE DELETE)

---

## 🔗 Relationships

```
sessions (1) ←──── (N) messages
    │
    └──── (1) extracted_intelligence
```

- One session has many messages
- One session has one intelligence record
- Deleting a session cascades to messages and intelligence

---

## 📝 SQLAlchemy Models

### Session Model

```python
class SessionModel(Base):
    __tablename__ = "sessions"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    scam_type = Column(String(50), nullable=True)
    persona_id = Column(String(50), nullable=False, default="elderly_victim")
    status = Column(String(20), nullable=False, default="ONGOING")
    is_scam = Column(Boolean, nullable=False, default=True)
    source_type = Column(String(20), nullable=True)
    turn_count = Column(Integer, nullable=False, default=0)
    metadata_json = Column(JSON, nullable=True)
    started_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    messages = relationship("MessageModel", back_populates="session", cascade="all, delete")
    intelligence = relationship("IntelligenceModel", back_populates="session", uselist=False, cascade="all, delete")
```

---

## 🔄 Migration Strategy

### Current: Auto-create
```python
# app/db/database.py
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
```

### Future: Alembic (Planned)
```bash
# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Add new column"

# Apply migration
alembic upgrade head
```

---

## 💾 Backup Procedures

### SQLite Backup
```bash
# Copy database file
cp honeypot.db honeypot_backup_$(date +%Y%m%d).db

# Export to SQL
sqlite3 honeypot.db .dump > backup.sql
```

### Restore
```bash
sqlite3 honeypot_restored.db < backup.sql
```

---

## 🔗 Related Documentation

- [Backend Development](./BACKEND_DEVELOPMENT.md)
- [API Reference](./API_REFERENCE.md)
]]>
