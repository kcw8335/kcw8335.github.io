---
layout: default
title: 논문 리뷰
description: 코인 투자 논문과 팩터 리서치를 정리하는 개인 연구 노트입니다.
---

{% assign papers = site.pages | where: "type", "paper" | sort: "updated_at" | reverse %}
{% assign paper_count = papers | size %}

## 코인 투자 논문 리뷰

코인 수익률, 팩터 노출, 모멘텀, 유동성, 투자자 관심도, 온체인 지표를 투자 관점에서 정리합니다.

<div class="paper-summary" aria-label="Research stats">
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
</div>

<h2>Papers</h2>

<div class="paper-toolbar">
  <input data-paper-search type="search" placeholder="논문명, 저자, 태그 검색">
</div>

<div class="publications">
  <ol class="bibliography paper-list" id="paper-list">
    {% for paper in papers %}
      <li data-paper-card data-search="{{ paper.title | downcase }} {{ paper.authors | downcase }} {{ paper.tags | join: ' ' | downcase }} {{ paper.year }} {{ paper.status | downcase }} {{ paper.reading_status | downcase }}">
        <span class="paper-title"><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></span>
        {% if paper.authors %}<p class="paper-authors">{{ paper.authors }}</p>{% endif %}
        <p class="paper-meta">
          {{ paper.year }}
          {% if paper.venue %} · {{ paper.venue }}{% endif %}
          {% if paper.reading_status %} · {{ paper.reading_status }}{% endif %}
          {% if paper.updated_at %} · updated {{ paper.updated_at }}{% endif %}
        </p>
        {% if paper.thesis %}<p class="paper-thesis">{{ paper.thesis }}</p>{% endif %}
        {% if paper.tags %}
          <div class="tag-row">
            {% for tag in paper.tags %}
              <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
        {% endif %}
        <div class="links">
          <a class="btn" href="{{ paper.url | relative_url }}">Review</a>
          {% if paper.links %}
            {% for link in paper.links %}
              <a class="btn" href="{{ link.url }}" target="_blank" rel="noreferrer">{{ link.label }}</a>
            {% endfor %}
          {% endif %}
        </div>
      </li>
    {% endfor %}
  </ol>
  <p class="empty-state" data-empty-state>검색 결과가 없습니다.</p>
</div>

<h2>Reading Queue</h2>

다음 업데이트 후보는 횡단면 팩터, 머신러닝 기반 수익률 예측, ETF 이후 전통 금융시장 노출 연구입니다.

<script src="{{ '/assets/js/site.js' | relative_url }}"></script>
