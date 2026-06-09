$ErrorActionPreference = "Stop"

$blockedExtensions = @(
  ".pdf",
  ".epub",
  ".mobi",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".zip",
  ".rar",
  ".7z"
)

$trackedFiles = git ls-files
$blockedFiles = @()

foreach ($file in $trackedFiles) {
  $extension = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
  if ($blockedExtensions -contains $extension) {
    $blockedFiles += $file
  }
}

if ($blockedFiles.Count -gt 0) {
  Write-Host "Blocked source-like or redistributed files are tracked:" -ForegroundColor Red
  $blockedFiles | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

$markdownFiles = $trackedFiles | Where-Object { $_ -match "\.md$" }
$longQuotes = @()
$paperIssues = @()

foreach ($file in $markdownFiles) {
  $lines = Get-Content -LiteralPath $file
  $quoteBuffer = @()
  $quoteStart = 0

  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -match "^\s*>") {
      if ($quoteBuffer.Count -eq 0) {
        $quoteStart = $i + 1
      }
      $quoteBuffer += ($line -replace "^\s*>\s?", "")
      continue
    }

    if ($quoteBuffer.Count -gt 0) {
      $words = (($quoteBuffer -join " ") -split "\s+" | Where-Object { $_ }).Count
      if ($words -gt 80) {
        $longQuotes += "${file}:${quoteStart} ($words words)"
      }
      $quoteBuffer = @()
    }
  }

  if ($quoteBuffer.Count -gt 0) {
    $words = (($quoteBuffer -join " ") -split "\s+" | Where-Object { $_ }).Count
    if ($words -gt 80) {
      $longQuotes += "${file}:${quoteStart} ($words words)"
    }
  }
}

if ($longQuotes.Count -gt 0) {
  Write-Host "Long block quotes found. Prefer short quotes plus your own summary:" -ForegroundColor Red
  $longQuotes | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

$paperFiles = $trackedFiles | Where-Object { $_ -like "papers/*.md" }
$requiredFields = @(
  "title",
  "authors",
  "year",
  "permalink",
  "tags",
  "thesis",
  "links",
  "reading_status",
  "updated_at",
  "copyright_risk"
)

foreach ($file in $paperFiles) {
  $content = Get-Content -Raw -LiteralPath $file

  foreach ($field in $requiredFields) {
    if ($content -notmatch "(?m)^$field\s*:") {
      $paperIssues += "${file}: missing front matter field '$field'"
    }
  }
}

if ($paperIssues.Count -gt 0) {
  Write-Host "Paper metadata issues found:" -ForegroundColor Red
  $paperIssues | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

Write-Host "Content check passed: no blocked files or long block quotes are tracked." -ForegroundColor Green
