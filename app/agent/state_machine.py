"""
Conversation State Machine.

This module provides a finite state machine for managing
conversation states and transitions in the honeypot system.

Usage:
    from app.agent.state_machine import ConversationStateMachine
    
    machine = ConversationStateMachine()
    new_status = machine.transition("ONGOING", "intel_extracted")
"""

import logging
from enum import Enum
from typing import Dict, List, Optional, Set, Tuple

logger = logging.getLogger(__name__)


class ConversationState(str, Enum):
    """Possible conversation states."""
    
    INITIAL = "INITIAL"
    ONGOING = "ONGOING"
    INTELLIGENCE_EXTRACTED = "INTELLIGENCE_EXTRACTED"
    COMPLETED = "COMPLETED"
    MAX_TURNS_REACHED = "MAX_TURNS_REACHED"
    THREAT_DETECTED = "THREAT_DETECTED"
    DISENGAGED = "DISENGAGED"
    TERMINATED = "TERMINATED"
    ERROR = "ERROR"


class ConversationEvent(str, Enum):
    """Events that trigger state transitions."""
    
    START = "start"
    MESSAGE_RECEIVED = "message_received"
    RESPONSE_SENT = "response_sent"
    INTEL_EXTRACTED = "intel_extracted"
    MAX_TURNS = "max_turns"
    THREAT_DETECTED = "threat_detected"
    SCAMMER_DISENGAGED = "scammer_disengaged"
    GOAL_ACHIEVED = "goal_achieved"
    MANUAL_TERMINATE = "manual_terminate"
    ERROR_OCCURRED = "error_occurred"


class ConversationStateMachine:
    """
    Finite state machine for conversation management.
    
    Manages state transitions based on events during the
    honeypot conversation with scammers.
    
    States:
    - INITIAL: Session created, no messages yet
    - ONGOING: Active conversation in progress
    - INTELLIGENCE_EXTRACTED: Valuable intel has been extracted
    - COMPLETED: Conversation ended successfully
    - MAX_TURNS_REACHED: Hit maximum turn limit
    - THREAT_DETECTED: Potential threat to system
    - DISENGAGED: Scammer stopped responding
    - TERMINATED: Manually terminated
    - ERROR: Error occurred during conversation
    
    Example:
        machine = ConversationStateMachine()
        
        # Start conversation
        state = machine.transition("INITIAL", "start")  # -> ONGOING
        
        # Intel extracted
        state = machine.transition("ONGOING", "intel_extracted")  
        # -> INTELLIGENCE_EXTRACTED
    """
    
    # State transition table
    TRANSITIONS: Dict[str, Dict[str, str]] = {
        ConversationState.INITIAL: {
            ConversationEvent.START: ConversationState.ONGOING,
            ConversationEvent.ERROR_OCCURRED: ConversationState.ERROR,
        },
        ConversationState.ONGOING: {
            ConversationEvent.MESSAGE_RECEIVED: ConversationState.ONGOING,
            ConversationEvent.RESPONSE_SENT: ConversationState.ONGOING,
            ConversationEvent.INTEL_EXTRACTED: ConversationState.INTELLIGENCE_EXTRACTED,
            ConversationEvent.MAX_TURNS: ConversationState.MAX_TURNS_REACHED,
            ConversationEvent.THREAT_DETECTED: ConversationState.THREAT_DETECTED,
            ConversationEvent.SCAMMER_DISENGAGED: ConversationState.DISENGAGED,
            ConversationEvent.GOAL_ACHIEVED: ConversationState.COMPLETED,
            ConversationEvent.MANUAL_TERMINATE: ConversationState.TERMINATED,
            ConversationEvent.ERROR_OCCURRED: ConversationState.ERROR,
        },
        ConversationState.INTELLIGENCE_EXTRACTED: {
            ConversationEvent.MESSAGE_RECEIVED: ConversationState.INTELLIGENCE_EXTRACTED,
            ConversationEvent.RESPONSE_SENT: ConversationState.INTELLIGENCE_EXTRACTED,
            ConversationEvent.MAX_TURNS: ConversationState.MAX_TURNS_REACHED,
            ConversationEvent.THREAT_DETECTED: ConversationState.THREAT_DETECTED,
            ConversationEvent.SCAMMER_DISENGAGED: ConversationState.COMPLETED,
            ConversationEvent.GOAL_ACHIEVED: ConversationState.COMPLETED,
            ConversationEvent.MANUAL_TERMINATE: ConversationState.TERMINATED,
        },
        ConversationState.COMPLETED: {
            # Terminal state - no transitions out
        },
        ConversationState.MAX_TURNS_REACHED: {
            ConversationEvent.MANUAL_TERMINATE: ConversationState.TERMINATED,
        },
        ConversationState.THREAT_DETECTED: {
            ConversationEvent.MANUAL_TERMINATE: ConversationState.TERMINATED,
        },
        ConversationState.DISENGAGED: {
            ConversationEvent.MESSAGE_RECEIVED: ConversationState.ONGOING,
            ConversationEvent.MANUAL_TERMINATE: ConversationState.TERMINATED,
        },
        ConversationState.TERMINATED: {
            # Terminal state
        },
        ConversationState.ERROR: {
            ConversationEvent.START: ConversationState.ONGOING,
            ConversationEvent.MANUAL_TERMINATE: ConversationState.TERMINATED,
        },
    }
    
    # Terminal states (no further transitions)
    TERMINAL_STATES: Set[str] = {
        ConversationState.COMPLETED,
        ConversationState.TERMINATED,
    }
    
    # States that indicate session is still active
    ACTIVE_STATES: Set[str] = {
        ConversationState.INITIAL,
        ConversationState.ONGOING,
        ConversationState.INTELLIGENCE_EXTRACTED,
        ConversationState.DISENGAGED,
    }
    
    def __init__(self, initial_state: str = ConversationState.INITIAL) -> None:
        """
        Initialize state machine.
        
        Args:
            initial_state: Starting state for the machine.
        """
        self._current_state = initial_state
        self._history: List[Tuple[str, str, str]] = []  # (from, event, to)
    
    @property
    def current_state(self) -> str:
        """Get current state."""
        return self._current_state
    
    @property
    def is_terminal(self) -> bool:
        """Check if current state is terminal."""
        return self._current_state in self.TERMINAL_STATES
    
    @property
    def is_active(self) -> bool:
        """Check if conversation is still active."""
        return self._current_state in self.ACTIVE_STATES
    
    def transition(self, current_state: str, event: str) -> str:
        """
        Perform a state transition.
        
        Args:
            current_state: Current conversation state.
            event: Event triggering the transition.
        
        Returns:
            str: New state after transition.
        
        Example:
            >>> machine = ConversationStateMachine()
            >>> machine.transition("ONGOING", "intel_extracted")
            "INTELLIGENCE_EXTRACTED"
        """
        # Normalize inputs
        current = current_state.upper() if current_state else ConversationState.INITIAL
        event_key = event.lower() if event else ""
        
        # Get valid transitions for current state
        valid_transitions = self.TRANSITIONS.get(current, {})
        
        # Find matching transition
        new_state = valid_transitions.get(event_key)
        
        if new_state is None:
            # No valid transition - stay in current state
            logger.debug(
                f"No transition for event '{event}' from state '{current}'"
            )
            return current
        
        # Record transition
        self._history.append((current, event_key, new_state))
        self._current_state = new_state
        
        logger.info(f"State transition: {current} --[{event_key}]--> {new_state}")
        
        return new_state
    
    def can_transition(self, current_state: str, event: str) -> bool:
        """
        Check if a transition is valid.
        
        Args:
            current_state: Current state.
            event: Proposed event.
        
        Returns:
            bool: True if transition is valid.
        """
        current = current_state.upper() if current_state else ""
        event_key = event.lower() if event else ""
        
        valid_transitions = self.TRANSITIONS.get(current, {})
        return event_key in valid_transitions
    
    def get_valid_events(self, current_state: str) -> List[str]:
        """
        Get list of valid events from current state.
        
        Args:
            current_state: Current state.
        
        Returns:
            List[str]: Valid event names.
        """
        current = current_state.upper() if current_state else ""
        valid_transitions = self.TRANSITIONS.get(current, {})
        return list(valid_transitions.keys())
    
    def get_history(self) -> List[Tuple[str, str, str]]:
        """
        Get transition history.
        
        Returns:
            List[Tuple[str, str, str]]: List of (from, event, to) tuples.
        """
        return self._history.copy()
    
    def reset(self, initial_state: str = ConversationState.INITIAL) -> None:
        """
        Reset state machine.
        
        Args:
            initial_state: State to reset to.
        """
        self._current_state = initial_state
        self._history.clear()
    
    @staticmethod
    def is_terminal_state(state: str) -> bool:
        """
        Check if a state is terminal.
        
        Args:
            state: State to check.
        
        Returns:
            bool: True if terminal.
        """
        return state.upper() in ConversationStateMachine.TERMINAL_STATES
    
    @staticmethod
    def is_active_state(state: str) -> bool:
        """
        Check if a state is active (conversation continues).
        
        Args:
            state: State to check.
        
        Returns:
            bool: True if active.
        """
        return state.upper() in ConversationStateMachine.ACTIVE_STATES
    
    @staticmethod
    def get_all_states() -> List[str]:
        """Get all possible states."""
        return [s.value for s in ConversationState]
    
    @staticmethod
    def get_all_events() -> List[str]:
        """Get all possible events."""
        return [e.value for e in ConversationEvent]


# Convenience functions
def create_state_machine(
    initial_state: str = ConversationState.INITIAL,
) -> ConversationStateMachine:
    """
    Create a new state machine instance.
    
    Args:
        initial_state: Starting state.
    
    Returns:
        ConversationStateMachine: New state machine.
    """
    return ConversationStateMachine(initial_state)
