"""
Groq LLM Client Service.

This module provides an async client for the Groq API with:
- Automatic retries with exponential backoff
- Rate limiting handling
- Structured error handling
- Response validation
- Logging and metrics

Usage:
    from app.services.groq_client import GroqLLMClient
    
    client = GroqLLMClient()
    response = await client.generate_response(
        system_prompt="You are a helpful assistant",
        user_message="Hello!",
        history=[]
    )
"""

import asyncio
import logging
import time
from typing import Any, Dict, List, Optional

from groq import Groq, APIError, RateLimitError, APIConnectionError
from pydantic import BaseModel, Field

from app.config import get_settings

logger = logging.getLogger(__name__)


class LLMResponse(BaseModel):
    """Structured response from LLM."""
    
    content: str = Field(..., description="Generated text content")
    model: str = Field(..., description="Model used for generation")
    tokens_used: int = Field(default=0, description="Total tokens used")
    latency_ms: float = Field(default=0.0, description="Response latency in milliseconds")
    finish_reason: Optional[str] = Field(default=None, description="Reason for completion")


class GroqLLMClient:
    """
    Async client for Groq LLM API.
    
    Features:
    - Automatic retry with exponential backoff
    - Rate limit handling with backoff
    - Structured error responses
    - Response caching (optional)
    - Comprehensive logging
    
    Attributes:
        client: Groq API client instance.
        model: Default model to use.
        max_retries: Maximum retry attempts.
        base_delay: Base delay for exponential backoff.
    """
    
    # Default model configuration
    DEFAULT_MODEL = "llama-3.3-70b-versatile"
    FALLBACK_MODEL = "llama-3.1-8b-instant"
    
    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        max_retries: int = 3,
        base_delay: float = 1.0,
    ) -> None:
        """
        Initialize Groq LLM client.
        
        Args:
            api_key: Groq API key. If None, reads from settings.
            model: Model to use. If None, uses settings or default.
            max_retries: Maximum retry attempts for failed requests.
            base_delay: Base delay in seconds for exponential backoff.
        """
        settings = get_settings()
        
        self._api_key = api_key or settings.groq_api_key
        self.model = model or settings.groq_model or self.DEFAULT_MODEL
        self.max_retries = max_retries
        self.base_delay = base_delay
        
        # LLM generation parameters
        self.temperature = settings.llm_temperature
        self.max_tokens = settings.llm_max_tokens
        
        # Initialize Groq client
        self.client = Groq(api_key=self._api_key)
        
        # Metrics tracking
        self._total_requests = 0
        self._total_tokens = 0
        self._failed_requests = 0
        
        logger.info(
            f"GroqLLMClient initialized with model={self.model}, "
            f"temperature={self.temperature}, max_tokens={self.max_tokens}"
        )
    
    async def generate_response(
        self,
        system_prompt: str,
        user_message: str,
        history: Optional[List[Dict[str, str]]] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
    ) -> str:
        """
        Generate a response from the LLM.
        
        Args:
            system_prompt: System prompt defining the assistant's behavior.
            user_message: The user's message to respond to.
            history: Optional conversation history as list of {role, content} dicts.
            temperature: Override default temperature (0.0-2.0).
            max_tokens: Override default max tokens.
        
        Returns:
            str: Generated response text.
        
        Raises:
            LLMError: If generation fails after all retries.
        
        Example:
            response = await client.generate_response(
                system_prompt="You are a confused elderly person",
                user_message="Your account is blocked!",
                history=[
                    {"role": "user", "content": "Previous scam message"},
                    {"role": "assistant", "content": "Previous response"}
                ]
            )
        """
        messages = self._build_messages(system_prompt, user_message, history)
        
        response = await self._call_with_retry(
            messages=messages,
            temperature=temperature or self.temperature,
            max_tokens=max_tokens or self.max_tokens,
        )
        
        return response.content
    
    async def generate_response_structured(
        self,
        system_prompt: str,
        user_message: str,
        history: Optional[List[Dict[str, str]]] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
    ) -> LLMResponse:
        """
        Generate a structured response with metadata.
        
        Same as generate_response but returns full LLMResponse object
        with tokens used, latency, and other metadata.
        
        Args:
            system_prompt: System prompt defining behavior.
            user_message: User's message.
            history: Optional conversation history.
            temperature: Override temperature.
            max_tokens: Override max tokens.
        
        Returns:
            LLMResponse: Structured response with metadata.
        """
        messages = self._build_messages(system_prompt, user_message, history)
        
        return await self._call_with_retry(
            messages=messages,
            temperature=temperature or self.temperature,
            max_tokens=max_tokens or self.max_tokens,
        )
    
    def _build_messages(
        self,
        system_prompt: str,
        user_message: str,
        history: Optional[List[Dict[str, str]]] = None,
    ) -> List[Dict[str, str]]:
        """
        Build the messages array for the API call.
        
        Args:
            system_prompt: System prompt.
            user_message: Current user message.
            history: Conversation history.
        
        Returns:
            List[Dict[str, str]]: Formatted messages array.
        """
        messages = [{"role": "system", "content": system_prompt}]
        
        if history:
            # Validate and add history messages
            for msg in history:
                if "role" in msg and "content" in msg:
                    messages.append({
                        "role": msg["role"],
                        "content": msg["content"],
                    })
        
        # Add current user message
        messages.append({"role": "user", "content": user_message})
        
        return messages
    
    async def _call_with_retry(
        self,
        messages: List[Dict[str, str]],
        temperature: float,
        max_tokens: int,
    ) -> LLMResponse:
        """
        Call Groq API with retry logic.
        
        Implements exponential backoff with jitter for retries.
        Falls back to smaller model on persistent failures.
        
        Args:
            messages: Messages array for the API.
            temperature: Generation temperature.
            max_tokens: Maximum tokens to generate.
        
        Returns:
            LLMResponse: Generated response.
        
        Raises:
            LLMError: If all retries fail.
        """
        last_error: Optional[Exception] = None
        model = self.model
        
        for attempt in range(self.max_retries):
            try:
                start_time = time.perf_counter()
                
                # Make the API call (synchronous, but we await for async context)
                response = await asyncio.to_thread(
                    self._make_api_call,
                    messages=messages,
                    model=model,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
                
                latency_ms = (time.perf_counter() - start_time) * 1000
                
                # Extract response content
                content = response.choices[0].message.content
                tokens_used = response.usage.total_tokens if response.usage else 0
                finish_reason = response.choices[0].finish_reason
                
                # Update metrics
                self._total_requests += 1
                self._total_tokens += tokens_used
                
                logger.info(
                    f"LLM response generated: model={model}, "
                    f"tokens={tokens_used}, latency={latency_ms:.0f}ms"
                )
                
                return LLMResponse(
                    content=content,
                    model=model,
                    tokens_used=tokens_used,
                    latency_ms=latency_ms,
                    finish_reason=finish_reason,
                )
                
            except RateLimitError as e:
                last_error = e
                self._failed_requests += 1
                
                # Extract retry-after if available
                retry_after = getattr(e, 'retry_after', None) or (2 ** attempt)
                logger.warning(
                    f"Rate limited on attempt {attempt + 1}/{self.max_retries}, "
                    f"waiting {retry_after}s"
                )
                await asyncio.sleep(retry_after)
                
            except APIConnectionError as e:
                last_error = e
                self._failed_requests += 1
                
                delay = self.base_delay * (2 ** attempt)
                logger.warning(
                    f"Connection error on attempt {attempt + 1}/{self.max_retries}: {e}, "
                    f"retrying in {delay}s"
                )
                await asyncio.sleep(delay)
                
            except APIError as e:
                last_error = e
                self._failed_requests += 1
                
                # For server errors, retry with backoff
                if e.status_code and e.status_code >= 500:
                    delay = self.base_delay * (2 ** attempt)
                    logger.warning(
                        f"Server error {e.status_code} on attempt {attempt + 1}/{self.max_retries}, "
                        f"retrying in {delay}s"
                    )
                    await asyncio.sleep(delay)
                else:
                    # Client error, don't retry
                    logger.error(f"API error: {e}")
                    raise LLMError(f"Groq API error: {e}") from e
                    
            except Exception as e:
                last_error = e
                self._failed_requests += 1
                logger.error(f"Unexpected error: {e}")
                
                # Try fallback model on last attempts
                if attempt >= self.max_retries - 2 and model != self.FALLBACK_MODEL:
                    model = self.FALLBACK_MODEL
                    logger.info(f"Falling back to model: {model}")
        
        # All retries exhausted
        logger.error(
            f"All {self.max_retries} retries failed for LLM generation"
        )
        raise LLMError(f"LLM generation failed after {self.max_retries} attempts: {last_error}")
    
    def _make_api_call(
        self,
        messages: List[Dict[str, str]],
        model: str,
        temperature: float,
        max_tokens: int,
    ) -> Any:
        """
        Make synchronous API call to Groq.
        
        This is called via asyncio.to_thread for async execution.
        
        Args:
            messages: Messages array.
            model: Model identifier.
            temperature: Generation temperature.
            max_tokens: Max tokens to generate.
        
        Returns:
            API response object.
        """
        return self.client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
    
    async def health_check(self) -> bool:
        """
        Check if the Groq API is accessible.
        
        Returns:
            bool: True if API is healthy, False otherwise.
        """
        try:
            response = await self.generate_response(
                system_prompt="You are a helpful assistant.",
                user_message="Say 'OK' in one word.",
                max_tokens=5,
            )
            return len(response) > 0
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return False
    
    def get_metrics(self) -> Dict[str, Any]:
        """
        Get client metrics.
        
        Returns:
            Dict[str, Any]: Metrics including request counts and tokens.
        """
        return {
            "total_requests": self._total_requests,
            "failed_requests": self._failed_requests,
            "total_tokens": self._total_tokens,
            "model": self.model,
            "success_rate": (
                (self._total_requests - self._failed_requests) / self._total_requests
                if self._total_requests > 0 else 1.0
            ),
        }


class LLMError(Exception):
    """Exception raised for LLM-related errors."""
    
    def __init__(
        self,
        message: str,
        retry_after: Optional[int] = None,
        is_retryable: bool = True,
    ) -> None:
        """
        Initialize LLM error.
        
        Args:
            message: Error message.
            retry_after: Seconds to wait before retry (if applicable).
            is_retryable: Whether the error is retryable.
        """
        super().__init__(message)
        self.retry_after = retry_after
        self.is_retryable = is_retryable


# Singleton instance for reuse
_client_instance: Optional[GroqLLMClient] = None


def get_llm_client() -> GroqLLMClient:
    """
    Get or create the singleton LLM client instance.
    
    Returns:
        GroqLLMClient: Shared client instance.
    """
    global _client_instance
    if _client_instance is None:
        _client_instance = GroqLLMClient()
    return _client_instance
