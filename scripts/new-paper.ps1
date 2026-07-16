param(
  [Parameter(Mandatory = $true)]
  [string]$Title,

  [string]$Authors = "",
  [int]$Year = (Get-Date).Year,
  [string]$Venue = "Working paper",
  [string]$Status = "",
  [string]$ReadingStatus = "",
  [string]$Priority = "medium",
  [int]$Rank = 999,
  [string]$Url = "https://example.com",
  [string]$Label = "Official link",
  [string[]]$Tags = @("crypto", "factor")
)

$ErrorActionPreference = "Stop"

function ConvertTo-Slug {
  param([string]$Value)

  $slug = $Value.ToLowerInvariant()
  $slug = $slug -replace "[^a-z0-9]+", "-"
  $slug = $slug.Trim("-")

  if ([string]::IsNullOrWhiteSpace($slug)) {
    $slug = "paper-" + (Get-Date -Format "yyyyMMdd-HHmmss")
  }

  return $slug
}

function Replace-Line {
  param(
    [string]$Text,
    [string]$Pattern,
    [string]$Replacement
  )

  return [regex]::Replace(
    $Text,
    $Pattern,
    [System.Text.RegularExpressions.MatchEvaluator]{
      param($Match)
      return $Replacement
    }
  )
}

$repoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$papersDir = Join-Path $repoRoot "papers"
$templatePath = Join-Path $repoRoot "templates\paper.md"
New-Item -ItemType Directory -Force -Path $papersDir | Out-Null

if (-not (Test-Path -LiteralPath $templatePath -PathType Leaf)) {
  throw "Paper template not found: $templatePath"
}

$slug = ConvertTo-Slug -Value $Title
$targetPath = Join-Path $papersDir "$slug.md"

if (Test-Path -LiteralPath $targetPath) {
  throw "Paper file already exists: $targetPath"
}

$today = Get-Date -Format "yyyy-MM-dd"
$newLine = [Environment]::NewLine
$tagLines = ($Tags | ForEach-Object { "  - $_" }) -join $newLine
$safeTitle = $Title.Replace('"', '\"')
$safeAuthors = $Authors.Replace('"', '\"')
$safeVenue = $Venue.Replace('"', '\"')
$safeStatus = $Status.Replace('"', '\"')
$safeReadingStatus = $ReadingStatus.Replace('"', '\"')
$safePriority = $Priority.Replace('"', '\"')
$safeLabel = $Label.Replace('"', '\"')

$content = [System.IO.File]::ReadAllText(
  $templatePath,
  [System.Text.Encoding]::UTF8
)
$content = $content.Replace("https://example.com", $Url)

$content = Replace-Line $content "(?m)^title:.*$" ('title: "' + $safeTitle + '"')
$content = Replace-Line $content "(?m)^authors:.*$" ('authors: "' + $safeAuthors + '"')
$content = Replace-Line $content "(?m)^year:.*$" "year: $Year"
$content = Replace-Line $content "(?m)^venue:.*$" ('venue: "' + $safeVenue + '"')
if (-not [string]::IsNullOrWhiteSpace($safeStatus)) {
  $content = Replace-Line $content "(?m)^status:.*$" ('status: "' + $safeStatus + '"')
}
if (-not [string]::IsNullOrWhiteSpace($safeReadingStatus)) {
  $content = Replace-Line $content "(?m)^reading_status:.*$" ('reading_status: "' + $safeReadingStatus + '"')
}
$content = Replace-Line $content "(?m)^priority:.*$" ('priority: "' + $safePriority + '"')
$content = Replace-Line $content "(?m)^rank:.*$" "rank: $Rank"
$content = Replace-Line $content "(?m)^reviewed_at:.*$" "reviewed_at: $today"
$content = Replace-Line $content "(?m)^updated_at:.*$" "updated_at: $today"
$content = Replace-Line $content "(?m)^permalink:.*$" "permalink: /papers/$slug/"
$content = Replace-Line $content "(?m)^  - label:.*$" "  - label: $safeLabel"
$content = Replace-Line $content "(?m)^    url:.*$" "    url: $Url"
$content = [regex]::Replace(
  $content,
  "(?ms)^tags:\r?\n.*?(?=^thesis:)",
  [System.Text.RegularExpressions.MatchEvaluator]{
    param($Match)
    return "tags:$newLine$tagLines$newLine"
  }
)

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($targetPath, $content, $utf8NoBom)

Write-Host "Created paper draft: $targetPath"
