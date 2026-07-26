# gongmojun-frontend

공공데이터 공모전 프론트엔드. Next.js 15 (App Router) + TypeScript.

## 로컬 실행

```bash
npm install && npm run dev
```

## API 계약

백엔드의 `openapi.yaml` 이 계약이다. CI가 자동으로 `.contract/` 에 받아온다.
로컬에서 확인하려면:

```bash
gh api repos/superpangE/gongmojun-backend/contents/openapi.yaml --jq .content | base64 -d
```

계약에 없는 API는 호출하지 않는다. 필요하면 백엔드 레포에 이슈를 판다.

## 자동화

- 이슈에 `ai-dev` 라벨 → AI가 구현하고 PR 생성
- PR 생성 → 프론트 페르소나(자기 리뷰) + 백엔드 페르소나(계약 위반 검사)
