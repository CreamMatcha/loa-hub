# LOAHUB — 로스트아크 편의 도구 허브

흩어진 로스트아크 편의 도구를 한곳에 모으고, 공식 API로 원정대를 불러와
캐릭터 조회 사이트로 바로 이동할 수 있는 풀스택 웹앱.

## 기술 스택

### 프론트엔드 (`client/`)
- React 18 + Vite
- React Router (페이지 라우팅)
- Redux Toolkit + Redux Persist (상태 관리 + 새로고침 후 유지)
- Tailwind CSS + daisyUI (다크 골드 테마)
- react-bootstrap-icons (아이콘)
- axios

### 백엔드 (`server/`)
- Node.js + Express
- MongoDB + Mongoose
- JWT 인증 + bcrypt 해싱
- 로스트아크 공식 API 프록시 (API 키 보호)

## 주요 기능
1. **도구 모음** — 9개 카테고리, 18개 도구 사이트 바로가기 + 검색
2. **원정대 대시보드** — 공식 API로 부캐 전체 조회, 캐릭터별 조회 사이트 딥링크
3. **멀티 오픈** — 캐릭터 하나를 여러 조회 사이트에서 한 번에 열기
4. **즐겨찾기** — Redux Persist로 영속화
5. **회원가입/로그인** — JWT 인증, 서버에 데이터 저장(기기 간 동기화)
6. **About** — 제작자 소개

## 실행 방법

### 1. 백엔드
```bash
cd server
cp .env.example .env       # LOSTARK_API_KEY, JWT_SECRET 입력
# MongoDB 실행 필요 (로컬 mongod 또는 MongoDB Atlas URI)
npm install
npm start                  # http://localhost:4000
```

### 2. 프론트엔드
```bash
cd client
npm install
npm run dev                # http://localhost:5173 (/api → 4000 프록시)
```

## 환경변수 (server/.env)
| 키 | 설명 |
|----|------|
| `PORT` | 서버 포트 (기본 4000) |
| `MONGO_URI` | MongoDB 연결 문자열 |
| `JWT_SECRET` | JWT 서명 비밀키 (긴 랜덤 문자열) |
| `LOSTARK_API_KEY` | 로스트아크 공식 API 키 |
