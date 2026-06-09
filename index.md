---
layout: default
title: 논문 리뷰
description: 코인 투자 논문과 팩터 리서치를 정리하는 개인 연구 노트입니다.
---

{% assign papers = site.pages | where: "type", "paper" | sort: "updated_at" | reverse %}
{% assign paper_count = papers | size %}

<section class="workbench-hero">
  <div class="hero-copy">
    <p class="eyebrow">Coin Study Research Desk</p>
    <h1>코인 투자 논문을 팩터 관점으로 정리합니다</h1>
    <p class="lead">수익률, 시장 베타, 모멘텀, 유동성, 투자자 관심도, 온체인 변수를 분리해서 읽는 개인 리서치 라이브러리입니다.</p>
  </div>

  <aside class="signal-board" aria-label="Research map">
    <div class="signal-head">
      <span>Research Map</span>
      <strong>Crypto Factors</strong>
    </div>
    <div class="factor-bars">
      <div class="factor-bar">
        <span>Market beta</span>
        <i style="--level: 72%"></i>
      </div>
      <div class="factor-bar">
        <span>Momentum</span>
        <i style="--level: 86%"></i>
      </div>
      <div class="factor-bar">
        <span>Attention</span>
        <i style="--level: 64%"></i>
      </div>
      <div class="factor-bar">
        <span>Liquidity</span>
        <i style="--level: 58%"></i>
      </div>
    </div>
    <div class="market-strip" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
  </aside>
</section>

<section class="stats-strip" aria-label="Research stats">
  <div class="stat-cell">
    <strong>{{ paper_count }}</strong>
    <span>Reviewed papers</span>
  </div>
  <div class="stat-cell">
    <strong>4</strong>
    <span>Core lenses</span>
  </div>
  <div class="stat-cell">
    <strong>0</strong>
    <span>PDF uploads</span>
  </div>
  <div class="stat-cell">
    <strong>2026-06-09</strong>
    <span>Last update</span>
  </div>
</section>

<section class="research-grid">
  <aside class="filter-panel" aria-label="Paper filters">
    <h2>Filters</h2>
    <div class="filter-group">
      <span class="filter-label">Status</span>
      <button class="filter-pill is-active" type="button" data-filter="all">All</button>
      <button class="filter-pill" type="button" data-filter="리뷰 완료">Reviewed</button>
      <button class="filter-pill" type="button" data-filter="읽는 중">Reading</button>
      <button class="filter-pill" type="button" data-filter="초안">Draft</button>
    </div>
    <div class="filter-group">
      <span class="filter-label">Factor</span>
      <button class="filter-pill" type="button" data-filter="momentum">Momentum</button>
      <button class="filter-pill" type="button" data-filter="asset-pricing">Asset pricing</button>
      <button class="filter-pill" type="button" data-filter="investor-attention">Attention</button>
    </div>
  </aside>

  <section class="research-main" aria-label="Paper library">
    <div class="section-bar">
      <div>
        <p class="eyebrow">Library</p>
        <h2>Papers</h2>
      </div>
      <label class="search-box">
        <span>Search</span>
        <input data-paper-search type="search" placeholder="논문명, 저자, 태그">
      </label>
    </div>

    <div class="paper-table" id="paper-list">
      <div class="paper-table-head" aria-hidden="true">
        <span>Paper</span>
        <span>Signal</span>
        <span>Updated</span>
      </div>

      {% for paper in papers %}
        <article class="paper-row" data-paper-card data-search="{{ paper.title | downcase }} {{ paper.authors | downcase }} {{ paper.tags | join: ' ' | downcase }} {{ paper.year }} {{ paper.status | downcase }} {{ paper.reading_status | downcase }}">
          <div class="paper-primary">
            <p class="paper-meta">
              {{ paper.year }}
              {% if paper.venue %}<span>{{ paper.venue }}</span>{% endif %}
              {% if paper.status %}<span>{{ paper.status }}</span>{% endif %}
            </p>
            <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
            {% if paper.authors %}<p class="authors-line">{{ paper.authors }}</p>{% endif %}
            {% if paper.thesis %}<p class="paper-thesis">{{ paper.thesis }}</p>{% endif %}
            {% if paper.tags %}
              <div class="tag-row">
                {% for tag in paper.tags %}
                  <span class="tag">{{ tag }}</span>
                {% endfor %}
              </div>
            {% endif %}
          </div>
          <div class="paper-signal">
            {% if paper.reading_status %}<strong>{{ paper.reading_status }}</strong>{% else %}<strong>Tracked</strong>{% endif %}
            {% if paper.priority %}<span>{{ paper.priority }}</span>{% endif %}
          </div>
          <div class="paper-updated">
            {% if paper.updated_at %}<time>{{ paper.updated_at }}</time>{% endif %}
            <a class="row-link" href="{{ paper.url | relative_url }}">Open</a>
          </div>
        </article>
      {% endfor %}
      <p class="empty-state" data-empty-state>검색 결과가 없습니다.</p>
    </div>
  </section>

  <aside class="focus-panel" aria-label="Research focus">
    <h2>Focus</h2>
    <div class="focus-item">
      <span>Core</span>
      <strong>Crypto asset pricing</strong>
    </div>
    <div class="focus-item">
      <span>Next</span>
      <strong>Common risk factors</strong>
    </div>
    <div class="focus-item">
      <span>Risk</span>
      <strong>Execution cost, survivorship bias</strong>
    </div>
  </aside>
</section>

<script src="{{ '/assets/js/site.js' | relative_url }}"></script>
