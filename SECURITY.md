# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability, please **DO NOT** open a public issue.

### ⛔ Do NOT Report Publicly
- Do not create GitHub issues for security vulnerabilities.
- Do not post on public forums or social media.

### ✅ How to Report
Please email our security team at **security@scamshield.in** with:
1. **Subject**: Security Vulnerability: [Component Name]
2. **Body**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Proof of Concept (optional but helpful)

We will acknowledge your report within **24 hours**.

## Security Features

ScamShield implements several security measures:
- **API Key Authentication**: All sensitive endpoints are protected via `X-API-Key`.
- **Input Sanitization**: Pydantic validators prevent injection attacks.
- **Rate Limiting**: Configured to prevent abuse (mock implementation provided).
- **Environment Isolation**: Sensitive keys (`GROQ_API_KEY`) are never committed to code.

## Critical Warnings

- **Never** use real personal data when testing the honeypot.
- **Never** expose your `.env` file or `GROQ_API_KEY`.
- **Never** deploy to production with `debug=True`.

Thank you for helping keep ScamShield safe!
