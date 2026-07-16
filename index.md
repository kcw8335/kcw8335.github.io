---
layout: default
title: 암호화폐 리서치 라이브러리
description: 암호화폐 수익률의 원인과 실제 투자에 남는 신호를 학술 논문으로 검토하는 한국어 리서치 라이브러리입니다.
---

{% assign papers = site.pages | where: "type", "paper" | sort: "rank" %}
{% assign paper_count = papers | size %}
{% assign papers_by_year = papers | sort: "year" %}
{% assign oldest_paper = papers_by_year | first %}
{% assign newest_paper = papers_by_year | last %}
{% assign papers_by_update = papers | sort: "updated_at" %}
{% assign latest_update = papers_by_update | last %}
{% assign core_papers = papers | where: "priority", "core" %}
{% assign core_count = core_papers | size %}

<section class="home-hero">
  <div class="home-hero__copy">
    <p class="eyebrow"><span>Independent research</span> / Crypto asset pricing</p>
    <h1>코인 시장을<br><em>논문으로 해석하다.</em></h1>
    <p class="hero-lead">
      코인 수익률은 무엇으로 설명되고, 어떤 신호가 실제 매매까지 살아남는가?
      학술 논문을 데이터·방법·핵심 발견·실전 한계로 나눠 정리합니다.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="{{ '/reading-list/' | relative_url }}#reading-paths">처음 읽는 3편</a>
      <a class="button" href="{{ '/methodology/' | relative_url }}">분석 기준 보기</a>
    </div>
    <p class="hero-disclaimer">
      <span aria-hidden="true">◆</span>
      원문 파일을 재배포하지 않고 공식 출처와 독자적인 해석만 제공합니다.
    </p>
  </div>

  <aside class="research-console" aria-label="네 가지 연구 관점">
    <div class="console-head">
      <span>RESEARCH MAP</span>
      <span>04 LENSES</span>
    </div>
    <ol class="console-list">
      <li>
        <span class="console-index">01</span>
        <div>
          <strong>수익률의 원인</strong>
          <small>시장 · 사이즈 · 모멘텀 · 관심도</small>
        </div>
        <i aria-hidden="true"></i>
      </li>
      <li>
        <span class="console-index">02</span>
        <div>
          <strong>종목 선택</strong>
          <small>가격 · 유동성 · 온체인 · ML</small>
        </div>
        <i aria-hidden="true"></i>
      </li>
      <li>
        <span class="console-index">03</span>
        <div>
          <strong>실행 가능성</strong>
          <small>비용 · 숏 · 거래소 · 시장 마찰</small>
        </div>
        <i aria-hidden="true"></i>
      </li>
      <li>
        <span class="console-index">04</span>
        <div>
          <strong>포트폴리오 생존</strong>
          <small>꼬리위험 · 상관관계 · 적정 비중</small>
        </div>
        <i aria-hidden="true"></i>
      </li>
    </ol>
    <div class="console-foot">
      <span>Evidence first</span>
      <span>Execution aware</span>
    </div>
  </aside>
</section>

<section class="research-stats" aria-label="리서치 현황">
  <div>
    <span class="stat-value">{{ paper_count }}</span>
    <span class="stat-label">완료된 논문 리뷰</span>
  </div>
  <div>
    <span class="stat-value">{{ core_count }}</span>
    <span class="stat-label">처음 읽을 핵심 논문</span>
  </div>
  <div>
    <span class="stat-value">{{ oldest_paper.year }}—{{ newest_paper.year }}</span>
    <span class="stat-label">수록 논문 출판연도</span>
  </div>
  <div>
    <span class="stat-value">{{ latest_update.updated_at | date: "%Y.%m.%d" }}</span>
    <span class="stat-label">최근 리뷰 업데이트</span>
  </div>
</section>

<section class="home-section home-section--insights">
  <div class="section-heading">
    <div>
      <p class="section-label">What the papers say</p>
      <h2>현재까지 연결되는 결론</h2>
    </div>
    <p>한 논문의 숫자보다 여러 연구에서 반복되는 패턴과 서로 충돌하는 지점을 우선합니다.</p>
  </div>

  <div class="insight-grid">
    <article>
      <span>01 / Common factors</span>
      <h3>시장·사이즈·모멘텀이 공통 언어다</h3>
      <p>코인별 이야기를 보기 전에 전체 시장 상승, 소형 코인 노출, 최근 추세가 수익의 얼마를 설명하는지 분리합니다.</p>
    </article>
    <article>
      <span>02 / Signal quality</span>
      <h3>더 많은 데이터가 곧 더 좋은 신호는 아니다</h3>
      <p>머신러닝과 온체인 특성은 보조 설명력을 주지만, 표본 밖에서도 살아남는지와 거래 가능성을 따로 확인해야 합니다.</p>
    </article>
    <article>
      <span>03 / Real-world frictions</span>
      <h3>백테스트와 체결 사이에 마찰이 있다</h3>
      <p>소형·비유동 코인, 숏 제약, 수수료와 슬리피지는 논문 속 초과수익을 실제 포트폴리오에서 크게 줄일 수 있습니다.</p>
    </article>
    <article>
      <span>04 / Portfolio survival</span>
      <h3>분산효과는 급락장에서 다시 측정해야 한다</h3>
      <p>평시 상관관계뿐 아니라 꼬리위험, 유동성 고갈, 시장 스트레스 때의 동조화를 함께 봅니다.</p>
    </article>
  </div>
</section>

<section class="home-section">
  <div class="section-heading">
    <div>
      <p class="section-label">Start here</p>
      <h2>먼저 읽을 핵심 논문</h2>
    </div>
    <p>시장 전체의 움직임과 코인 간 수익률 차이를 이해하는 출발점입니다.</p>
  </div>

  <div class="featured-grid">
    {% for paper in core_papers %}
      <article class="featured-card">
        <div class="featured-card__meta">
          <span>CORE 0{{ forloop.index }}</span>
          <span>{{ paper.year }} · {{ paper.venue }}</span>
        </div>
        <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
        <p>{{ paper.thesis }}</p>
        {% if paper.tags %}
          <div class="tag-row">
            {% for tag in paper.tags limit: 4 %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
        <a class="text-link" href="{{ paper.url | relative_url }}">핵심 리뷰 읽기 <span aria-hidden="true">→</span></a>
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section library-section" id="library" data-paper-library>
  <div class="section-heading">
    <div>
      <p class="section-label">Research library</p>
      <h2>전체 논문 탐색</h2>
    </div>
    <p>주제별로 좁히거나 제목·저자·키워드로 검색할 수 있습니다.</p>
  </div>

  <div class="library-toolbar">
    <div class="category-tabs" role="group" aria-label="논문 주제 필터">
      <button class="filter-chip is-active" type="button" data-filter="all" aria-pressed="true">전체</button>
      <button class="filter-chip" type="button" data-filter="asset-pricing" aria-pressed="false">자산가격</button>
      <button class="filter-chip" type="button" data-filter="factor,factor-portfolio" aria-pressed="false">팩터</button>
      <button class="filter-chip" type="button" data-filter="momentum" aria-pressed="false">모멘텀</button>
      <button class="filter-chip" type="button" data-filter="machine-learning" aria-pressed="false">머신러닝</button>
      <button class="filter-chip" type="button" data-filter="on-chain" aria-pressed="false">온체인</button>
      <button class="filter-chip" type="button" data-filter="tail-risk,risk-management,risk-premium" aria-pressed="false">리스크</button>
      <button class="filter-chip" type="button" data-filter="arbitrage,market-microstructure,exchanges" aria-pressed="false">시장구조</button>
      <button class="filter-chip" type="button" data-filter="portfolio,allocation,diversification" aria-pressed="false">포트폴리오</button>
    </div>

    <div class="library-tools">
      <div class="search-control">
        <label class="visually-hidden" for="paper-search">논문 검색</label>
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input id="paper-search" data-paper-search type="search" autocomplete="off" placeholder="논문명, 저자, 태그 검색">
        <button class="search-clear" type="button" data-search-clear hidden aria-label="검색어 지우기">×</button>
      </div>

      <label class="sort-control">
        <span>정렬</span>
        <select data-paper-sort>
          <option value="rank">추천순</option>
          <option value="newest">최신 논문순</option>
          <option value="oldest">오래된 논문순</option>
          <option value="updated">최근 업데이트순</option>
        </select>
      </label>
    </div>
  </div>

  <div class="library-result" aria-live="polite">
    <span><strong data-result-count>{{ paper_count }}</strong>편 표시</span>
    <button type="button" data-reset-library>필터 초기화</button>
  </div>

  <div class="paper-grid" data-paper-grid>
    {% for paper in papers %}
      <article
        class="paper-card"
        data-paper-card
        data-rank="{{ paper.rank | default: 999 }}"
        data-year="{{ paper.year }}"
        data-updated="{{ paper.updated_at | date: '%Y-%m-%d' }}"
        data-tags="{{ paper.tags | join: ',' | downcase | escape }}"
        data-search="{{ paper.title | downcase | escape }} {{ paper.authors | downcase | escape }} {{ paper.venue | downcase | escape }} {{ paper.tags | join: ' ' | downcase | escape }} {{ paper.thesis | downcase | escape }} {{ paper.year }} {{ paper.status | downcase | escape }} {{ paper.reading_status | downcase | escape }}"
      >
        <div class="paper-card__top">
          <span class="paper-card__index">{% if paper.rank < 10 %}0{% endif %}{{ paper.rank }}</span>
          <span>{{ paper.year }}</span>
        </div>
        <div class="paper-card__signal" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i><i></i>
        </div>
        <div class="paper-card__body">
          <div class="paper-card__status">
            {% if paper.priority == 'core' %}
              <span class="status-chip status-chip--core">핵심</span>
            {% elsif paper.priority == 'high' %}
              <span class="status-chip">우선 읽기</span>
            {% else %}
              <span class="status-chip status-chip--muted">리뷰 완료</span>
            {% endif %}
            {% if paper.updated_at %}<time datetime="{{ paper.updated_at | date: '%Y-%m-%d' }}">updated {{ paper.updated_at | date: "%Y-%m-%d" }}</time>{% endif %}
          </div>
          <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
          {% if paper.thesis %}<p class="paper-card__excerpt">{{ paper.thesis }}</p>{% endif %}
          {% if paper.tags %}
            <div class="tag-row" aria-label="논문 태그">
              {% for tag in paper.tags limit: 4 %}
                <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
        <footer class="paper-card__footer">
          {% if paper.authors %}<p>{{ paper.authors }}</p>{% endif %}
          {% if paper.links %}
            {% assign source_link = paper.links | first %}
            {% for link in paper.links %}
              {% if link.label contains 'DOI' %}
                {% assign source_link = link %}
              {% endif %}
            {% endfor %}
            <a href="{{ source_link.url }}" target="_blank" rel="noopener noreferrer" aria-label="{{ paper.title | escape }} 원문 링크">
              원문 <span aria-hidden="true">↗</span>
            </a>
          {% endif %}
        </footer>
      </article>
    {% endfor %}
  </div>

  <div class="empty-state" data-empty-state hidden>
    <span aria-hidden="true">∅</span>
    <h3>조건에 맞는 논문이 없습니다.</h3>
    <p>검색어를 줄이거나 전체 필터로 다시 확인해 보세요.</p>
    <button class="button" type="button" data-empty-reset>전체 리뷰 보기</button>
  </div>
</section>

<section class="home-section reading-guide">
  <div class="section-heading">
    <div>
      <p class="section-label">How to read</p>
      <h2>리뷰를 읽는 세 가지 순서</h2>
    </div>
    <p>흥미로운 결론에서 멈추지 않고 실제 투자 판단으로 넘어가기 위한 최소한의 순서입니다.</p>
  </div>

  <ol class="guide-grid">
    <li>
      <span>01</span>
      <h3>질문을 확인한다</h3>
      <p>논문이 시장 전체를 설명하는지, 코인 간 차이를 예측하는지, 위험을 측정하는지 먼저 구분합니다.</p>
    </li>
    <li>
      <span>02</span>
      <h3>근거의 강도를 본다</h3>
      <p>표본 기간, 거래소, 생존편향, 팩터 통제와 표본 밖 검증이 결론을 얼마나 지지하는지 확인합니다.</p>
    </li>
    <li>
      <span>03</span>
      <h3>실행 비용을 뺀다</h3>
      <p>수수료, 슬리피지, 회전율, 숏 가능성과 급락장 유동성을 반영한 뒤 남는 신호만 봅니다.</p>
    </li>
  </ol>

  <a class="section-cta" href="{{ '/methodology/' | relative_url }}">
    <span>
      <small>Review framework</small>
      <strong>Coin Study의 전체 분석 기준 보기</strong>
    </span>
    <span aria-hidden="true">→</span>
  </a>
</section>
