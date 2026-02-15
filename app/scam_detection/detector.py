"""
Scam Detector.

This module provides scam detection capabilities using both
pattern matching and LLM-based classification.

Usage:
    from app.scam_detection.detector import ScamDetector
    
    detector = ScamDetector()
    is_scam, scam_type, confidence = await detector.is_scam(message)
"""

import logging
import re
from typing import Dict, List, Optional, Tuple

from app.config import get_settings

logger = logging.getLogger(__name__)


class ScamType:
    """Known scam type categories."""
    
    KYC_PHISHING = "KYC_PHISHING"
    LOTTERY_PRIZE = "LOTTERY_PRIZE"
    INVESTMENT_FRAUD = "INVESTMENT_FRAUD"
    IMPERSONATION = "IMPERSONATION"
    LOAN_SCAM = "LOAN_SCAM"
    JOB_SCAM = "JOB_SCAM"
    OTP_THEFT = "OTP_THEFT"
    TECH_SUPPORT = "TECH_SUPPORT"
    UNKNOWN = "UNKNOWN"


class ScamDetector:
    """
    Scam detection engine using pattern matching and heuristics.
    
    Detects various types of scams common in India:
    - KYC phishing (bank/telecom KYC updates)
    - Lottery/prize scams
    - Investment fraud
    - Impersonation (bank officials, govt)
    - Loan scams
    - Job scams
    - OTP theft attempts
    - Tech support scams
    
    Example:
        detector = ScamDetector()
        
        is_scam, scam_type, confidence = await detector.is_scam(
            "Your KYC is expiring, click link to update"
        )
        # (True, "KYC_PHISHING", 0.92)
    """
    
    # Pattern sets for each scam type
    SCAM_PATTERNS: Dict[str, Dict[str, List[str]]] = {
        ScamType.KYC_PHISHING: {
            "keywords": [
                "kyc", "update kyc", "kyc expire", "kyc verification",
                "account block", "account suspend", "pan link", "pan aadhaar",
                "link expire", "verification pending", "reactivate account",
                "complete verification", "verify account", "update details",
            ],
            "phrases": [
                "kyc.*expir", "kyc.*update", "kyc.*pending",
                "account.*block", "account.*suspend", "account.*deactivat",
                "pan.*link", "aadhaar.*link", "verify.*account",
                "complete.*verification", "update.*detail",
            ],
        },
        ScamType.LOTTERY_PRIZE: {
            "keywords": [
                "lottery", "winner", "prize", "jackpot", "lucky draw",
                "congratulations", "won", "claim", "reward", "cash prize",
                "selected", "lucky customer", "bumper prize",
            ],
            "phrases": [
                "you.*won", "you.*winner", "claim.*prize",
                "lucky.*draw", "cash.*prize", "congratulation",
                "selected.*winner", "bumper.*prize",
            ],
        },
        ScamType.INVESTMENT_FRAUD: {
            "keywords": [
                "invest", "trading", "crypto", "bitcoin", "forex",
                "guaranteed return", "double money", "high return",
                "profit daily", "investment scheme", "money back",
                "return guarantee", "earn daily", "passive income",
            ],
            "phrases": [
                "invest.*return", "guaranteed.*return", "double.*money",
                "high.*return", "profit.*daily", "daily.*earning",
                "earn.*per.*day", "monthly.*return",
            ],
        },
        ScamType.IMPERSONATION: {
            "keywords": [
                "bank manager", "rbi", "reserve bank", "sbi", "hdfc",
                "icici", "axis bank", "income tax", "irs", "customs",
                "police", "cyber cell", "official", "authority",
                "government", "ministry", "department",
            ],
            "phrases": [
                "calling.*from.*bank", "bank.*official",
                "from.*rbi", "income.*tax.*department",
                "cyber.*cell", "police.*station",
            ],
        },
        ScamType.LOAN_SCAM: {
            "keywords": [
                "instant loan", "personal loan", "loan approved",
                "pre-approved loan", "loan sanction", "processing fee",
                "registration fee", "loan offer", "credit limit",
                "zero interest", "no documentation",
            ],
            "phrases": [
                "loan.*approved", "pre.*approved.*loan",
                "instant.*loan", "loan.*sanction",
                "processing.*fee", "registration.*fee",
            ],
        },
        ScamType.JOB_SCAM: {
            "keywords": [
                "work from home", "job offer", "part time job",
                "typing job", "data entry", "earn from home",
                "registration fee", "joining fee", "job guarantee",
                "immediate joining", "no experience",
            ],
            "phrases": [
                "work.*from.*home", "job.*offer",
                "part.*time.*job", "earn.*from.*home",
                "typing.*job", "data.*entry",
                "registration.*fee", "joining.*fee",
            ],
        },
        ScamType.OTP_THEFT: {
            "keywords": [
                "otp", "verification code", "one time password",
                "share otp", "send otp", "tell otp", "otp received",
                "verify otp", "enter otp", "sms code",
            ],
            "phrases": [
                "share.*otp", "send.*otp", "tell.*otp",
                "otp.*received", "verification.*code",
                "enter.*otp", "give.*otp",
            ],
        },
        ScamType.TECH_SUPPORT: {
            "keywords": [
                "virus", "malware", "computer infected", "hack",
                "remote access", "anydesk", "teamviewer", "support call",
                "microsoft", "windows error", "security alert",
                "install app", "download app",
            ],
            "phrases": [
                "computer.*infected", "virus.*detected",
                "download.*app", "install.*app",
                "remote.*access", "security.*alert",
            ],
        },
    }
    
    # High-risk indicators
    HIGH_RISK_INDICATORS: List[str] = [
        r"click.*link", r"update.*urgent", r"expire.*today",
        r"block.*within", r"suspended.*immediately",
        r"share.*otp", r"processing.*fee", r"registration.*charge",
        r"pay.*₹", r"pay.*rs", r"transfer.*amount",
    ]
    
    def __init__(self) -> None:
        """Initialize scam detector."""
        self._compile_patterns()
        logger.info("ScamDetector initialized")
    
    def _compile_patterns(self) -> None:
        """Compile regex patterns for efficient matching."""
        self._compiled_patterns: Dict[str, List[re.Pattern]] = {}
        
        for scam_type, patterns in self.SCAM_PATTERNS.items():
            compiled = []
            for phrase in patterns.get("phrases", []):
                try:
                    compiled.append(re.compile(phrase, re.IGNORECASE))
                except re.error as e:
                    logger.warning(f"Invalid regex pattern '{phrase}': {e}")
            self._compiled_patterns[scam_type] = compiled
        
        # Compile high-risk patterns
        self._high_risk_patterns = [
            re.compile(p, re.IGNORECASE) for p in self.HIGH_RISK_INDICATORS
        ]
    
    async def is_scam(self, message: str) -> Tuple[bool, str, float]:
        """
        Detect if a message is a scam.
        
        Uses pattern matching and heuristics for fast detection.
        
        Args:
            message: Message to analyze.
        
        Returns:
            Tuple[bool, str, float]: (is_scam, scam_type, confidence)
        
        Example:
            >>> detector = ScamDetector()
            >>> await detector.is_scam("Your KYC is expiring")
            (True, "KYC_PHISHING", 0.85)
        """
        if not message or len(message) < 10:
            return False, ScamType.UNKNOWN, 0.0
        
        message_lower = message.lower()
        
        # Score each scam type
        scores: Dict[str, float] = {}
        
        for scam_type, patterns in self.SCAM_PATTERNS.items():
            score = self._calculate_scam_score(
                message_lower,
                patterns["keywords"],
                self._compiled_patterns.get(scam_type, [])
            )
            if score > 0:
                scores[scam_type] = score
        
        # Check high-risk indicators
        high_risk_score = self._check_high_risk(message_lower)
        
        # FALLBACK: Critical keyword detection (for borderline scams)
        CRITICAL_KEYWORDS = {
            "otp", "pin", "cvv", "password", "kyc", "blocked",
            "suspended", "verify", "urgent", "expire", "expir",
            "click link", "update now", "share otp", "send otp"
        }
        
        message_words = set(message_lower.split())
        critical_matches = message_words & CRITICAL_KEYWORDS
        
        # Also check for multi-word critical phrases
        for phrase in ["click link", "update now", "share otp", "send otp", "verify now"]:
            if phrase in message_lower:
                critical_matches.add(phrase)
        
        # Calculate fallback confidence
        fallback_confidence = 0.0
        if len(critical_matches) >= 2:
            # Multiple critical keywords = likely scam
            fallback_confidence = min(0.75, 0.35 + (len(critical_matches) * 0.10))
        elif len(critical_matches) == 1:
            # Single critical keyword = moderate suspicion
            fallback_confidence = 0.40
        
        if not scores:
            if high_risk_score > 0 or fallback_confidence > 0:
                combined = max(high_risk_score, fallback_confidence)
                # Determine scam type based on keywords
                scam_type_fallback = ScamType.UNKNOWN
                if "otp" in critical_matches or "pin" in critical_matches:
                    scam_type_fallback = ScamType.OTP_THEFT
                elif "kyc" in critical_matches or "verify" in critical_matches:
                    scam_type_fallback = ScamType.KYC_PHISHING
                elif "blocked" in critical_matches or "suspended" in critical_matches:
                    scam_type_fallback = ScamType.KYC_PHISHING
                
                return combined >= 0.3, scam_type_fallback, min(0.75, combined)
            return False, ScamType.UNKNOWN, 0.0
        
        # Get highest scoring scam type
        best_type = max(scores.keys(), key=lambda k: scores[k])
        best_score = scores[best_type]
        
        # Boost with high-risk indicators and fallback
        final_confidence = min(0.98, best_score + high_risk_score * 0.2 + fallback_confidence * 0.15)
        
        # LOWERED THRESHOLD: Determine if it's a scam (was 0.4, now 0.3)
        is_scam = final_confidence >= 0.3
        
        if is_scam:
            logger.info(f"Scam detected: type={best_type}, confidence={final_confidence:.2f}, critical_keywords={list(critical_matches)}")
        
        return is_scam, best_type, round(final_confidence, 2)
    
    def _calculate_scam_score(
        self,
        message: str,
        keywords: List[str],
        patterns: List[re.Pattern],
    ) -> float:
        """
        Calculate scam score for a specific type.
        
        Args:
            message: Lowercase message.
            keywords: Keywords to match.
            patterns: Compiled regex patterns.
        
        Returns:
            float: Score between 0.0 and 1.0.
        """
        score = 0.0
        
        # Keyword matches
        keyword_matches = sum(1 for kw in keywords if kw in message)
        if keyword_matches > 0:
            score += min(0.5, keyword_matches * 0.15)
        
        # Pattern matches (weighted higher)
        pattern_matches = sum(1 for p in patterns if p.search(message))
        if pattern_matches > 0:
            score += min(0.5, pattern_matches * 0.25)
        
        return score
    
    def _check_high_risk(self, message: str) -> float:
        """
        Check for high-risk scam indicators.
        
        Args:
            message: Lowercase message.
        
        Returns:
            float: Risk score.
        """
        matches = sum(1 for p in self._high_risk_patterns if p.search(message))
        return min(0.5, matches * 0.15)
    
    async def classify_scam(self, message: str) -> Dict[str, float]:
        """
        Get classification scores for all scam types.
        
        Args:
            message: Message to classify.
        
        Returns:
            Dict[str, float]: Scores for each scam type.
        """
        if not message:
            return {}
        
        message_lower = message.lower()
        scores = {}
        
        for scam_type, patterns in self.SCAM_PATTERNS.items():
            score = self._calculate_scam_score(
                message_lower,
                patterns["keywords"],
                self._compiled_patterns.get(scam_type, [])
            )
            if score > 0.1:
                scores[scam_type] = round(score, 2)
        
        return scores
    
    def get_scam_indicators(self, message: str) -> List[str]:
        """
        Extract specific scam indicators from message.
        
        Args:
            message: Message to analyze.
        
        Returns:
            List[str]: Matched scam indicators.
        """
        indicators = []
        message_lower = message.lower()
        
        for scam_type, patterns in self.SCAM_PATTERNS.items():
            for keyword in patterns["keywords"]:
                if keyword in message_lower:
                    indicators.append(f"{scam_type}:{keyword}")
        
        return indicators
    
    async def analyze(self, message: str) -> Dict:
        """
        Full scam analysis with detailed output.
        
        Args:
            message: Message to analyze.
        
        Returns:
            Dict: Detailed analysis results.
        """
        is_scam_result, scam_type, confidence = await self.is_scam(message)
        classifications = await self.classify_scam(message)
        indicators = self.get_scam_indicators(message)
        
        return {
            "is_scam": is_scam_result,
            "scam_type": scam_type,
            "confidence": confidence,
            "all_classifications": classifications,
            "indicators": indicators,
            "message_length": len(message),
            "risk_level": self._get_risk_level(confidence),
        }
    
    def _get_risk_level(self, confidence: float) -> str:
        """Get human-readable risk level."""
        if confidence >= 0.8:
            return "HIGH"
        elif confidence >= 0.5:
            return "MEDIUM"
        elif confidence >= 0.3:
            return "LOW"
        return "MINIMAL"


# Singleton instance
_detector_instance: Optional[ScamDetector] = None


def get_scam_detector() -> ScamDetector:
    """
    Get or create singleton scam detector instance.
    
    Returns:
        ScamDetector: Shared detector instance.
    """
    global _detector_instance
    if _detector_instance is None:
        _detector_instance = ScamDetector()
    return _detector_instance
