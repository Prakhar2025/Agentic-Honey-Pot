# Complete asChild Error Fix Plan

## Problem
React.Children.only error from @radix-ui/react-slot when components with asChild have multiple children

## Components that use asChild/Slot
- Button asChild
- DropdownMenuTrigger asChild  
- TooltipTrigger asChild
- PopoverTrigger asChild
- CollapsibleTrigger asChild
- SelectPrimitive.Icon asChild

## Files Already Fixed (20 instances)
1. navbar.tsx (2)
2. settings/page.tsx (3)
3. session-card.tsx (1)
4. sessions-list.tsx (1)
5. session-detail-header.tsx (1)
6. sessions-toolbar.tsx (1)
7. sessions-empty.tsx (2)
8. intelligence-empty.tsx (1)
9. app/page.tsx (5)
10. dashboard/error.tsx (1)
11. docs/page.tsx (3)

## Next Steps
1. Search for DropdownMenuTrigger, TooltipTrigger, PopoverTrigger with multiple children
2. Check all components imported by landing page
3. Verify each fix with test compilation
