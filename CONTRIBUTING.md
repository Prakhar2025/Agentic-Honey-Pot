# Contributing to ScamShield

Thank you for your interest in contributing to ScamShield! This document provides guidelines and instructions for contributing. 🙌

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- Git

### Setting Up Development Environment

```bash
# Clone the repository
git clone https://github.com/Prakhar2025/Agentic-Honey-Pot.git
cd Agentic-Honey-Pot

# Switch to develop branch
git checkout develop

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup (in another terminal)
cd app
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📋 Development Workflow

1. **Create a branch** from `develop`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following code standards

3. **Test locally**:
   ```bash
   cd frontend && npm run build
   ```

4. **Commit** with conventional commits:
   ```bash
   git commit -m "feat: add new scam type detection"
   ```

5. **Push** and create a PR to `develop`

## 📐 Code Standards

### TypeScript / React
- Use TypeScript for all frontend code
- Follow existing component patterns
- Use `shadcn/ui` components where possible
- Write `'use client'` directive for interactive components
- Use `cn()` for conditional class names

### Python / FastAPI
- Follow PEP 8
- Type annotations on all function signatures
- Docstrings for public functions

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `style:` — Formatting
- `refactor:` — Code refactoring
- `test:` — Tests
- `chore:` — Maintenance

## 🏗️ Branch Strategy

- `main` — Production (deployed)
- `develop` — Development (active work)
- `feature/*` — Feature branches (from develop)
- `fix/*` — Bug fix branches (from develop)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
