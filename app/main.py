"""
ScamShield Agentic Honeypot API - Main Application.

This module initializes the FastAPI application with all middleware,
routers, and event handlers for the honeypot system.

Run with:
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
"""

import logging
import time
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.responses import JSONResponse

from app.api.v1.router import router as v1_router
from app.api.v1.hackathon import router as hackathon_router
from app.api.debug import router as debug_router
from app.config import get_settings
from app.middleware.auth import APIKeyMiddleware
from app.db.database import init_db, engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# =============================================================================
# APPLICATION LIFESPAN
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager.
    
    Handles startup and shutdown events:
    - Startup: Initialize database tables, warm up connections
    - Shutdown: Close database connections, cleanup resources
    """
    # Startup
    logger.info("Starting ScamShield Honeypot API...")
    
    try:
        # Create database tables
        await init_db()
        logger.info("Database tables initialized")
        
        # Warm up LLM client (optional, for faster first request)
        settings = get_settings()
        logger.info(f"Environment: {settings.environment}")
        logger.info(f"LLM Model: {settings.groq_model}")
        
        logger.info("ScamShield Honeypot API started successfully")
        
    except Exception as e:
        logger.error(f"Startup failed: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down ScamShield Honeypot API...")
    
    try:
        # Close database connections
        await engine.dispose()
        logger.info("Database connections closed")
    except Exception as e:
        logger.error(f"Shutdown error: {e}")
    
    logger.info("Shutdown complete")


# =============================================================================
# APPLICATION FACTORY
# =============================================================================

def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application.
    
    Returns:
        FastAPI: Configured application instance.
    """
    settings = get_settings()
    
    # Create FastAPI app with OpenAPI metadata
    app = FastAPI(
        title="ScamShield Agentic Honeypot API",
        description="""
## 🛡️ ScamShield Honeypot API

An AI-powered honeypot system that engages with scammers using believable 
personas to extract intelligence (phone numbers, UPI IDs, bank accounts, 
phishing links).

### Features
- **Agentic AI**: LLM-powered victim personas that engage naturally
- **Intelligence Extraction**: Automatic extraction of financial entities
- **Multi-Persona**: 5 distinct victim archetypes for different scam types
- **Scam Detection**: Pattern matching for 8 Indian scam types

### Endpoints
- `/v1/honeypot/engage` - Start new conversation with scammer
- `/v1/honeypot/continue` - Continue existing conversation
- `/v1/sessions` - Manage and view sessions
- `/v1/analytics` - Dashboard and intelligence summary

### About
Agentic Honey-Pot — AI-powered Scam Detection & Intelligence Extraction Platform
        """,
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )
    
    # Custom OpenAPI schema with security scheme for API key
    def custom_openapi():
        if app.openapi_schema:
            return app.openapi_schema
        
        openapi_schema = get_openapi(
            title="ScamShield Agentic Honeypot API",
            version="1.0.0",
            description=app.description,
            routes=app.routes,
        )
        
        # Add security scheme for API Key
        openapi_schema["components"] = openapi_schema.get("components", {})
        openapi_schema["components"]["securitySchemes"] = {
            "APIKeyHeader": {
                "type": "apiKey",
                "in": "header",
                "name": "X-API-Key",
                "description": "API key for authentication. Get from hackathon submission.",
            }
        }
        
        # Apply security globally to all endpoints
        openapi_schema["security"] = [{"APIKeyHeader": []}]
        
        app.openapi_schema = openapi_schema
        return app.openapi_schema
    
    app.openapi = custom_openapi
    
    # API Key Authentication Middleware (FIRST - before CORS)
    # Validates X-API-Key header, returns 401 for invalid keys
    app.add_middleware(APIKeyMiddleware)
    
    # Configure CORS (allow all for hackathon demo)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allow all origins for demo
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Request logging middleware
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        """Log all incoming requests with timing."""
        start_time = time.perf_counter()
        
        # Generate request ID
        request_id = request.headers.get("X-Request-ID", "")
        
        # Log request
        logger.info(
            f"Request: {request.method} {request.url.path} "
            f"[{request_id or 'no-id'}]"
        )
        
        try:
            response = await call_next(request)
            
            # Calculate processing time
            process_time = (time.perf_counter() - start_time) * 1000
            
            # Add timing header
            response.headers["X-Process-Time-Ms"] = f"{process_time:.2f}"
            
            # Log response
            logger.info(
                f"Response: {request.method} {request.url.path} "
                f"status={response.status_code} time={process_time:.0f}ms"
            )
            
            return response
            
        except Exception as e:
            process_time = (time.perf_counter() - start_time) * 1000
            logger.error(
                f"Error: {request.method} {request.url.path} "
                f"error={str(e)} time={process_time:.0f}ms"
            )
            raise
    
    # Global exception handler
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        """Handle uncaught exceptions."""
        logger.exception(f"Unhandled exception: {exc}")
        
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": "Internal server error",
                "detail": str(exc) if settings.is_development else "An error occurred",
            },
        )
    
    # Include API routers
    app.include_router(v1_router)
    app.include_router(hackathon_router, tags=["Hackathon"])
    app.include_router(debug_router, tags=["Debug"])
    
    # Root endpoint
    @app.get("/", tags=["Root"])
    async def root():
        """Root endpoint with API information."""
        return {
            "name": "ScamShield Agentic Honeypot API",
            "version": "1.0.0",
            "docs": "/docs",
            "health": "/v1/health",
            "description": "AI-powered honeypot for scam intelligence collection",
        }
    
    return app


# =============================================================================
# APPLICATION INSTANCE
# =============================================================================

# Create the application instance
app = create_app()


# For running with `python -m app.main`
if __name__ == "__main__":
    import uvicorn
    
    settings = get_settings()
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.is_development,
        log_level=settings.log_level.lower(),
    )
