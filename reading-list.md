---
layout: default
title: 암호화폐 논문 읽기 지도
description: 목적별 추천 순서와 완료된 암호화폐 논문 리뷰, 다음 연구 후보를 한곳에서 확인하는 읽기 지도입니다.
permalink: /reading-list/
---

{% assign papers = site.pages | where: "type", "paper" | sort: "rank" %}
{% assign paper_count = papers | size %}
{% assign core_papers = papers | where: "priority", "core" %}
{% assign core_count = core_papers | size %}

<section class="page-hero">
  <div class="page-hero__copy">
    <p class="eyebrow"><span>Reading map</span> / {{ paper_count }} reviewed papers</p>
    <h1>목적에 따라<br>읽는 순서가 달라진다.</h1>
    <p>
      기초 자산가격결정, 퀀트 종목 선택, 리스크와 포트폴리오라는 세 경로로 나눴습니다.
      처음부터 전부 읽기보다 지금 필요한 질문에서 시작하세요.
    </p>
  </div>
  <aside class="page-hero__aside">
    <strong>현재 라이브러리</strong>
    <p>완료 리뷰 {{ paper_count }}편 · 핵심 논문 {{ core_count }}편. 목록은 각 논문의 메타데이터에서 자동으로 생성됩니다.</p>
  </aside>
</section>

<section class="content-section" id="reading-paths">
  <div class="section-heading">
    <div>
      <p class="section-label">Three reading paths</p>
      <h2>처음 읽는다면</h2>
    </div>
    <p>각 경로는 앞 논문의 개념이 다음 논문의 질문을 이해하도록 이어집니다.</p>
  </div>

  <div class="path-grid">
    <article class="path-card">
      <span class="path-card__label">Path A / Foundation</span>
      <h3>코인 수익률의 기본 구조</h3>
      <p>코인 고유 신호에서 공통 팩터, 위험 보상과 오가격 구분으로 확장합니다.</p>
      <ol>
        <li><a href="{{ '/papers/risks-and-returns-of-cryptocurrency/' | relative_url }}">Risks and Returns of Cryptocurrency</a></li>
        <li><a href="{{ '/papers/common-risk-factors-in-cryptocurrency/' | relative_url }}">Common Risk Factors in Cryptocurrency</a></li>
        <li><a href="{{ '/papers/mispricing-risk-compensation-cryptocurrency-returns/' | relative_url }}">Mispricing and Risk Compensation</a></li>
      </ol>
    </article>
    <article class="path-card">
      <span class="path-card__label">Path B / Selection</span>
      <h3>퀀트와 코인 선택</h3>
      <p>단순 모멘텀에서 여러 특성과 머신러닝, 온체인 팩터로 넘어갑니다.</p>
      <ol>
        <li><a href="{{ '/papers/common-risk-factors-in-cryptocurrency/' | relative_url }}">Common Risk Factors in Cryptocurrency</a></li>
        <li><a href="{{ '/papers/machine-learning-cross-section-cryptocurrency-returns/' | relative_url }}">Machine Learning and the Cross-Section</a></li>
        <li><a href="{{ '/papers/blockchain-factors/' | relative_url }}">Blockchain Factors</a></li>
      </ol>
    </article>
    <article class="path-card">
      <span class="path-card__label">Path C / Survival</span>
      <h3>리스크와 포트폴리오</h3>
      <p>차익거래의 현실적 마찰, 꼬리위험, 전통 자산과의 분산효과를 차례로 봅니다.</p>
      <ol>
        <li><a href="{{ '/papers/trading-and-arbitrage-in-cryptocurrency-markets/' | relative_url }}">Trading and Arbitrage in Cryptocurrency Markets</a></li>
        <li><a href="{{ '/papers/conditional-tail-risk-cryptocurrency-markets/' | relative_url }}">Conditional Tail-Risk</a></li>
        <li><a href="{{ '/papers/diversification-benefits-cryptocurrency-factor-portfolios/' | relative_url }}">Diversification Benefits of Factor Portfolios</a></li>
      </ol>
    </article>
  </div>
</section>

<section class="content-section content-section--bordered">
  <div class="section-heading">
    <div>
      <p class="section-label">Reviewed library</p>
      <h2>추천 읽기 순서</h2>
    </div>
    <p><code>rank</code> 메타데이터를 기준으로 자동 정렬됩니다. 새 논문을 추가하면 이 목록에도 자동 반영됩니다.</p>
  </div>

  <div class="review-list">
    {% for paper in papers %}
      <a class="review-list__item" href="{{ paper.url | relative_url }}">
        <span class="review-list__rank">{% if paper.rank < 10 %}0{% endif %}{{ paper.rank }}</span>
        <span class="review-list__year">{{ paper.year }}</span>
        <span class="review-list__title">
          <strong>{{ paper.title }}</strong>
          <small>{{ paper.authors }}</small>
        </span>
        <span class="review-list__venue">{{ paper.venue }}</span>
        <span class="review-list__arrow" aria-hidden="true">→</span>
      </a>
    {% endfor %}
  </div>
</section>

<section class="content-section content-section--bordered">
  <div class="section-heading">
    <div>
      <p class="section-label">Research backlog</p>
      <h2>다음 업데이트 후보</h2>
    </div>
    <p>기존 리뷰의 빈틈을 메우고 최근 시장 구조 변화를 설명할 수 있는 주제를 우선합니다.</p>
  </div>

  <div class="roadmap-grid">
    <article class="roadmap-card">
      <span>HIGH</span>
      <div>
        <h3>ETF 이후 BTC와 주식시장 상관관계</h3>
        <p>기관 자금 유입 이후 대형 코인의 주식·금리·달러 유동성 노출이 어떻게 달라졌는지 확인합니다.</p>
      </div>
    </article>
    <article class="roadmap-card">
      <span>HIGH</span>
      <div>
        <h3>DeFi 위험과 프로토콜 수익률</h3>
        <p>스마트컨트랙트, 거버넌스, 오라클과 청산 위험이 토큰 수익률에 어떤 프리미엄을 만드는지 봅니다.</p>
      </div>
    </article>
    <article class="roadmap-card">
      <span>MID</span>
      <div>
        <h3>스테이블코인과 달러 유동성</h3>
        <p>디페깅과 환매 압력, 거래소 유동성이 시장 스트레스의 선행 신호가 될 수 있는지 검토합니다.</p>
      </div>
    </article>
    <article class="roadmap-card">
      <span>MID</span>
      <div>
        <h3>옵션 기반 BTC 위험 프리미엄</h3>
        <p>내재변동성, 스큐와 꼬리위험 프리미엄이 현물·선물 전략에 주는 정보를 살펴봅니다.</p>
      </div>
    </article>
  </div>
</section>

<section class="content-section">
  <a class="section-cta" href="{{ '/workflow/' | relative_url }}">
    <span>
      <small>Contribution workflow</small>
      <strong>새 논문을 검토하고 추가하는 운영 방식</strong>
    </span>
    <span aria-hidden="true">→</span>
  </a>
</section>
