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

