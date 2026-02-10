# PowerShell script to fix all direct imports to use barrel exports

# Fix hooks imports - change from '@/lib/hooks/use-X' to '@/lib/hooks'
Get-ChildItem -Path "frontend" -Recurse -Include *.tsx,*.ts | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $originalContent = $content
    
    # Replace direct hook imports with barrel exports
    $content = $content -replace "from '@/lib/hooks/use-sessions'", "from '@/lib/hooks'"
    $content = $content -replace "from '@/lib/hooks/use-analytics'", "from '@/lib/hooks'"
    $content = $content -replace "from '@/lib/hooks/use-dashboard-data'", "from '@/lib/hooks'"
    $content = $content -replace "from '@/lib/hooks/use-entity-detail'", "from '@/lib/hooks'"
    $content = $content -replace "from '@/lib/hooks/use-intelligence'", "from '@/lib/hooks'"
    $content = $content -replace "from '@/lib/hooks/use-reports'", "from '@/lib/hooks'"
    
    # Replace direct store imports with barrel exports
    $content = $content -replace "from '@/lib/stores/chat-store'", "from '@/lib/stores'"
    $content = $content -replace "from '@/lib/stores/analytics-store'", "from '@/lib/stores'"
    $content = $content -replace "from '@/lib/stores/session-filters'", "from '@/lib/stores'"
    $content = $content -replace "from '@/lib/stores/intelligence-filters'", "from '@/lib/stores'"
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($_.FullName)"
    }
}

Write-Host "`nAll imports fixed!"
