"""
Intelligence Aggregator.

This module provides functionality for merging and deduplicating
intelligence extracted from multiple conversation turns.

Usage:
    from app.intelligence.aggregator import IntelligenceAggregator
    
    aggregator = IntelligenceAggregator()
    merged = aggregator.merge_intelligence(old_intel, new_intel)
"""

import logging
from datetime import datetime
from typing import Any, Dict, List, Optional, Set, Tuple

from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)


class EntityRecord(BaseModel):
    """Record for a single extracted entity with metadata."""
    
    value: str = Field(..., description="Extracted value")
    confidence: float = Field(default=0.8, ge=0.0, le=1.0)
    first_seen_turn: int = Field(default=1, ge=0)
    last_seen_turn: int = Field(default=1, ge=0)
    occurrences: int = Field(default=1, ge=1)
    contexts: List[str] = Field(default_factory=list)


class IntelligenceAggregator:
    """
    Aggregator for merging and deduplicating extracted intelligence.
    
    Handles:
    - Merging intelligence from multiple conversation turns
    - Deduplication with confidence boosting for repeated entities
    - Entity normalization for consistent comparison
    - Tracking first/last seen turns
    
    Example:
        aggregator = IntelligenceAggregator()
        
        # After each turn
        merged = aggregator.merge_intelligence(old_intel, new_intel)
    """
    
    def __init__(self) -> None:
        """Initialize the aggregator."""
        self._seen_phones: Dict[str, EntityRecord] = {}
        self._seen_upis: Dict[str, EntityRecord] = {}
        self._seen_accounts: Dict[str, EntityRecord] = {}
        self._seen_ifsc: Dict[str, EntityRecord] = {}
        self._seen_urls: Dict[str, EntityRecord] = {}
        self._seen_emails: Dict[str, EntityRecord] = {}
        self._seen_other: Dict[str, EntityRecord] = {}
    
    def merge_intelligence(
        self,
        old_intel: Dict[str, Any],
        new_intel: Dict[str, Any],
        current_turn: int = 1,
    ) -> Dict[str, Any]:
        """
        Merge new intelligence with existing intelligence.
        
        Args:
            old_intel: Previously extracted intelligence.
            new_intel: Newly extracted intelligence.
            current_turn: Current conversation turn number.
        
        Returns:
            Dict[str, Any]: Merged and deduplicated intelligence.
        
        Example:
            old = {"phone_numbers": [{"number": "+919876543210"}]}
            new = {"phone_numbers": [{"number": "+919876543210"}, {"number": "+919123456789"}]}
            merged = aggregator.merge_intelligence(old, new, turn=2)
            # merged has 2 phone numbers, first one with boosted confidence
        """
        merged: Dict[str, Any] = {
            "phone_numbers": [],
            "upi_ids": [],
            "bank_accounts": [],
            "ifsc_codes": [],
            "phishing_links": [],
            "emails": [],
            "other_intel": [],
            "total_entities": 0,
            "extraction_method": "hybrid",
        }
        
        # Merge phone numbers
        merged["phone_numbers"] = self._merge_entity_list(
            old_intel.get("phone_numbers", []),
            new_intel.get("phone_numbers", []),
            key_field="number",
            current_turn=current_turn,
        )
        
        # Merge UPI IDs
        merged["upi_ids"] = self._merge_entity_list(
            old_intel.get("upi_ids", []),
            new_intel.get("upi_ids", []),
            key_field="id",
            current_turn=current_turn,
        )
        
        # Merge bank accounts
        merged["bank_accounts"] = self._merge_entity_list(
            old_intel.get("bank_accounts", []),
            new_intel.get("bank_accounts", []),
            key_field="account_number",
            current_turn=current_turn,
        )
        
        # Merge IFSC codes
        merged["ifsc_codes"] = self._merge_entity_list(
            old_intel.get("ifsc_codes", []),
            new_intel.get("ifsc_codes", []),
            key_field="code",
            current_turn=current_turn,
        )
        
        # Merge phishing links
        merged["phishing_links"] = self._merge_entity_list(
            old_intel.get("phishing_links", []),
            new_intel.get("phishing_links", []),
            key_field="url",
            current_turn=current_turn,
        )
        
        # Merge emails
        merged["emails"] = self._merge_entity_list(
            old_intel.get("emails", []),
            new_intel.get("emails", []),
            key_field="email",
            current_turn=current_turn,
        )
        
        # Merge other intel
        merged["other_intel"] = self._merge_other_intel(
            old_intel.get("other_intel", []),
            new_intel.get("other_intel", []),
        )
        
        # Calculate total entities
        merged["total_entities"] = (
            len(merged["phone_numbers"]) +
            len(merged["upi_ids"]) +
            len(merged["bank_accounts"]) +
            len(merged["ifsc_codes"]) +
            len(merged["phishing_links"]) +
            len(merged["emails"]) +
            len(merged["other_intel"])
        )
        
        logger.debug(
            f"Merged intelligence: {merged['total_entities']} total entities"
        )
        
        return merged
    
    def _merge_entity_list(
        self,
        old_list: List[Dict[str, Any]],
        new_list: List[Dict[str, Any]],
        key_field: str,
        current_turn: int = 1,
    ) -> List[Dict[str, Any]]:
        """
        Merge two lists of entities, deduplicating by key field.
        
        Args:
            old_list: Existing entities.
            new_list: New entities.
            key_field: Field to use as unique key.
            current_turn: Current turn for tracking.
        
        Returns:
            List[Dict[str, Any]]: Merged and deduplicated list.
        """
        seen: Dict[str, Dict[str, Any]] = {}
        
        # Process old entities
        for entity in old_list:
            key = self._normalize_key(entity.get(key_field, ""))
            if key:
                seen[key] = entity.copy()
                seen[key]["first_seen_turn"] = entity.get("first_seen_turn", 1)
        
        # Process new entities
        for entity in new_list:
            key = self._normalize_key(entity.get(key_field, ""))
            if not key:
                continue
            
            if key in seen:
                # Entity already exists - boost confidence
                existing = seen[key]
                old_conf = existing.get("confidence", 0.8)
                new_conf = entity.get("confidence", 0.8)
                
                # Boost confidence for repeated sightings (max 0.99)
                boosted = min(0.99, old_conf + (1 - old_conf) * 0.2)
                existing["confidence"] = max(boosted, new_conf)
                
                # Update last seen turn
                existing["last_seen_turn"] = current_turn
                existing["occurrences"] = existing.get("occurrences", 1) + 1
            else:
                # New entity
                new_entity = entity.copy()
                new_entity["first_seen_turn"] = current_turn
                new_entity["last_seen_turn"] = current_turn
                new_entity["occurrences"] = 1
                seen[key] = new_entity
        
        return list(seen.values())
    
    def _merge_other_intel(
        self,
        old_list: List[Dict[str, Any]],
        new_list: List[Dict[str, Any]],
    ) -> List[Dict[str, Any]]:
        """
        Merge other intelligence items.
        
        Args:
            old_list: Existing other intel.
            new_list: New other intel.
        
        Returns:
            List[Dict[str, Any]]: Merged list.
        """
        seen: Dict[Tuple[str, str], Dict[str, Any]] = {}
        
        for item in old_list + new_list:
            key = (item.get("type", ""), item.get("value", ""))
            if key[0] and key[1]:
                if key not in seen:
                    seen[key] = item.copy()
                else:
                    # Boost confidence for duplicates
                    old_conf = seen[key].get("confidence", 0.8)
                    new_conf = item.get("confidence", 0.8)
                    seen[key]["confidence"] = min(0.99, max(old_conf, new_conf) + 0.1)
        
        return list(seen.values())
    
    def _normalize_key(self, value: str) -> str:
        """
        Normalize a value for consistent comparison.
        
        Args:
            value: Value to normalize.
        
        Returns:
            str: Normalized lowercase value without common noise.
        """
        if not value:
            return ""
        
        # Lowercase and strip
        normalized = value.lower().strip()
        
        # Remove common separators for comparison
        import re
        normalized = re.sub(r"[\s\-._]", "", normalized)
        
        return normalized
    
    def deduplicate(self, items: List[Any], key: Optional[str] = None) -> List[Any]:
        """
        Remove duplicates from a list.
        
        Args:
            items: List of items (dicts or primitives).
            key: Optional key field for dict items.
        
        Returns:
            List[Any]: Deduplicated list.
        
        Examples:
            >>> agg = IntelligenceAggregator()
            >>> agg.deduplicate([1, 2, 2, 3])
            [1, 2, 3]
            >>> agg.deduplicate([{"id": "a"}, {"id": "a"}], key="id")
            [{"id": "a"}]
        """
        if not items:
            return []
        
        seen: Set[str] = set()
        result: List[Any] = []
        
        for item in items:
            if key and isinstance(item, dict):
                item_key = self._normalize_key(str(item.get(key, "")))
            else:
                item_key = self._normalize_key(str(item))
            
            if item_key and item_key not in seen:
                seen.add(item_key)
                result.append(item)
        
        return result
    
    def get_high_confidence_intel(
        self,
        intel: Dict[str, Any],
        threshold: float = 0.85,
    ) -> Dict[str, Any]:
        """
        Filter intelligence to only high-confidence items.
        
        Args:
            intel: Full intelligence dictionary.
            threshold: Minimum confidence threshold.
        
        Returns:
            Dict[str, Any]: Filtered intelligence.
        """
        filtered: Dict[str, Any] = {
            "phone_numbers": [],
            "upi_ids": [],
            "bank_accounts": [],
            "ifsc_codes": [],
            "phishing_links": [],
            "emails": [],
            "other_intel": [],
            "total_entities": 0,
        }
        
        for key in ["phone_numbers", "upi_ids", "bank_accounts", "ifsc_codes", 
                    "phishing_links", "emails", "other_intel"]:
            items = intel.get(key, [])
            filtered[key] = [
                item for item in items
                if item.get("confidence", 0) >= threshold
            ]
        
        filtered["total_entities"] = sum(
            len(filtered[key]) for key in filtered if key != "total_entities"
        )
        
        return filtered
    
    def get_summary(self, intel: Dict[str, Any]) -> Dict[str, Any]:
        """
        Get a summary of extracted intelligence.
        
        Args:
            intel: Intelligence dictionary.
        
        Returns:
            Dict[str, Any]: Summary statistics.
        """
        return {
            "total_entities": intel.get("total_entities", 0),
            "phone_count": len(intel.get("phone_numbers", [])),
            "upi_count": len(intel.get("upi_ids", [])),
            "bank_account_count": len(intel.get("bank_accounts", [])),
            "ifsc_count": len(intel.get("ifsc_codes", [])),
            "url_count": len(intel.get("phishing_links", [])),
            "email_count": len(intel.get("emails", [])),
            "other_count": len(intel.get("other_intel", [])),
            "avg_confidence": self._calculate_avg_confidence(intel),
        }
    
    def _calculate_avg_confidence(self, intel: Dict[str, Any]) -> float:
        """Calculate average confidence across all entities."""
        confidences = []
        
        for key in ["phone_numbers", "upi_ids", "bank_accounts", "ifsc_codes",
                    "phishing_links", "emails", "other_intel"]:
            for item in intel.get(key, []):
                conf = item.get("confidence")
                if conf is not None:
                    confidences.append(conf)
        
        if not confidences:
            return 0.0
        
        return round(sum(confidences) / len(confidences), 2)
    
    def reset(self) -> None:
        """Reset aggregator state."""
        self._seen_phones.clear()
        self._seen_upis.clear()
        self._seen_accounts.clear()
        self._seen_ifsc.clear()
        self._seen_urls.clear()
        self._seen_emails.clear()
        self._seen_other.clear()


# Singleton instance
_aggregator_instance: Optional[IntelligenceAggregator] = None


def get_aggregator() -> IntelligenceAggregator:
    """
    Get or create singleton aggregator instance.
    
    Returns:
        IntelligenceAggregator: Shared aggregator instance.
    """
    global _aggregator_instance
    if _aggregator_instance is None:
        _aggregator_instance = IntelligenceAggregator()
    return _aggregator_instance
