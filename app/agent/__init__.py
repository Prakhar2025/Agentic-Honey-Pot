"""
Agent Brain - Conversation orchestration and decision making.

This package provides the core agent intelligence including:
- AgentOrchestrator: Main coordinator for all components
- DecisionEngine: Strategic decision making
- ConversationStateMachine: State management

Usage:
    from app.agent import AgentOrchestrator, get_orchestrator
    
    orchestrator = get_orchestrator()
    result = await orchestrator.process_message(
        scammer_message="Update KYC now",
        session_id="session-123",
        conversation_history=[]
    )
"""

from app.agent.decision_engine import (
    DecisionEngine,
    get_decision_engine,
)
from app.agent.orchestrator import (
    AgentOrchestrator,
    get_orchestrator,
)
from app.agent.state_machine import (
    ConversationEvent,
    ConversationState,
    ConversationStateMachine,
    create_state_machine,
)

__all__ = [
    # Main orchestrator
    "AgentOrchestrator",
    "get_orchestrator",
    # Decision engine
    "DecisionEngine",
    "get_decision_engine",
    # State machine
    "ConversationStateMachine",
    "ConversationState",
    "ConversationEvent",
    "create_state_machine",
]
