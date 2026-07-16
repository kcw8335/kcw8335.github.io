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
  ".7z",
  ".exe",
  ".msi",
  ".dll",
  ".winmd"
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
$seenRanks = @{}
$seenPermalinks = @{}
$requiredFields = @(
  "title",
  "authors",
  "year",
  "rank",
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

  $rankMatch = [regex]::Match($content, "(?m)^rank\s*:\s*(\d+)\s*$")
  if (-not $rankMatch.Success) {
    $paperIssues += "${file}: rank must be a positive integer"
  }
  else {
    $rank = [int]$rankMatch.Groups[1].Value
    if ($rank -lt 1) {
      $paperIssues += "${file}: rank must be greater than zero"
    }
    elseif ($seenRanks.ContainsKey($rank)) {
      $paperIssues += "${file}: duplicate rank '$rank' also used by '$($seenRanks[$rank])'"
    }
    else {
      $seenRanks[$rank] = $file
    }
  }

  $permalinkMatch = [regex]::Match($content, "(?m)^permalink\s*:\s*(/\S+/)\s*$")
  if (-not $permalinkMatch.Success) {
    $paperIssues += "${file}: permalink must start and end with '/'"
  }
  else {
    $permalink = $permalinkMatch.Groups[1].Value
    if ($seenPermalinks.ContainsKey($permalink)) {
      $paperIssues += "${file}: duplicate permalink '$permalink' also used by '$($seenPermalinks[$permalink])'"
    }
    else {
      $seenPermalinks[$permalink] = $file
    }
  }

  if ($content -notmatch "(?m)^updated_at\s*:\s*\d{4}-\d{2}-\d{2}\s*$") {
    $paperIssues += "${file}: updated_at must use YYYY-MM-DD"
  }
}

if ($paperIssues.Count -gt 0) {
  Write-Host "Paper metadata issues found:" -ForegroundColor Red
  $paperIssues | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

Write-Host "Content check passed: tracked files, quotes, paper metadata, ranks, and permalinks are valid." -ForegroundColor Green
