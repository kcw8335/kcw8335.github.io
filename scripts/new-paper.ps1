param(
  [Parameter(Mandatory = $true)]
  [string]$Title,

  [string]$Authors = "",
  [int]$Year = (Get-Date).Year,
  [string]$Venue = "Working paper",
  [string]$Status = "Reading",
  [string]$ReadingStatus = "Draft",
  [string]$Priority = "medium",
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

$repoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$papersDir = Join-Path $repoRoot "papers"
New-Item -ItemType Directory -Force -Path $papersDir | Out-Null

$slug = ConvertTo-Slug -Value $Title
$targetPath = Join-Path $papersDir "$slug.md"

if (Test-Path -LiteralPath $targetPath) {
  throw "Paper file already exists: $targetPath"
}

$today = Get-Date -Format "yyyy-MM-dd"
$tagLines = ($Tags | ForEach-Object { "  - $_" }) -join [Environment]::NewLine
$safeTitle = $Title.Replace('"', '\"')
$safeAuthors = $Authors.Replace('"', '\"')
$safeVenue = $Venue.Replace('"', '\"')
$safeStatus = $Status.Replace('"', '\"')
$safeReadingStatus = $ReadingStatus.Replace('"', '\"')
$safePriority = $Priority.Replace('"', '\"')
$safeLabel = $Label.Replace('"', '\"')

$content = @"
---
title: "$safeTitle"
authors: "$safeAuthors"
year: $Year
venue: "$safeVenue"
status: "$safeStatus"
reading_status: "$safeReadingStatus"
priority: "$safePriority"
reviewed_at: $today
updated_at: $today
source_type: "paper"
copyright_risk: "low"
permalink: /papers/$slug/
tags:
$tagLines
thesis: "Write the one-line thesis here."
links:
  - label: $safeLabel
    url: $Url
---

> Copyright note: Do not upload the source PDF, abstract in full, tables, or figures. Link to the official source and write your own summary.

## Why It Matters

## Data

## Main Findings

## Source Checks

- Official link: $Url
- Data needed for replication:
- Direct quote needed: no

## Investment Interpretation

## Limitations

## My Conclusion
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($targetPath, $content, $utf8NoBom)

Write-Host "Created paper draft: $targetPath"
