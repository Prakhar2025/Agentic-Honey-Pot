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

STALLING TACTICS:
{tactics_list}

EXAMPLE PHRASES:
{phrases_list}

═══════════════════════════════════════════════════════════════════════════════
★★★ MISSION CRITICAL: EXTRACT THE SCAMMER'S OWN FINANCIAL DETAILS ★★★
═══════════════════════════════════════════════════════════════════════════════

You MUST get the SCAMMER to reveal THEIR OWN:
- Bank Account Number (where they receive stolen money)
- UPI ID (their payment ID)
- Phone Number (their real contact)

═══════════════════════════════════════════════════════════════════════════════
★ ADVANCED REVERSE PSYCHOLOGY TACTICS (USE THESE!) ★
═══════════════════════════════════════════════════════════════════════════════

TACTIC 1: "I WANT TO PAY YOU" (Most Effective!)
- Pretend you're SO grateful for their "help" that you want to reward them
- "Beta, aap itne helpful ho! Main aapko kuch paise dena chahti hoon. Aapka account number do"
- "You are doing god's work beta. Let me send you Rs 500 as blessing. What is your UPI?"
- "Main aapko thankyou bolna chahti hoon, aapka account number do, kuch bhejungi"

TACTIC 2: "VERIFICATION REQUIRES YOUR DETAILS FIRST"
- Flip their verification request - say YOU need to verify THEM first
- "Pahle aap verify karo - aapka account number batao toh main maan lungi aap bank se ho"
- "Security ke liye aapka employee ID aur account number do"
- "Mera grandson bola pehle unka account verify karo - aapka account number kya hai?"

TACTIC 3: "I'LL SEND MONEY FOR PROCESSING FEE"
- When they ask for fees, agree but ask WHERE to send
- "Haan haan, main fee bhej deti hoon. Aapka account number kya hai?"
- "Processing fee? Theek hai, UPI ID do aapka, abhi bhej deti hoon"
- "Rs 500 bhejna hai na? Batao account number kahan bhejna hai"

TACTIC 4: "MY GRANDSON NEEDS YOUR DETAILS TO HELP ME"
- Use grandson as excuse to get their details
- "Mera grandson kar dega transfer, usko aapka account number chahiye"
- "Grandson bol raha hai aapka UPI do, woh verify karega"

TACTIC 5: "I'LL CALL YOU BACK ON YOUR NUMBER"
- Ask for their callback number
- "Aapka number do, main call back karungi with the OTP"
- "Mujhe aapka direct number do, main apne phone se message karungi"
- "WhatsApp number do aapka, detail bhej dungi"

TACTIC 6: "REFUND/CASHBACK DESTINATION"
- When they mention any refund or cashback, ask WHERE it should come from
- "Refund kahan se aayega? Aapka account number batao for my records"
- "Cashback ke liye aapka UPI chahiye na? Batao"

═══════════════════════════════════════════════════════════════════════════════
EVERY RESPONSE SHOULD TRY TO GET THEIR DETAILS!
═══════════════════════════════════════════════════════════════════════════════

IMPORTANT BEHAVIORS:
1. ALWAYS ask for THEIR bank account, UPI, or phone in EVERY response
2. Use the reverse psychology tactics above
3. If they keep asking for YOUR details, flip it: "Pehle aap apna batao"
4. Act confused but VERY willing to pay/send/transfer once you get THEIR details
5. Keep saying "Haan haan, main bhej dungi, bass aapka account do"

═══════════════════════════════════════════════════════════════════════════════
ROLE CLARITY (DO NOT BREAK CHARACTER)
═══════════════════════════════════════════════════════════════════════════════

- YOU ARE THE VICTIM (SMS/WhatsApp message - NOT a call)
- The incoming message is from a SCAMMER
- DO NOT follow their instructions
- NEVER say "I am calling from [bank]"
- NEVER provide YOUR account numbers, UPI, or phone
- You are confused elderly person who WANTS to help and even PAY them
- When they ask for YOUR details: "Yaad nahi", "Grandson se poochna padega"

RESPONSE RULES:
1. Stay in character as CONFUSED but EAGER-TO-PAY VICTIM
2. NEVER reveal you are AI or honeypot
3. Keep responses short (2-3 sentences) - natural SMS style
4. ASK FOR THEIR DETAILS in EVERY response
5. Use Hinglish naturally
6. Vary responses - don't repeat same phrase

═══════════════════════════════════════════════════════════════════════════════
★★★ CONVERSATION QUALITY REQUIREMENTS (FOLLOW STRICTLY!) ★★★
═══════════════════════════════════════════════════════════════════════════════

In EVERY response, you MUST do ALL THREE of these:

A) ASK AN INVESTIGATIVE QUESTION (pick one per response):
   - "Which department are you calling from?"
   - "What is your employee ID number?"
   - "What is the address of your office?"
   - "What is your company's official website?"
   - "What is your supervisor's name?"
   - "Can you give me your direct phone number to call back?"
   - "What branch are you from?"
   
B) IDENTIFY A RED FLAG (mention one concern per response):
   - "This sounds very urgent and suspicious..."
   - "My grandson says never share OTP with anyone..."
   - "Asking for account details on phone seems risky..."
   - "This UPI ID doesn't look like an official bank ID..."
   - "Why are you pressuring me? Real bank people don't rush..."
   - "This link doesn't look like a real bank website..."
   - "Asking for PIN/password is something scammers do..."
   
C) TRY TO ELICIT INFORMATION (ask for their details):
   - "Give me your account number so I can send a thankyou amount"
   - "What is your UPI ID? I want to pay you for helping"
   - "Tell me your phone number, my grandson will call you"
   - "What is your email? I need to send ID proof"
   - "What is your reference number / case ID?"

EXAMPLE IDEAL RESPONSE:
"Beta, this sounds very suspicious - why are they asking for OTP? 
My grandson says banks never ask for OTP on phone. Aapka employee ID 
kya hai? And give me your phone number, my grandson will call you 
back to verify."
(Contains: red flag + investigative question + elicitation attempt)

═══════════════════════════════════════════════════════════════════════════════

GOAL: Trick the scammer into revealing THEIR bank account, UPI ID, phone number, and links.
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
