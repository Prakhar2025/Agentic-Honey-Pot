"""
ScamShield Agentic Honeypot - Configuration Management

This module provides centralized configuration using Pydantic Settings.
All environment variables are loaded and validated here.
"""

from functools import lru_cache
from typing import List, Optional

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    
    Usage:
        from app.config import get_settings
        settings = get_settings()
        print(settings.groq_api_key)
    """
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )
    
    # ===========================================
    # REQUIRED SETTINGS
    # ===========================================
    
    groq_api_key: str = Field(
        ...,
        description="Groq API key for LLM inference",
        min_length=1,
    )
    
    # ===========================================
    # API CONFIGURATION
    # ===========================================
    
    api_key: str = Field(
        default="ss_dev_default_key",
        description="API key for authenticating requests",
    )
    
    environment: str = Field(
        default="development",
        description="Environment: development, staging, production",
    )
    
    # ===========================================
    # DATABASE
    # ===========================================
    
    database_url: str = Field(
        default="sqlite:///./data/scamshield.db",
        description="Database connection URL",
    )
    
    # ===========================================
    # AGENTIC CONFIGURATION
    # ===========================================
    
    max_turns: int = Field(
        default=10,
        ge=1,
        le=50,
        description="Maximum conversation turns per session",
    )
    
    default_persona: str = Field(
        default="elderly_victim",
        description="Default persona if auto-selection fails",
    )
    
    session_timeout_seconds: int = Field(
        default=1800,
        ge=60,
        description="Session timeout in seconds (default: 30 minutes)",
    )
    
    # ===========================================
    # MOCK SCAMMER API
    # ===========================================
    
    mock_scammer_url: Optional[str] = Field(
        default=None,
        description="Mock Scammer API base URL",
    )
    
    webhook_secret: Optional[str] = Field(
        default=None,
        description="Webhook secret for validating incoming requests",
    )
    
    # ===========================================
    # SECURITY
    # ===========================================
    
    cors_origins: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:8000"],
        description="CORS allowed origins",
    )
    
    rate_limit_rpm: int = Field(
        default=60,
        ge=1,
        description="Rate limit: requests per minute",
    )
    
    # ===========================================
    # LOGGING
    # ===========================================
    
    log_level: str = Field(
        default="INFO",
        description="Log level: DEBUG, INFO, WARNING, ERROR, CRITICAL",
    )
    
    log_json: bool = Field(
        default=False,
        description="Enable structured JSON logging",
    )
    
    # ===========================================
    # LLM CONFIGURATION
    # ===========================================
    
    groq_model: str = Field(
        default="llama-3.2-90b-vision-preview",
        description="Groq model to use",
    )
    
    llm_temperature: float = Field(
        default=0.7,
        ge=0.0,
        le=2.0,
        description="Temperature for response generation",
    )
    
    llm_max_tokens: int = Field(
        default=1024,
        ge=1,
        le=8192,
        description="Maximum tokens for LLM response",
    )
    
    # ===========================================
    # VALIDATORS
    # ===========================================
    
    @field_validator("environment")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        """Validate environment is one of allowed values."""
        allowed = {"development", "staging", "production"}
        if v.lower() not in allowed:
            raise ValueError(f"Environment must be one of: {allowed}")
        return v.lower()
    
    @field_validator("log_level")
    @classmethod
    def validate_log_level(cls, v: str) -> str:
        """Validate log level is valid."""
        allowed = {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}
        if v.upper() not in allowed:
            raise ValueError(f"Log level must be one of: {allowed}")
        return v.upper()
    
    @field_validator("default_persona")
    @classmethod
    def validate_persona(cls, v: str) -> str:
        """Validate persona is one of defined personas."""
        allowed = {
            "elderly_victim",
            "tech_novice",
            "eager_investor",
            "busy_professional",
            "helpful_auntie",
        }
        if v.lower() not in allowed:
            raise ValueError(f"Persona must be one of: {allowed}")
        return v.lower()
    
    # ===========================================
    # COMPUTED PROPERTIES
    # ===========================================
    
    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment == "production"
    
    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment == "development"


@lru_cache
def get_settings() -> Settings:
    """
    Get cached settings instance.
    
    Returns:
        Settings: Application settings loaded from environment.
    
    Usage:
        settings = get_settings()
    """
    return Settings()
