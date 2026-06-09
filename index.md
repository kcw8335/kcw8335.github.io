---
layout: default
title: 논문 리뷰
description: 코인 투자 논문과 팩터 리서치를 정리하는 개인 연구 노트입니다.
---

{% assign papers = site.pages | where: "type", "paper" | sort: "updated_at" | reverse %}
{% assign paper_count = papers | size %}

<section class="dashboard">
  <div class="intro">
    <p class="eyebrow">Crypto Investment Research</p>
    <h1>코인 투자 논문 리뷰</h1>
    <p class="lead">코인 수익률, 팩터 노출, 모멘텀, 유동성, 투자자 관심도, 온체인 지표를 투자 관점에서 정리합니다.</p>
    <label class="search-box">
      <span>⌕</span>
      <input data-paper-search type="search" placeholder="논문명, 저자, 태그 검색">
    </label>
  </div>

  <aside class="metric-panel" aria-label="Research stats">
    <div class="metric">
      <strong>{{ paper_count }}</strong>
      <span>정리한 논문</span>
    </div>
    <div class="metric">
      <strong>상시</strong>
      <span>새 논문을 읽을 때마다 업데이트</span>
    </div>
    <div class="metric">
      <strong>4</strong>
      <span>핵심 렌즈: 수익률, 리스크, 팩터, 실행 가능성</span>
    </div>
  </aside>
</section>

<section class="section-title">
  <div>
    <h2>리뷰 목록</h2>
    <p>최근 업데이트순으로 정렬합니다. 새 논문은 <code>scripts/new-paper.ps1</code>로 초안을 만들 수 있습니다.</p>
  </div>
</section>

<section class="paper-list" id="paper-list">
  {% for paper in papers %}
    <article class="paper-card" data-paper-card data-search="{{ paper.title | downcase }} {{ paper.authors | downcase }} {{ paper.tags | join: ' ' | downcase }} {{ paper.year }} {{ paper.status | downcase }} {{ paper.reading_status | downcase }}">
      <div>
        <p class="paper-meta">
          {{ paper.year }}
          {% if paper.venue %}<span>{{ paper.venue }}</span>{% endif %}
          {% if paper.status %}<span>{{ paper.status }}</span>{% endif %}
          {% if paper.reading_status %}<span>{{ paper.reading_status }}</span>{% endif %}
          {% if paper.updated_at %}<span>updated {{ paper.updated_at }}</span>{% endif %}
        </p>
        <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
        {% if paper.thesis %}<p>{{ paper.thesis }}</p>{% endif %}
        {% if paper.tags %}
          <div class="tag-row">
            {% for tag in paper.tags %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
      </div>
      <div class="paper-actions">
        <a class="button" href="{{ paper.url | relative_url }}">리뷰 보기</a>
      </div>
    </article>
  {% endfor %}
  <p class="empty-state" data-empty-state>검색 결과가 없습니다.</p>
</section>

<script src="{{ '/assets/js/site.js' | relative_url }}"></script>
