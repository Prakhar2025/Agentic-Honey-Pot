
import asyncio
import sys
import os
import logging
from dotenv import load_dotenv

# Add project root to path
sys.path.append(os.getcwd())

# Load env vars explicitly
load_dotenv()

from app.services.groq_client import get_llm_client

# Configure logging to see all details
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def debug_groq():
    print("--- STARTING GROQ DEBUG ---")
    
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("CRITICAL: GROQ_API_KEY not found in environment!")
        return
    else:
        print(f"API Key found: {api_key[:5]}...{api_key[-4:]}")
        
    client = get_llm_client()
    print(f"Model configured: {client.model}")
    
    try:
        print("Attempting generation...")
        response = await client.generate_response(
            system_prompt="You are a test bot.",
            user_message="Hello, are you working?",
            max_tokens=10
        )
        print(f"SUCCESS! Response: {response}")
    except Exception as e:
        print(f"FAILURE! Error Type: {type(e)}")
        print(f"Error Message: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(debug_groq())
