
import asyncio
import sys
import os
import logging

# Add project root to path
sys.path.append(os.getcwd())

from app.db.database import async_session_factory
from app.db.repositories.sessions import SessionRepository
from app.api.v1.analytics import get_dashboard

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def debug():
    print("Testing analytics dashboard...")
    try:
        async with async_session_factory() as session:
            repo = SessionRepository(session)
            
            print("1. Calling get_session_stats()...")
            stats = await repo.get_session_stats()
            print(f"Stats: {stats}")
            
            print("2. Calling list()...")
            sessions = await repo.list(limit=10)
            print(f"Sessions: {len(sessions)}")
            
            # Mimic dashboard logic
            print("3. Calculating distribution...")
            type_counts = stats.get("by_scam_type", {})
            for st, count in sorted(type_counts.items(), key=lambda x: -x[1]):
                print(f" - {st}: {count}")
                
        print("SUCCESS")
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(debug())
