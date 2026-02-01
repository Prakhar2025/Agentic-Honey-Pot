
from fastapi import APIRouter, Request, status
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/v1/debug/echo")
async def debug_echo(request: Request):
    """Echo headers and body for debugging."""
    body = await request.body()
    headers = dict(request.headers)
    logger.info(f"DEBUG ECHO: Headers={headers} Body={body.decode()}")
    return {
        "headers": headers,
        "body_raw": body.decode(),
        "json": await request.json() if body else {},
    }
