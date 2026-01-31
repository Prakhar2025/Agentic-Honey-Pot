"""
Persona Manager.

This module provides the PersonaManager class for selecting and
managing victim personas based on scam types and configurations.

Usage:
    from app.personas.manager import PersonaManager
    
    manager = PersonaManager()
    persona = manager.select_persona("KYC_PHISHING")
    print(persona.system_prompt)
"""

import logging
import random
from typing import Dict, List, Optional, Type

from app.config import get_settings
from app.personas.base import BasePersona, PersonaConfig
from app.personas.busy_professional import BusyProfessionalPersona
from app.personas.eager_investor import EagerInvestorPersona
from app.personas.elderly_victim import ElderlyVictimPersona
from app.personas.helpful_auntie import HelpfulAuntiePersona
from app.personas.tech_novice import TechNovicePersona

logger = logging.getLogger(__name__)


class PersonaManager:
    """
    Manager for victim personas.
    
    Handles persona selection, loading, and management.
    Supports automatic persona selection based on scam type
    or manual selection by name.
    
    Attributes:
        personas: Dictionary of registered personas.
        default_persona: Default persona name to use.
    
    Example:
        manager = PersonaManager()
        
        # Auto-select based on scam type
        persona = manager.select_persona("INVESTMENT_FRAUD")
        
        # Get specific persona
        elderly = manager.get_persona("elderly_victim")
    """
    
    # Mapping of scam types to recommended personas (in priority order)
    SCAM_TYPE_PERSONA_MAP: Dict[str, List[str]] = {
        "KYC_PHISHING": ["elderly_victim", "tech_novice", "busy_professional"],
        "LOTTERY_PRIZE": ["helpful_auntie", "eager_investor", "elderly_victim"],
        "INVESTMENT_FRAUD": ["eager_investor", "helpful_auntie", "busy_professional"],
        "IMPERSONATION": ["elderly_victim", "helpful_auntie", "tech_novice"],
        "LOAN_SCAM": ["eager_investor", "busy_professional", "tech_novice"],
        "JOB_SCAM": ["helpful_auntie", "eager_investor", "tech_novice"],
        "OTP_THEFT": ["elderly_victim", "tech_novice", "busy_professional"],
        "TECH_SUPPORT": ["elderly_victim", "tech_novice", "helpful_auntie"],
        "UNKNOWN": ["elderly_victim", "tech_novice", "helpful_auntie"],
    }
    
    def __init__(self) -> None:
        """Initialize persona manager with all registered personas."""
        self._personas: Dict[str, BasePersona] = {}
        self._persona_classes: Dict[str, Type[BasePersona]] = {}
        
        # Register all available personas
        self._register_personas()
        
        # Get default persona from settings
        settings = get_settings()
        self.default_persona = settings.default_persona
        
        logger.info(
            f"PersonaManager initialized with {len(self._personas)} personas, "
            f"default={self.default_persona}"
        )
    
    def _register_personas(self) -> None:
        """Register all available persona classes."""
        persona_classes: List[Type[BasePersona]] = [
            ElderlyVictimPersona,
            TechNovicePersona,
            EagerInvestorPersona,
            BusyProfessionalPersona,
            HelpfulAuntiePersona,
        ]
        
        for persona_class in persona_classes:
            persona = persona_class()
            self._personas[persona.name] = persona
            self._persona_classes[persona.name] = persona_class
            logger.debug(f"Registered persona: {persona.name}")
    
    def get_persona(self, name: str) -> Optional[BasePersona]:
        """
        Get a persona by name.
        
        Args:
            name: Persona identifier (e.g., 'elderly_victim').
        
        Returns:
            Optional[BasePersona]: Persona instance or None if not found.
        """
        persona = self._personas.get(name)
        if persona is None:
            logger.warning(f"Persona not found: {name}")
        return persona
    
    def get_persona_or_default(self, name: Optional[str] = None) -> BasePersona:
        """
        Get a persona by name or return default.
        
        Args:
            name: Persona identifier or None for default.
        
        Returns:
            BasePersona: Requested or default persona.
        """
        if name and name != "auto":
            persona = self.get_persona(name)
            if persona:
                return persona
        
        return self._personas.get(
            self.default_persona,
            list(self._personas.values())[0]
        )
    
    def select_persona(
        self,
        scam_type: str,
        exclude: Optional[List[str]] = None,
        randomize: bool = True,
    ) -> BasePersona:
        """
        Select the best persona for a scam type.
        
        Args:
            scam_type: Detected scam type.
            exclude: Persona names to exclude from selection.
            randomize: If True, add randomness to selection.
        
        Returns:
            BasePersona: Selected persona instance.
        """
        exclude = exclude or []
        scam_type = scam_type.upper() if scam_type else "UNKNOWN"
        
        # Get recommended personas for this scam type
        recommended = self.SCAM_TYPE_PERSONA_MAP.get(
            scam_type,
            self.SCAM_TYPE_PERSONA_MAP["UNKNOWN"]
        )
        
        # Filter out excluded personas
        candidates = [p for p in recommended if p not in exclude]
        
        if not candidates:
            # Fallback to any available persona
            candidates = [
                name for name in self._personas.keys()
                if name not in exclude
            ]
        
        if not candidates:
            # Last resort: return default
            logger.warning(
                f"No suitable persona found for {scam_type}, using default"
            )
            return self.get_persona_or_default()
        
        # Select persona
        if randomize and len(candidates) > 1:
            # Weight towards first candidates (more suitable)
            weights = [1.0 / (i + 1) for i in range(len(candidates))]
            selected_name = random.choices(candidates, weights=weights, k=1)[0]
        else:
            selected_name = candidates[0]
        
        persona = self._personas[selected_name]
        logger.info(
            f"Selected persona '{persona.name}' for scam type '{scam_type}'"
        )
        
        return persona
    
    def select_persona_auto(
        self,
        scam_type: Optional[str] = None,
        persona_preference: Optional[str] = None,
    ) -> BasePersona:
        """
        Automatically select the best persona.
        
        If persona_preference is specified and valid, uses that.
        Otherwise selects based on scam_type or uses default.
        
        Args:
            scam_type: Detected scam type (optional).
            persona_preference: Preferred persona name (optional).
        
        Returns:
            BasePersona: Selected persona.
        """
        # Check for explicit preference
        if persona_preference and persona_preference != "auto":
            persona = self.get_persona(persona_preference)
            if persona:
                logger.info(f"Using preferred persona: {persona.name}")
                return persona
        
        # Select based on scam type
        if scam_type:
            return self.select_persona(scam_type)
        
        # Return default
        return self.get_persona_or_default()
    
    def list_personas(self) -> List[PersonaConfig]:
        """
        List all available personas with their configurations.
        
        Returns:
            List[PersonaConfig]: List of persona configurations.
        """
        return [persona.get_config() for persona in self._personas.values()]
    
    def list_persona_names(self) -> List[str]:
        """
        List all available persona names.
        
        Returns:
            List[str]: List of persona identifiers.
        """
        return list(self._personas.keys())
    
    def get_persona_for_fallback(
        self,
        current_persona: str,
        scam_type: Optional[str] = None,
    ) -> Optional[BasePersona]:
        """
        Get a fallback persona if current one fails.
        
        Args:
            current_persona: Currently used persona name.
            scam_type: Scam type for context-aware fallback.
        
        Returns:
            Optional[BasePersona]: Alternative persona or None.
        """
        if scam_type:
            return self.select_persona(
                scam_type,
                exclude=[current_persona],
                randomize=False,
            )
        
        # Get any other persona
        for name, persona in self._personas.items():
            if name != current_persona:
                return persona
        
        return None
    
    def get_personas_for_scam_type(self, scam_type: str) -> List[BasePersona]:
        """
        Get all suitable personas for a scam type.
        
        Args:
            scam_type: Scam type identifier.
        
        Returns:
            List[BasePersona]: List of suitable personas.
        """
        scam_type = scam_type.upper() if scam_type else "UNKNOWN"
        recommended = self.SCAM_TYPE_PERSONA_MAP.get(
            scam_type,
            self.SCAM_TYPE_PERSONA_MAP["UNKNOWN"]
        )
        
        return [
            self._personas[name]
            for name in recommended
            if name in self._personas
        ]


# Singleton instance
_manager_instance: Optional[PersonaManager] = None


def get_persona_manager() -> PersonaManager:
    """
    Get or create the singleton PersonaManager instance.
    
    Returns:
        PersonaManager: Shared manager instance.
    """
    global _manager_instance
    if _manager_instance is None:
        _manager_instance = PersonaManager()
    return _manager_instance
