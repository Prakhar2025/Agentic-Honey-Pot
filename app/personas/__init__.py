"""
Persona System - Believable victim personalities.

This package provides the persona system for the honeypot,
including base classes and implementations for different
victim archetypes.

Available Personas:
    - elderly_victim: Confused, trusting elderly person
    - tech_novice: Technology-challenged user
    - eager_investor: Greedy quick-money seeker
    - busy_professional: Time-pressed professional
    - helpful_auntie: Overly friendly and chatty person

Usage:
    from app.personas import PersonaManager, get_persona_manager
    
    manager = get_persona_manager()
    persona = manager.select_persona("KYC_PHISHING")
    print(persona.system_prompt)
"""

from app.personas.base import BasePersona, PersonaConfig
from app.personas.busy_professional import BusyProfessionalPersona
from app.personas.eager_investor import EagerInvestorPersona
from app.personas.elderly_victim import ElderlyVictimPersona
from app.personas.helpful_auntie import HelpfulAuntiePersona
from app.personas.manager import PersonaManager, get_persona_manager
from app.personas.tech_novice import TechNovicePersona

__all__ = [
    # Base
    "BasePersona",
    "PersonaConfig",
    # Manager
    "PersonaManager",
    "get_persona_manager",
    # Personas
    "ElderlyVictimPersona",
    "TechNovicePersona",
    "EagerInvestorPersona",
    "BusyProfessionalPersona",
    "HelpfulAuntiePersona",
]
