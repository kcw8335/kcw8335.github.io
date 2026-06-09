---
layout: default
title: 분석 틀
description: 코인 투자 논문을 읽을 때 쓰는 공통 리뷰 프레임입니다.
permalink: /methodology/
---

# 분석 틀

논문을 읽을 때는 “좋은 이야기인가?”보다 “반복 가능한 수익률 설명인가?”를 먼저 봅니다.

<div class="framework-grid">
  <div class="framework-item">
    <strong>1. 질문</strong>
    <span>무엇을 설명하거나 예측하는가?</span>
  </div>
  <div class="framework-item">
    <strong>2. 데이터</strong>
    <span>기간, 거래소, 생존편향, 유동성 필터가 적절한가?</span>
  </div>
  <div class="framework-item">
    <strong>3. 팩터</strong>
    <span>주식/금리/달러/크립토 고유 요인이 분리되는가?</span>
  </div>
  <div class="framework-item">
    <strong>4. 실행</strong>
    <span>수수료, 슬리피지, 회전율, 숏 가능성을 버티는가?</span>
  </div>
</div>

## 핵심 체크리스트

| 항목 | 질문 |
|---|---|
| 표본 기간 | 강세장 한 구간에만 맞춘 결과는 아닌가? |
| 종목 구성 | BTC/ETH 중심인지, 알트코인 횡단면까지 포함하는지 |
| 유동성 | 실제 체결 가능한 코인만 대상으로 했는지 |
| 팩터 통제 | 시장 베타, 모멘텀, 규모, 유동성, 변동성을 분리했는지 |
| 과최적화 | 파라미터가 너무 많거나 사후적으로 고른 변수는 아닌지 |
| 비용 | 거래비용과 세금 전후로 결론이 바뀌는지 |

## 기본 모델

코인 수익률을 볼 때 기본 출발점은 아래처럼 둡니다.

```text
R_crypto = alpha
         + beta_market * crypto_market
         + beta_equity * equity_market
         + beta_liquidity * liquidity
         + beta_momentum * momentum
         + beta_attention * attention
         + error
```

초기 논문은 코인 고유 요인의 비중이 크다고 봤지만, 최근 시장에서는 ETF, 기관 자금, 금리, 달러 유동성 때문에 대형 코인의 전통 금융 팩터 노출도 같이 봐야 합니다.

