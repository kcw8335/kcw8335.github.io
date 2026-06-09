# Coin Study

코인 투자 논문과 팩터 리서치를 정리하는 GitHub Pages 사이트입니다.

## 구조

```text
.
├── _config.yml
├── _layouts/
├── assets/
├── papers/
├── templates/
├── index.md
├── methodology.md
└── reading-list.md
```

## 새 논문 추가

1. `templates/paper.md`를 복사해서 `papers/논문-slug.md`로 만듭니다.
2. 상단 front matter의 `title`, `authors`, `year`, `tags`, `links`를 채웁니다.
3. 본문에 리뷰를 작성합니다.
4. PDF 원문은 저작권 문제가 있을 수 있으니 저장소에 올리지 말고 DOI, SSRN, NBER, arXiv 링크를 권장합니다.

## 저작권 안전 규칙

- 논문 PDF, 유료 본문, 초록 전문, 표, 그림, 스크린샷을 저장소에 올리지 않습니다.
- 리뷰는 원문 표현을 베끼지 않고 직접 요약과 해석으로 작성합니다.
- 직접 인용은 꼭 필요한 짧은 문장만 쓰고 출처 링크를 붙입니다.
- 논문 원문은 DOI, SSRN, NBER, arXiv, 출판사 페이지로 연결합니다.
- 애매하면 복사하지 말고 링크만 남깁니다.

커밋 전에 아래 검사를 실행하면 PDF나 긴 인용을 실수로 넣는 일을 줄일 수 있습니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-content.ps1
```

## GitHub Pages에 올리기

개인 사이트로 쓰려면 GitHub에서 `<본인아이디>.github.io`라는 공개 저장소를 만든 뒤 아래처럼 올립니다.

```powershell
git init
git branch -M main
git add .
git commit -m "Create coin paper review site"
git remote add origin https://github.com/<본인아이디>/<본인아이디>.github.io.git
git push -u origin main
```

프로젝트 사이트로 쓰려면 아무 공개 저장소에 올린 뒤 GitHub repository settings에서 Pages source를 `main` branch, `/root`로 설정하면 됩니다.

## 원문 파일 관리

로컬에서 읽기 위해 받은 PDF는 보관해도 되지만, `.gitignore`에 의해 GitHub에는 올라가지 않습니다. 원문을 공유해야 할 때는 파일을 올리지 말고 공식 페이지 링크를 공유합니다.
