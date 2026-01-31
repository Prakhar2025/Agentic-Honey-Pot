
import asyncio
import sys
import os

# Add project root to path
sys.path.append(os.getcwd())

from sqlalchemy import text
from app.db.database import async_session_factory

async def check():
    print("Testing database connection...")
    try:
        async with async_session_factory() as session:
            result = await session.execute(text("SELECT 1"))
            print(f"Result: {result.scalar()}")
        print("SUCCESS")
    except Exception as e:
        print(f"ERROR type: {type(e)}")
        print(f"ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(check())
