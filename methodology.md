---
layout: default
title: 분석 틀
description: 코인 투자 논문을 질문, 데이터, 설명력, 실행 가능성의 네 단계로 검토하는 Coin Study의 공통 분석 프레임입니다.
permalink: /methodology/
---

<section class="page-hero">
  <div class="page-hero__copy">
    <p class="eyebrow"><span>Review framework</span> / Evidence to execution</p>
    <h1>좋은 이야기를<br>투자 근거와 구분한다.</h1>
    <p>
      논문의 흥미로운 결론보다 먼저 질문의 범위, 데이터의 품질, 다른 팩터를 통제한 뒤의 설명력,
      실제 매매 비용을 차례로 확인합니다.
    </p>
  </div>
  <aside class="page-hero__aside">
    <strong>핵심 원칙</strong>
    <p>
      “통계적으로 유의하다”와 “실제로 거래할 수 있다”는 다른 문장입니다.
      Coin Study는 두 문장을 분리해서 기록합니다.
    </p>
  </aside>
</section>

<section class="content-section">
  <div class="section-heading">
    <div>
      <p class="section-label">Four checkpoints</p>
      <h2>모든 리뷰에 적용하는 네 단계</h2>
    </div>
    <p>연구 질문에서 체결 가능성까지 한 단계라도 약하면 결론의 강도를 낮춥니다.</p>
  </div>

  <div class="method-grid">
    <article class="method-card">
      <span>01 / Question</span>
      <h3>무엇을 설명하는가</h3>
      <p>시장 전체 수익률, 코인 간 횡단면 차이, 위험 측정, 포트폴리오 배분을 먼저 구분합니다.</p>
      <ul>
        <li>설명인가 예측인가</li>
        <li>평균수익인가 꼬리위험인가</li>
      </ul>
    </article>
    <article class="method-card">
      <span>02 / Data</span>
      <h3>데이터가 버티는가</h3>
      <p>표본 기간, 거래소, 코인 유니버스, 상장폐지와 생존편향, 유동성 필터를 확인합니다.</p>
      <ul>
        <li>강세장 한 구간인지</li>
        <li>실제 체결 가능한 종목인지</li>
      </ul>
    </article>
    <article class="method-card">
      <span>03 / Identification</span>
      <h3>다른 요인과 분리되는가</h3>
      <p>시장, 사이즈, 모멘텀, 유동성, 변동성, 주식시장 노출을 통제하고도 결과가 남는지 봅니다.</p>
      <ul>
        <li>기존 팩터 대비 증분 설명력</li>
        <li>표본 밖·하위 기간 검증</li>
      </ul>
    </article>
    <article class="method-card">
      <span>04 / Execution</span>
      <h3>매매 후에도 남는가</h3>
      <p>수수료, 슬리피지, 회전율, 시장충격, 숏과 자금 이동 제약을 반영합니다.</p>
      <ul>
        <li>비용 차감 후 성과</li>
        <li>급락장 유동성과 용량</li>
      </ul>
    </article>
  </div>
</section>

<section class="content-section content-section--bordered">
  <div class="section-heading">
    <div>
      <p class="section-label">Evidence ladder</p>
      <h2>근거의 강도를 나누는 기준</h2>
    </div>
    <p>등급은 논문의 권위를 평가하는 점수가 아니라, 투자 판단에 얼마나 직접 쓸 수 있는지 표시하는 장치입니다.</p>
  </div>

  <div class="evidence-table">
    <div class="evidence-row">
      <span class="evidence-grade">LEVEL A</span>
      <strong>반복성과 실행 가능성을 함께 확인</strong>
      <p>여러 표본과 모델에서 유지되고, 유동성 필터와 거래비용을 반영한 뒤에도 결론이 남습니다.</p>
    </div>
    <div class="evidence-row">
      <span class="evidence-grade">LEVEL B</span>
      <strong>통계적 패턴은 있으나 구현 조건이 큼</strong>
      <p>결과는 설득력 있지만 소형 코인, 숏 가능성, 높은 회전율 등 현실적인 제약이 큽니다.</p>
    </div>
    <div class="evidence-row">
      <span class="evidence-grade">LEVEL C</span>
      <strong>흥미로운 가설 또는 특정 표본의 결과</strong>
      <p>변수 선택과 표본 의존성이 크거나, 별도의 재현과 최신 시장 검증이 더 필요합니다.</p>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="model-panel">
    <div>
      <p class="section-label">Baseline model</p>
      <h2>수익을 먼저 분해한다</h2>
      <p>
        높은 수익률을 곧바로 알파라고 부르지 않습니다. 시장 전체, 전통 금융 노출,
        유동성, 모멘텀과 관심도로 설명되는 부분을 뺀 뒤 남는 값을 봅니다.
      </p>
    </div>
    <pre><code>R_crypto = alpha
         + beta_market    × crypto_market
         + beta_equity    × equity_market
         + beta_liquidity × liquidity
         + beta_momentum  × momentum
         + beta_attention × attention
         + error</code></pre>
  </div>
</section>

<section class="content-section">
  <div class="section-heading">
    <div>
      <p class="section-label">Quick audit</p>
      <h2>리뷰에서 반드시 답하는 질문</h2>
    </div>
    <p>아래 항목이 비어 있으면 좋은 아이디어일 수는 있어도 아직 투자 가능한 결론은 아닙니다.</p>
  </div>

  <div class="evidence-table">
    <div class="evidence-row">
      <strong>표본과 유니버스</strong>
      <p>BTC·ETH 중심인지, 알트코인 횡단면까지 포함하는지, 상장폐지 코인을 어떻게 처리했는가?</p>
      <span class="evidence-grade">DATA</span>
    </div>
    <div class="evidence-row">
      <strong>비교 기준</strong>
      <p>시장 베타, 사이즈, 모멘텀, 유동성과 비교해 새로운 신호가 추가 정보를 주는가?</p>
      <span class="evidence-grade">MODEL</span>
    </div>
    <div class="evidence-row">
      <strong>검증 방식</strong>
      <p>파라미터를 사후 선택하지 않았는가? 하위 기간이나 표본 밖에서도 방향이 유지되는가?</p>
      <span class="evidence-grade">ROBUSTNESS</span>
    </div>
    <div class="evidence-row">
      <strong>비용과 위험</strong>
      <p>수수료·슬리피지·시장충격·세금과 급락장 손실을 반영하면 결론이 어떻게 달라지는가?</p>
      <span class="evidence-grade">EXECUTION</span>
    </div>
  </div>
</section>
