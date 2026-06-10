---
layout: default
title: 논문 리뷰
description: 코인 투자 논문과 팩터 리서치를 정리하는 개인 연구 노트입니다.
---

{% assign papers = site.pages | where: "type", "paper" | sort: "rank" %}
{% assign paper_count = papers | size %}

<section class="blog-hero">
  <p class="eyebrow">Coin Study</p>
  <h1>코인 투자 논문 리뷰</h1>
  <p>코인 수익률, 팩터 노출, 모멘텀, 유동성, 투자자 관심도, 온체인 지표를 투자 관점에서 정리합니다.</p>
  <div class="hero-actions">
    <a class="primary-link" href="{{ '/reading-list/' | relative_url }}">Reading queue</a>
    <a class="secondary-link" href="{{ '/methodology/' | relative_url }}">Analysis method</a>
  </div>
</section>

<section class="blog-controls" aria-label="Paper filters">
  <div class="category-tabs">
    <button class="tab-pill is-active" type="button" data-filter="all">All</button>
    <button class="tab-pill" type="button" data-filter="asset-pricing">Asset pricing</button>
    <button class="tab-pill" type="button" data-filter="momentum">Momentum</button>
    <button class="tab-pill" type="button" data-filter="factor">Factor</button>
    <button class="tab-pill" type="button" data-filter="machine-learning">ML</button>
    <button class="tab-pill" type="button" data-filter="on-chain">On-chain</button>
    <button class="tab-pill" type="button" data-filter="risk">Risk</button>
    <button class="tab-pill" type="button" data-filter="arbitrage">Arbitrage</button>
  </div>
  <label class="search-control">
    <span>Search</span>
    <input data-paper-search type="search" placeholder="논문명, 저자, 태그 검색">
  </label>
</section>

<section class="stats-row" aria-label="Research stats">
  <div>
    <strong>{{ paper_count }}</strong>
    <span>Reviewed papers</span>
  </div>
  <div>
    <strong>4</strong>
    <span>Core lenses</span>
  </div>
  <div>
    <strong>0</strong>
    <span>PDF uploads</span>
  </div>
</section>

<section class="card-grid" id="paper-list">
  {% for paper in papers %}
    <article class="paper-card" data-paper-card data-search="{{ paper.title | downcase }} {{ paper.authors | downcase }} {{ paper.tags | join: ' ' | downcase }} {{ paper.year }} {{ paper.status | downcase }} {{ paper.reading_status | downcase }}">
      <a class="card-visual" href="{{ paper.url | relative_url }}" aria-label="{{ paper.title }}">
        <span class="visual-kicker">{{ paper.year }}</span>
        <strong>{{ paper.tags | first | default: 'crypto' }}</strong>
        <i></i>
      </a>
      <div class="card-body">
        <div class="card-meta">
          {% if paper.updated_at %}<time>{{ paper.updated_at }}</time>{% endif %}
          {% if paper.reading_status %}<span>{{ paper.reading_status }}</span>{% endif %}
        </div>
        <h2><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h2>
        {% if paper.authors %}<p class="authors-line">{{ paper.authors }}</p>{% endif %}
        {% if paper.thesis %}<p class="card-excerpt">{{ paper.thesis }}</p>{% endif %}
        {% if paper.tags %}
          <div class="tag-row">
            {% for tag in paper.tags %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
        <div class="card-links">
          <a href="{{ paper.url | relative_url }}">Read review</a>
          {% if paper.links %}
            {% assign first_link = paper.links | first %}
            <a href="{{ first_link.url }}" target="_blank" rel="noreferrer">{{ first_link.label }}</a>
          {% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
  <p class="empty-state" data-empty-state>검색 결과가 없습니다.</p>
</section>

<script src="{{ '/assets/js/site.js' | relative_url }}"></script>
