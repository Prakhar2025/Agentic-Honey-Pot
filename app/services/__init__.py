"""
External Services - Third-party API integrations.

This package provides clients for external services:
- GroqClient: Async client for Groq LLM API
- Response caching service (future)

Usage:
    from app.services import GroqLLMClient, get_llm_client, LLMError
    
    client = get_llm_client()
    response = await client.generate_response(
        system_prompt="You are a helpful assistant",
        user_message="Hello!",
        history=[]
    )
"""

from app.services.groq_client import (
    GroqLLMClient,
    LLMError,
    LLMResponse,
    get_llm_client,
)

__all__ = [
    "GroqLLMClient",
    "LLMError",
    "LLMResponse",
    "get_llm_client",
]
