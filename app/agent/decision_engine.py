"""
Decision Engine for Conversation Control.

This module provides the decision engine that determines whether
to continue conversations, calculates intelligence scores, and
assesses threat levels.

Usage:
    from app.agent.decision_engine import DecisionEngine
    
    engine = DecisionEngine()
    should_continue, reason = engine.should_continue(
        turn_count=3,
        intelligence={"phone_numbers": [...]},
        max_turns=10
    )
"""

import logging
from typing import Any, Dict, List, Optional, Tuple

from app.config import get_settings

logger = logging.getLogger(__name__)


class DecisionEngine:
    """
    Decision engine for conversation control.
    
    Makes strategic decisions about:
    - Whether to continue conversations
    - When sufficient intelligence has been gathered
    - Threat detection and response
    - Optimal engagement duration
    
    Example:
        engine = DecisionEngine()
        
        # Check if should continue
        continue_conv, reason = engine.should_continue(
            turn_count=5,
            intelligence=intel_dict,
            max_turns=10
        )
        
        # Calculate intelligence score
        score = engine.calculate_intel_score(intel_dict)
    """
    
    # Intelligence score weights by entity type
    INTEL_WEIGHTS: Dict[str, float] = {
        "phone_numbers": 0.20,
        "upi_ids": 0.25,
        "bank_accounts": 0.25,
        "ifsc_codes": 0.10,
        "phishing_links": 0.15,
        "emails": 0.05,
    }
    
    # Minimum score to consider intelligence extraction successful
    MIN_SUCCESS_SCORE = 0.3
    
    # Target score for optimal extraction
    TARGET_SCORE = 0.6
    
    # Threat keywords that trigger termination
    THREAT_KEYWORDS: List[str] = [
        "police", "cyber cell", "cybercrime", "complaint", "report",
        "i know you are", "honeypot", "fake", "scam trap", "sting",
        "trace", "tracking", "recorded", "evidence", "arrest",
    ]
    
    def __init__(self) -> None:
        """Initialize decision engine."""
        settings = get_settings()
        self.max_turns = settings.max_turns
        self.min_intel_score = self.MIN_SUCCESS_SCORE
    
    def should_continue(
        self,
        turn_count: int,
        intelligence: Dict[str, Any],
        max_turns: Optional[int] = None,
        last_scammer_message: Optional[str] = None,
    ) -> Tuple[bool, str]:
        """
        Decide if conversation should continue.
        
        Args:
            turn_count: Current number of turns.
            intelligence: Extracted intelligence dictionary.
            max_turns: Maximum allowed turns (overrides config).
            last_scammer_message: Last message from scammer for threat detection.
        
        Returns:
            Tuple[bool, str]: (should_continue, reason_code)
            
            Reason codes:
            - "ONGOING": Continue conversation
            - "MAX_TURNS_REACHED": Hit turn limit
            - "GOAL_ACHIEVED": Sufficient intel extracted
            - "THREAT_DETECTED": Threat keywords detected
            - "NO_PROGRESS": No new intel for several turns
        
        Example:
            >>> engine = DecisionEngine()
            >>> engine.should_continue(turn_count=3, intelligence={})
            (True, "ONGOING")
        """
        max_turns = max_turns or self.max_turns
        
        # Check for threat in last message
        if last_scammer_message:
            if self.detect_threat(last_scammer_message):
                logger.warning("Threat detected in scammer message")
                return False, "THREAT_DETECTED"
        
        # Check max turns
        if turn_count >= max_turns:
            logger.info(f"Max turns ({max_turns}) reached")
            return False, "MAX_TURNS_REACHED"
        
        # Calculate intelligence score
        intel_score = self.calculate_intel_score(intelligence)
        
        # Check if target score achieved
        if intel_score >= self.TARGET_SCORE:
            logger.info(f"Target intel score ({self.TARGET_SCORE}) achieved: {intel_score}")
            return False, "GOAL_ACHIEVED"
        
        # If some intel extracted and near max turns, consider stopping
        if intel_score >= self.MIN_SUCCESS_SCORE and turn_count >= max_turns - 2:
            logger.info("Sufficient intel near max turns, completing")
            return False, "GOAL_ACHIEVED"
        
        # Check for stagnation (no progress)
        if turn_count >= 5 and intel_score < 0.1:
            logger.info("No significant intel after 5 turns")
            return False, "NO_PROGRESS"
        
        # Continue conversation
        return True, "ONGOING"
    
    def calculate_intel_score(self, intelligence: Dict[str, Any]) -> float:
        """
        Calculate intelligence extraction score.
        
        Scores based on types and quality of extracted entities.
        
        Args:
            intelligence: Extracted intelligence dictionary.
        
        Returns:
            float: Score between 0.0 and 1.0.
        
        Example:
            >>> engine = DecisionEngine()
            >>> intel = {"phone_numbers": [{"number": "+919876543210"}]}
            >>> engine.calculate_intel_score(intel)
            0.2
        """
        if not intelligence:
            return 0.0
        
        score = 0.0
        
        for entity_type, weight in self.INTEL_WEIGHTS.items():
            entities = intelligence.get(entity_type, [])
            
            if not entities:
                continue
            
            # Base score for having this entity type
            type_score = weight
            
            # Bonus for multiple entities (diminishing returns)
            if len(entities) > 1:
                type_score *= 1.0 + (min(len(entities), 3) - 1) * 0.2
            
            # Bonus for high confidence
            confidences = [e.get("confidence", 0.5) for e in entities]
            avg_confidence = sum(confidences) / len(confidences)
            type_score *= (0.5 + avg_confidence * 0.5)
            
            score += type_score
        
        # Bonus for bank account + IFSC combination
        if intelligence.get("bank_accounts") and intelligence.get("ifsc_codes"):
            score += 0.1
        
        # Bonus for UPI + phone combination
        if intelligence.get("upi_ids") and intelligence.get("phone_numbers"):
            score += 0.05
        
        # Normalize to 0-1
        return round(min(1.0, score), 2)
    
    def detect_threat(self, message: str) -> bool:
        """
        Detect potential threats in message.
        
        Args:
            message: Message to analyze.
        
        Returns:
            bool: True if threat detected.
        
        Example:
            >>> engine = DecisionEngine()
            >>> engine.detect_threat("I will report to cyber cell")
            True
        """
        if not message:
            return False
        
        message_lower = message.lower()
        
        for keyword in self.THREAT_KEYWORDS:
            if keyword in message_lower:
                logger.warning(f"Threat keyword detected: '{keyword}'")
                return True
        
        return False
    
    def get_extraction_priority(
        self,
        intelligence: Dict[str, Any],
    ) -> List[str]:
        """
        Get priority list of entity types to extract.
        
        Returns entities not yet extracted, ordered by importance.
        
        Args:
            intelligence: Current intelligence.
        
        Returns:
            List[str]: Priority-ordered entity types to target.
        """
        priorities = []
        
        # Order by weight (most valuable first)
        sorted_types = sorted(
            self.INTEL_WEIGHTS.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        for entity_type, _ in sorted_types:
            if not intelligence.get(entity_type):
                priorities.append(entity_type)
        
        return priorities
    
    def get_next_tactic(
        self,
        turn_count: int,
        intelligence: Dict[str, Any],
        persona_tactics: List[str],
    ) -> Optional[str]:
        """
        Get the next recommended tactic based on state.
        
        Args:
            turn_count: Current turn count.
            intelligence: Current intelligence.
            persona_tactics: Available tactics for current persona.
        
        Returns:
            Optional[str]: Recommended tactic or None.
        """
        if not persona_tactics:
            return None
        
        # Get priority entities to extract
        priorities = self.get_extraction_priority(intelligence)
        
        # Map entity types to relevant tactics
        tactic_keywords = {
            "upi_ids": ["upi", "gpay", "paytm", "pay", "transfer"],
            "bank_accounts": ["account", "bank", "transfer", "deposit"],
            "phone_numbers": ["call", "phone", "whatsapp", "number"],
            "ifsc_codes": ["branch", "bank", "ifsc"],
            "phishing_links": ["link", "website", "click"],
        }
        
        for priority_entity in priorities:
            keywords = tactic_keywords.get(priority_entity, [])
            
            for tactic in persona_tactics:
                tactic_lower = tactic.lower()
                if any(kw in tactic_lower for kw in keywords):
                    return tactic
        
        # Default: return a tactic based on turn count
        return persona_tactics[turn_count % len(persona_tactics)]
    
    def assess_conversation_quality(
        self,
        history: List[Dict[str, str]],
    ) -> Dict[str, Any]:
        """
        Assess overall conversation quality.
        
        Args:
            history: Conversation history.
        
        Returns:
            Dict[str, Any]: Quality assessment.
        """
        if not history:
            return {
                "quality_score": 0.0,
                "engagement_level": "none",
                "avg_response_length": 0,
                "scammer_messages": 0,
                "agent_messages": 0,
            }
        
        scammer_msgs = [m for m in history if m.get("role") == "scammer"]
        agent_msgs = [m for m in history if m.get("role") == "agent"]
        
        # Calculate average lengths
        scammer_avg_len = (
            sum(len(m.get("content", "")) for m in scammer_msgs) / len(scammer_msgs)
            if scammer_msgs else 0
        )
        agent_avg_len = (
            sum(len(m.get("content", "")) for m in agent_msgs) / len(agent_msgs)
            if agent_msgs else 0
        )
        
        # Assess engagement level
        if len(history) < 2:
            engagement = "minimal"
        elif len(history) < 6:
            engagement = "moderate"
        else:
            engagement = "high"
        
        # Quality score based on conversation dynamics
        quality = min(1.0, (
            0.2 * min(len(history) / 10, 1.0) +
            0.3 * min(scammer_avg_len / 100, 1.0) +
            0.3 * (1.0 if len(scammer_msgs) > 0 else 0.0) +
            0.2 * (1.0 if engagement == "high" else 0.5 if engagement == "moderate" else 0.0)
        ))
        
        return {
            "quality_score": round(quality, 2),
            "engagement_level": engagement,
            "avg_scammer_msg_length": round(scammer_avg_len),
            "avg_agent_msg_length": round(agent_avg_len),
            "scammer_messages": len(scammer_msgs),
            "agent_messages": len(agent_msgs),
        }


# Singleton instance
_engine_instance: Optional[DecisionEngine] = None


def get_decision_engine() -> DecisionEngine:
    """
    Get or create singleton decision engine instance.
    
    Returns:
        DecisionEngine: Shared engine instance.
    """
    global _engine_instance
    if _engine_instance is None:
        _engine_instance = DecisionEngine()
    return _engine_instance
