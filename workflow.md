---
layout: default
title: 운영 흐름
description: 코인 투자 논문 리뷰를 계속 업데이트하기 위한 관리 절차입니다.
permalink: /workflow/
---

# 운영 흐름

새 논문을 계속 추가할 수 있도록 리뷰 절차를 고정합니다. 목표는 빠르게 쌓되, 저작권과 투자 해석의 경계를 흐리지 않는 것입니다.

## 새 논문 추가

PowerShell에서 아래처럼 실행하면 `papers/` 아래에 새 리뷰 초안이 생깁니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/new-paper.ps1 `
  -Title "Common Risk Factors in Cryptocurrency" `
  -Authors "Yukun Liu, Aleh Tsyvinski, Xi Wu" `
  -Year 2022 `
  -Venue "Journal of Finance" `
  -Url "https://example.com"
```

생성된 파일에서 본문을 채우고 `updated_at`을 수정합니다.

## 상태값

| 필드 | 값 예시 | 의미 |
|---|---|---|
| `reading_status` | `초안`, `읽는 중`, `리뷰 완료`, `업데이트 필요` | 현재 작업 상태 |
| `priority` | `core`, `high`, `medium`, `low` | 다시 볼 우선순위 |
| `updated_at` | `2026-06-09` | 목록 정렬 기준 |
| `copyright_risk` | `low`, `medium`, `high` | 원문 재사용 위험도 |

## 업데이트 루틴

1. 논문 링크를 먼저 저장합니다.
2. `scripts/new-paper.ps1`로 초안을 만듭니다.
3. 초록과 본문을 복사하지 않고 내 말로 요약합니다.
4. 투자 해석은 논문 결론과 분리해서 씁니다.
5. 커밋 전 `scripts/check-content.ps1`을 실행합니다.
6. 새 논문을 추가했다면 `reading-list.md`에서 해당 항목을 정리합니다.

## 커밋 전 검사

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-content.ps1
```

이 검사는 PDF, 문서 파일, 압축 파일이 Git에 올라가는지 확인하고, 긴 인용문과 필수 front matter 누락을 잡습니다.

