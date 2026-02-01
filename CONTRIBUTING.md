# Contributing to ScamShield

Thank you for your interest in contributing to ScamShield! We welcome contributions from the community to help us build a safer digital environment for everyone.

## 🌟 Our Philosophy

We believe in:
- **Quality**: Code should be clean, well-tested, and documented.
- **Safety**: Security is paramount. Never expose real victim data.
- **Ethics**: We target scammers, but we operate within legal boundaries.

## 🛠️ Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/scamshield-honeypot.git
   cd scamshield-honeypot
   ```

2. **Environment Setup**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   ```

3. **Running Requirements**
   - Python 3.11+
   - Groq Cloud Account (for LLM)
   - SQLite

## 📝 Pull Request Process

1. **Branch Naming**
   - Feature: `feat/add-new-persona`
   - Fix: `fix/api-key-validation`
   - Docs: `docs/update-readme`

2. **Code Style**
   - We use `ruff` for linting and formatting.
   - Run `pip install ruff` and then `ruff check .` before committing.
   - All public functions must have docstrings (Google style).

3. **Testing**
   - Run existing tests: `pytest`
   - Add new tests for your feature.
   - Ensure `scripts/test_with_scenarios.py` passes.

4. **Submission**
   - Create a Pull Request (PR) against the `main` branch.
   - Fill out the PR template completely.
   - Link any related issues.

## 🧪 Testing Guidelines

For this project, verification is key. Before submitting:
1. Run the scenario tester: `python scripts/test_with_scenarios.py 5`
2. Verify API key auth works: `python scripts/verify_production.py`

## 🤝 Community

Join our Discord [link] or open a Discussion on GitHub.

---

**Note:** This is an open-source project for the India AI Impact Buildathon.
