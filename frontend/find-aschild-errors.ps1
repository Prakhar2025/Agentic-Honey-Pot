# Find all asChild errors script
Get-ChildItem -Path "c:\Users\prakh\OneDrive\Desktop\HoneyPot\frontend" -Include "*.tsx" -Recurse -File | ForEach-Object {
    $file = $_
    $content = Get-Content $file.FullName -Raw
    
    # Pattern 1: Button with asChild parent and multiple direct children
    if ($content -match '(?s)asChild[^>]*>[\s\n]*<Button[^>]*>[\s\n]*<[^>]+className="[^"]*h-\d[^>]*>[\s\n]*<[^>]+>') {
        Write-Host "$($file.FullName) - PATTERN 1: Button with multiple children"
    }
    
    # Pattern 2: Icon + sr-only span
    if ($content -match '(?s)<[^>]+className="[^"]*h-\d[^>]*/>[\s\n]*<span[^>]+sr-only') {
        Write-Host "$($file.FullName) - PATTERN 2: Icon + sr-only span"
    }
    
    # Pattern 3: Text + Icon in Button with asChild
    if ($content -match '(?s)asChild[^>]*>[\s\n]*<(?:Link|a)[^>]*>[\s\n]*[A-Z][^<]*[\s\n]*<[^>]+className="[^"]*h-\d') {
        Write-Host "$($file.FullName) - PATTERN 3: Text + Icon in asChild Link"
    }
}
