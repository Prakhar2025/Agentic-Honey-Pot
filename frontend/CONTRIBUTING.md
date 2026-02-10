# Contributing to ScamShield

Thank you for your interest in contributing to ScamShield! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 20+ installed
- Git installed
- Familiarity with Next.js, TypeScript, and React

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/scamshield.git
   cd scamshield/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:3000`

## Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates

### Creating a Feature

1. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, maintainable code
   - Follow existing code style
   - Add tests for new functionality

3. **Run Tests**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for objects, types for unions/primitives

```typescript
// Good
interface User {
    id: string
    name: string
    email: string
}

// Avoid
const user: any = { ... }
```

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and small

```tsx
// Good
export function MyComponent({ title }: { title: string }) {
    const [state, setState] = useState(false)
    
    return <div>{title}</div>
}

// File naming: my-component.tsx
```

### File Organization

```
components/
├── ui/              # Reusable UI components (shadcn)
├── docs/            # Documentation-specific components
├── marketing/       # Marketing page components
└── settings/        # Settings page components

app/
├── (dashboard)/     # Dashboard routes
├── (marketing)/     # Marketing routes
└── api/            # API routes

lib/
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
└── constants/      # Constants and configurations
```

### Code Style

- Use Prettier for formatting
- Use ESLint for linting
- Follow Airbnb style guide conventions

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(docs): add API playground component

fix(settings): resolve theme switcher state issue

docs(readme): update installation instructions

style(dashboard): format analytics page

refactor(api): simplify error handling logic

test(components): add tests for profile form

chore(deps): update dependencies
```

## Testing

### Unit Tests

```bash
# Run tests
npm run test

# Watch mode
npm run test:ui

# Coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Interactive mode
npm run test:e2e:ui
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
    it('renders correctly', () => {
        render(<MyComponent title="Hello" />)
        expect(screen.getByText('Hello')).toBeInTheDocument()
    })
})
```

## Pull Request Process

1. **Update Documentation**
   - Update README if needed
   - Add/update JSDoc comments
   - Update CHANGELOG.md

2. **Ensure Quality**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```

3. **Create PR**
   - Clear, descriptive title
   - Reference related issues
   - Describe changes made
   - Add screenshots for UI changes

4. **Code Review**
   - Respond to feedback promptly
   - Make requested changes
   - Keep discussion professional

5. **Merge**
   - Squash commits when merging
   - Delete branch after merge

## PR Template

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
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

## Reporting Bugs

### Before Submitting

1. Check existing issues
2. Verify it's actually a bug
3. Determine which repository it relates to

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
 - OS: [e.g., Windows, macOS, Linux]
 - Browser: [e.g., Chrome, Safari]
 - Version: [e.g., 22]

**Additional context**
Any other relevant information
```

## Feature Requests

### Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of proposed solution

**Describe alternatives considered**
Alternative solutions or features

**Additional context**
Screenshots, mockups, examples
```

## Documentation

- Write clear, concise documentation
- Include code examples
- Update README for user-facing changes
- Add JSDoc comments for functions/components

```typescript
/**
 * Fetches session data from the API
 * @param sessionId - The unique session identifier
 * @returns Promise resolving to session data
 * @throws {Error} If session not found
 */
async function getSession(sessionId: string): Promise<Session> {
    // implementation
}
```

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in commit history

## Questions?

- Check documentation
- Search existing issues
- Ask in discussions
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to ScamShield! 🛡️
