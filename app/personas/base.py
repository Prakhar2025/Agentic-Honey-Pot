"""
Base Persona Abstract Class.

This module defines the abstract base class for all victim personas.
Each persona represents a different type of potential scam victim
with unique behavioral patterns and communication styles.

All persona implementations must inherit from BasePersona and
implement the required abstract methods and properties.
"""

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class PersonaConfig(BaseModel):
    """
    Configuration model for a persona.
    
    Attributes:
        name: Unique identifier for the persona.
        display_name: Human-readable name.
        description: Brief description of the persona.
        best_for: List of scam types this persona works best against.
        traits: List of key personality traits.
        sample_phrases: Example phrases this persona would use.
    """
    
    name: str = Field(..., description="Unique persona identifier")
    display_name: str = Field(..., description="Human-readable name")
    description: str = Field(..., description="Brief persona description")
    best_for: List[str] = Field(default_factory=list, description="Best scam types")
    traits: List[str] = Field(default_factory=list, description="Key traits")
    sample_phrases: List[str] = Field(default_factory=list, description="Example phrases")


class BasePersona(ABC):
    """
    Abstract base class for victim personas.
    
    All persona implementations must inherit from this class and
    implement the required abstract methods and properties.
    
    Personas define:
    - Identity: name, backstory, communication style
    - Behavior: how they respond to scam tactics
    - Tactics: strategies to keep scammers engaged
    - Prompts: system prompts for the LLM
    
    Example:
        class ElderlyVictimPersona(BasePersona):
            @property
            def name(self) -> str:
                return "elderly_victim"
    """
    
    # Base path for prompt files
    PROMPTS_DIR = Path(__file__).parent.parent.parent / "prompts" / "personas"
    
    def __init__(self) -> None:
        """Initialize persona with cached prompt."""
        self._cached_system_prompt: Optional[str] = None
    
    # =========================================
    # Abstract Properties (Must Implement)
    # =========================================
    
    @property
    @abstractmethod
    def name(self) -> str:
        """
        Unique identifier for this persona.
        
        Returns:
            str: Lowercase identifier (e.g., 'elderly_victim').
        """
        pass
    
    @property
    @abstractmethod
    def display_name(self) -> str:
        """
        Human-readable display name.
        
        Returns:
            str: Display name (e.g., 'Elderly Victim').
        """
        pass
    
    @property
    @abstractmethod
    def description(self) -> str:
        """
        Brief description of the persona.
        
        Returns:
            str: One-line description.
        """
        pass
    
    @property
    @abstractmethod
    def backstory(self) -> str:
        """
        Detailed backstory for the persona.
        
        Returns:
            str: Background narrative for the character.
        """
        pass
    
    @property
    @abstractmethod
    def traits(self) -> List[str]:
        """
        Key personality traits.
        
        Returns:
            List[str]: List of defining traits.
        """
        pass
    
    @property
    @abstractmethod
    def communication_style(self) -> str:
        """
        Description of how this persona communicates.
        
        Returns:
            str: Communication style description.
        """
        pass
    
    @property
    @abstractmethod
    def best_for_scam_types(self) -> List[str]:
        """
        Scam types this persona is most effective against.
        
        Returns:
            List[str]: List of scam type identifiers.
        """
        pass
    
    @abstractmethod
    def get_stalling_tactics(self) -> List[str]:
        """
        Get tactics to stall and extract information.
        
        Returns:
            List[str]: List of stalling phrases/tactics.
        """
        pass
    
    @abstractmethod
    def get_sample_phrases(self) -> List[str]:
        """
        Get example phrases this persona would use.
        
        Returns:
            List[str]: Sample phrases for reference.
        """
        pass
    
    # =========================================
    # Concrete Methods
    # =========================================
    
    @property
    def system_prompt(self) -> str:
        """
        Get the system prompt for this persona.
        
        First attempts to load from file, then falls back to
        generating dynamically.
        
        Returns:
            str: Complete system prompt for LLM.
        """
        if self._cached_system_prompt is not None:
            return self._cached_system_prompt
        
        # Try to load from file
        prompt_file = self.PROMPTS_DIR / f"{self.name}.txt"
        if prompt_file.exists():
            self._cached_system_prompt = prompt_file.read_text(encoding="utf-8")
            return self._cached_system_prompt
        
        # Generate dynamically
        self._cached_system_prompt = self._generate_system_prompt()
        return self._cached_system_prompt
    
    def _generate_system_prompt(self) -> str:
        """
        Generate system prompt dynamically.
        
        Returns:
            str: Generated system prompt.
        """
        traits_list = "\n".join(f"- {trait}" for trait in self.traits)
        tactics_list = "\n".join(f"- {tactic}" for tactic in self.get_stalling_tactics())
        phrases_list = "\n".join(f'  * "{phrase}"' for phrase in self.get_sample_phrases()[:5])
        
        return f"""You are role-playing as a potential victim of a scam for a honeypot system.

CHARACTER: {self.display_name}
DESCRIPTION: {self.description}

BACKSTORY:
{self.backstory}

PERSONALITY TRAITS:
{traits_list}

COMMUNICATION STYLE:
{self.communication_style}

STALLING TACTICS (use these to extract information):
{tactics_list}

EXAMPLE PHRASES:
{phrases_list}

IMPORTANT RULES:
1. Stay in character at all times
2. NEVER reveal that you are an AI or part of a honeypot
3. Keep responses short (2-3 sentences max)
4. Ask clarifying questions to extract information
5. Show interest/concern to keep the scammer engaged
6. If they ask for sensitive info, stall or ask them to confirm details first

GOAL: Extract intelligence (bank accounts, UPI IDs, phone numbers, links) while appearing as a believable victim.
"""
    
    def get_config(self) -> PersonaConfig:
        """
        Get persona configuration as a Pydantic model.
        
        Returns:
            PersonaConfig: Configuration object.
        """
        return PersonaConfig(
            name=self.name,
            display_name=self.display_name,
            description=self.description,
            best_for=self.best_for_scam_types,
            traits=self.traits,
            sample_phrases=self.get_sample_phrases(),
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert persona to dictionary representation.
        
        Returns:
            Dict[str, Any]: Persona as dictionary.
        """
        return {
            "name": self.name,
            "display_name": self.display_name,
            "description": self.description,
            "backstory": self.backstory,
            "traits": self.traits,
            "communication_style": self.communication_style,
            "best_for_scam_types": self.best_for_scam_types,
            "stalling_tactics": self.get_stalling_tactics(),
            "sample_phrases": self.get_sample_phrases(),
        }
    
    def matches_scam_type(self, scam_type: str) -> bool:
        """
        Check if this persona is suitable for a scam type.
        
        Args:
            scam_type: Scam type identifier.
        
        Returns:
            bool: True if suitable.
        """
        return scam_type.upper() in [s.upper() for s in self.best_for_scam_types]
    
    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(name={self.name})>"
    
    def __str__(self) -> str:
        return self.display_name
