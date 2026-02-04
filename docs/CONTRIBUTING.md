# 🤝 Contributing Guide

**Guidelines for Contributing to ScamShield**

Contributors Welcome!

---

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors must:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards others

---

## 🚀 How to Contribute

### 1. Fork the Repository

```bash
# Fork via GitHub UI, then clone
git clone https://github.com/YOUR_USERNAME/Agentic-Honey-Pot.git
cd Agentic-Honey-Pot
```

### 2. Create a Branch

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow code conventions
- Add tests for new features
- Update documentation

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new persona for tech-savvy target"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
# Create PR via GitHub UI
```

---

## 🌿 Branch Strategy

| Branch | Purpose | Protected |
|--------|---------|-----------|
| `main` | Production releases | ✅ Yes |
| `develop` | Development integration | ✅ Yes |
| `feature/*` | New features | No |
| `bugfix/*` | Bug fixes | No |
| `hotfix/*` | Urgent production fixes | No |

### Branch Naming

```
feature/add-voice-support
bugfix/fix-upi-extraction
hotfix/critical-security-patch
docs/update-api-reference
```

---

## 📝 Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructure |
| `test` | Adding tests |
| `chore` | Maintenance |

### Examples

```bash
feat(personas): add scared_student persona
fix(extractor): handle malformed UPI IDs
docs(api): update engage endpoint examples
test(detector): add lottery scam scenarios
refactor(orchestrator): simplify state machine
```

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project conventions
- [ ] Tests pass locally (`pytest`)
- [ ] Documentation updated
- [ ] Commit messages follow format
- [ ] No merge conflicts

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing done

## Checklist
- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks**: CI/CD runs tests
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address review comments
4. **Approval**: Get 1+ approvals
5. **Merge**: Maintainer merges to develop

---

## 🎨 Code Style

### Python

```python
# Use Black formatter (88 char line length)
black app/

# Use Ruff linter
ruff check app/

# Type hints required
def process(message: str) -> Dict[str, Any]:
    pass
```

### Documentation

```python
def extract_entities(message: str) -> List[Entity]:
    """
    Extract all entities from a message.
    
    Args:
        message: The raw message text to analyze.
    
    Returns:
        List of extracted Entity objects.
    
    Raises:
        ValueError: If message is empty.
    
    Example:
        >>> extract_entities("Call +91-9876543210")
        [Entity(type='phone', value='+91-9876543210')]
    """
```

---

## 📂 Issue Templates

### Bug Report

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11]
- Python: [e.g., 3.11.5]
- Version: [e.g., 1.0.0]

## Screenshots/Logs
If applicable
```

### Feature Request

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
Why this feature is needed

## Proposed Solution
How you envision it working

## Alternatives Considered
Other approaches you've thought of

## Additional Context
Any other information
```

---

## 🏆 Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page

---

## 📞 Getting Help

- **Discussions**: GitHub Discussions
- **Issues**: GitHub Issues
- **Email**: contribute@scamshield.example

---

## 🔗 Related Documentation

- [Backend Development](./BACKEND_DEVELOPMENT.md)
- [Testing Guide](./TESTING.md)
- [Security](./SECURITY.md)
