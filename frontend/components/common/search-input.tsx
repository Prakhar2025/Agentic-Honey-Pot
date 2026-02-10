'use client'

import * as React from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils/cn'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
    value?: string
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    placeholder?: string
    debounceMs?: number
    loading?: boolean
    showClear?: boolean
    showShortcut?: boolean
    shortcut?: string
    className?: string
    inputClassName?: string
    autoFocus?: boolean
}

function SearchInput({
    value: controlledValue,
    onChange,
    onSearch,
    placeholder = 'Search...',
    debounceMs = 300,
    loading = false,
    showClear = true,
    showShortcut = false,
    shortcut = '⌘K',
    className,
    inputClassName,
    autoFocus = false,
}: SearchInputProps) {
    const [internalValue, setInternalValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    const value = controlledValue !== undefined ? controlledValue : internalValue
    const isControlled = controlledValue !== undefined

    const debouncedOnSearch = useDebouncedCallback((searchValue: string) => {
        onSearch?.(searchValue)
    }, debounceMs)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value

        if (!isControlled) {
            setInternalValue(newValue)
        }

        onChange?.(newValue)
        debouncedOnSearch(newValue)
    }

    const handleClear = () => {
        if (!isControlled) {
            setInternalValue('')
        }
        onChange?.('')
        onSearch?.('')
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClear()
        }
    }

    // Keyboard shortcut handler
    React.useEffect(() => {
        if (!showShortcut) return

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }

        document.addEventListener('keydown', handleGlobalKeyDown)
        return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [showShortcut])

    return (
        <div className={cn('relative', className)}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                ref={inputRef}
                type="search"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={cn(
                    'pl-10 pr-20',
                    inputClassName
                )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {loading && (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {showClear && value && !loading && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={handleClear}
                        className="h-6 w-6"
                    >
                        <X className="h-3.5 w-3.5" />
                        <span className="sr-only">Clear search</span>
                    </Button>
                )}
                {showShortcut && !value && (
                    <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        {shortcut}
                    </kbd>
                )}
            </div>
        </div>
    )
}

export { SearchInput }
