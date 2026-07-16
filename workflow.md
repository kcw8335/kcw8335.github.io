---
layout: default
title: 운영 흐름
description: 논문 수집, 리뷰 작성, 검증, 업데이트까지 Coin Study의 콘텐츠 품질을 유지하는 운영 절차입니다.
permalink: /workflow/
---

<section class="page-hero">
  <div class="page-hero__copy">
    <p class="eyebrow"><span>Editorial workflow</span> / Repeatable research</p>
    <h1>빠르게 쌓되<br>검증 절차는 줄이지 않는다.</h1>
    <p>
      논문 링크 수집부터 직접 요약, 투자 해석, 저작권 점검과 업데이트까지 같은 흐름을 반복합니다.
      목표는 리뷰 수보다 다시 확인할 수 있는 연구 기록입니다.
    </p>
  </div>
  <aside class="page-hero__aside">
    <strong>완료의 정의</strong>
    <p>출처, 데이터, 핵심 발견, 실행 제약, 한계가 모두 기록되고 콘텐츠 검사를 통과해야 리뷰 완료로 표시합니다.</p>
  </aside>
</section>

<section class="content-section">
  <div class="section-heading">
    <div>
      <p class="section-label">Six-step loop</p>
      <h2>논문 한 편이 리뷰가 되는 과정</h2>
    </div>
    <p>메타데이터와 본문을 함께 관리해 검색, 추천 순서, 업데이트 상태가 자동으로 이어지게 합니다.</p>
  </div>

  <div class="workflow-grid">
    <article class="workflow-card">
      <span>01 / Source</span>
      <h3>공식 링크를 확보한다</h3>
      <p>DOI, SSRN, NBER, arXiv 또는 출판사 페이지를 먼저 저장합니다.</p>
    </article>
    <article class="workflow-card">
      <span>02 / Draft</span>
      <h3>초안과 메타데이터를 만든다</h3>
      <p>도우미 스크립트로 파일명, permalink, 날짜와 기본 섹션을 일관되게 생성합니다.</p>
    </article>
    <article class="workflow-card">
      <span>03 / Evidence</span>
      <h3>데이터와 방법을 분리한다</h3>
      <p>표본 기간, 코인 유니버스, 변수, 비교 모형과 강건성 검증을 기록합니다.</p>
    </article>
    <article class="workflow-card">
      <span>04 / Interpretation</span>
      <h3>논문 결론과 내 해석을 나눈다</h3>
      <p>저자가 보인 결과, 투자자가 얻을 수 있는 시사점, 추정이나 확장을 구분합니다.</p>
    </article>
    <article class="workflow-card">
      <span>05 / Friction</span>
      <h3>비용과 실패 조건을 적는다</h3>
      <p>수수료, 슬리피지, 회전율, 숏 제약, 용량과 급락장 위험을 별도로 확인합니다.</p>
    </article>
    <article class="workflow-card">
      <span>06 / Gate</span>
      <h3>검사 후 상태를 올린다</h3>
      <p>필수 메타데이터와 금지 파일, 긴 인용을 검사한 뒤에만 리뷰 완료로 변경합니다.</p>
    </article>
  </div>
</section>

<section class="content-section content-section--bordered">
  <div class="section-heading">
    <div>
      <p class="section-label">Create a draft</p>
      <h2>새 논문 추가</h2>
    </div>
    <p>PowerShell에서 실행하면 <code>papers/</code> 아래에 소문자 하이픈 형식의 리뷰 초안이 생성됩니다.</p>
  </div>

  <div class="command-panel">
    <header>
      <span>PowerShell</span>
      <span>scripts/new-paper.ps1</span>
    </header>
    <pre><code>powershell -ExecutionPolicy Bypass -File scripts/new-paper.ps1 `
  -Title "Common Risk Factors in Cryptocurrency" `
  -Authors "Yukun Liu, Aleh Tsyvinski, Xi Wu" `
  -Year 2022 `
  -Venue "Journal of Finance" `
  -Rank 9 `
  -Url "https://example.com"</code></pre>
  </div>
</section>

<section class="content-section">
  <div class="section-heading">
    <div>
      <p class="section-label">Metadata contract</p>
      <h2>목록과 상세 페이지를 연결하는 필드</h2>
    </div>
    <p>front matter는 단순 서지가 아니라 홈 정렬, 배지, 검색, SEO와 읽기 지도를 만드는 데이터입니다.</p>
  </div>

  <div class="evidence-table">
    <div class="evidence-row">
      <strong><code>rank</code></strong>
      <p>홈과 읽기 지도에서 사용하는 추천 읽기 순서입니다. 중복되지 않는 정수를 씁니다.</p>
      <span class="evidence-grade">1, 2, 3…</span>
    </div>
    <div class="evidence-row">
      <strong><code>reading_status</code></strong>
      <p>현재 작업 상태를 나타냅니다. 완료 여부는 본문 품질 점검 후 변경합니다.</p>
      <span class="evidence-grade">초안 / 읽는 중 / 리뷰 완료</span>
    </div>
    <div class="evidence-row">
      <strong><code>priority</code></strong>
      <p>사이트에서 핵심 논문과 우선 읽기 배지를 결정합니다.</p>
      <span class="evidence-grade">core / high / medium / low</span>
    </div>
    <div class="evidence-row">
      <strong><code>thesis</code></strong>
      <p>논문을 한 문장으로 요약하며 카드 설명과 페이지 메타 설명으로 사용합니다.</p>
      <span class="evidence-grade">직접 작성한 한 문장</span>
    </div>
    <div class="evidence-row">
      <strong><code>updated_at</code></strong>
      <p>최근 수정일입니다. 단순 오탈자보다 결론이나 근거가 바뀐 업데이트를 우선 기록합니다.</p>
      <span class="evidence-grade">YYYY-MM-DD</span>
    </div>
  </div>
</section>

<section class="content-section content-section--bordered">
  <div class="section-heading">
    <div>
      <p class="section-label">Quality gate</p>
      <h2>커밋 전 검사</h2>
    </div>
    <p>검사는 추적 중인 파일에서 재배포 금지 형식, 긴 인용문, 논문 메타데이터 누락을 찾습니다.</p>
  </div>

  <div class="command-panel">
    <header>
      <span>Required check</span>
      <span>must pass before commit</span>
    </header>
    <pre><code>powershell -ExecutionPolicy Bypass -File scripts/check-content.ps1</code></pre>
  </div>

  <a class="section-cta" href="{{ '/copyright-policy/' | relative_url }}">
    <span>
      <small>Copyright-safe research</small>
      <strong>원문을 복제하지 않고 리뷰하는 기준</strong>
    </span>
    <span aria-hidden="true">→</span>
  </a>
</section>
