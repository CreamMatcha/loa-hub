# HANDOFF — LOAHUB 작업 인수인계

> 이 문서는 데스크탑/웹 Claude와의 기획·제작 대화를 정리한 것입니다.
> Claude Code에서 작업을 이어갈 때 이 파일을 먼저 읽고 컨텍스트를 파악하세요.

---

## 0. 한 줄 요약

흩어진 로스트아크 편의 도구를 한곳에 모으고, 공식 API로 원정대를 불러와
각 캐릭터의 정보조회 사이트로 바로 이동하는 **풀스택 웹앱**. 골격 완성 상태.

---

## 1. 확정된 기획 / 의사결정

| 항목 | 결정 | 이유 |
|------|------|------|
| 아키텍처 | 풀스택 (프론트 + Express + MongoDB) | 과제 가점 항목 노림 |
| 스타일링 | Tailwind + daisyUI, 다크 골드 테마 | 게임 도구 사이트는 다크가 기본, 디자인 가점 |
| API 키 보호 | 백엔드가 로아 공식 API 프록시 역할 | 키를 프론트에 노출하지 않기 위함 |
| 상태 영속 | Redux Persist (localStorage, whitelist 방식) | 새로고침 후 데이터 유지 요구사항 |
| 핵심 차별점 | 원정대 캐릭터 → 조회 사이트 "딥링크" + "멀티 오픈" | 이 앱의 킬러 기능 |

### 채택한 핵심 기능
1. 도구 사이트 용도별 모음 (9 카테고리 / 18 사이트) + 검색
2. 원정대 대시보드 — 공식 API로 부캐 조회, 캐릭터별 조회 사이트 딥링크
3. 멀티 오픈 — 캐릭터 하나를 여러 조회 사이트에서 한 번에 열기
4. 즐겨찾기 (Persist)
5. 회원가입/로그인 (JWT) + 서버 데이터 저장
6. About 페이지 (제작자 소개)

---

## 2. 기술 스택 (요구사항 + 가점)

**프론트 (`client/`)**: React 18 + Vite, React Router, Redux Toolkit, Redux Persist,
Tailwind + daisyUI, react-bootstrap-icons, axios
**백엔드 (`server/`)**: Node + Express, MongoDB + Mongoose, JWT, bcryptjs, axios

요구 스택은 전부 포함됨. 가점: 백엔드/DB/JWT/회원가입/로그인/서버저장/공식 API 연동.

---

## 3. 폴더 구조

```
loa-hub/
├── client/
│   ├── src/
│   │   ├── data/tools.js          # 도구 사이트 정적 데이터 (핵심 콘텐츠)
│   │   ├── store/
│   │   │   ├── index.js           # Redux + Persist 설정
│   │   │   └── slices/            # auth / roster / favorites / preset
│   │   ├── api/index.js           # axios + JWT 인터셉터 + API 함수
│   │   ├── components/            # common / tools / character (분리됨)
│   │   ├── pages/                 # Home/Tools/Dashboard/Favorites/About/Login
│   │   ├── utils/openLinks.js     # 여러 URL 새 탭으로 열기
│   │   ├── App.jsx                # 라우터
│   │   └── main.jsx               # Provider + PersistGate + Router
│   └── vite.config.js             # /api → localhost:4000 프록시
└── server/
    ├── routes/auth.js             # 회원가입 / 로그인
    ├── routes/lostark.js          # ⭐ 로아 공식 API 프록시 (siblings/profile)
    ├── routes/me.js               # 로그인 유저 데이터 저장/조회
    ├── models/User.js             # bcrypt 해싱 포함
    ├── middleware/auth.js         # JWT 발급/검증
    └── server.js                  # 진입점
```

---

## 4. 실행 방법

```bash
# 백엔드 (터미널 1)
cd server
npm install
cp .env.example .env     # LOSTARK_API_KEY, JWT_SECRET 입력
npm start                # http://localhost:4000

# 프론트 (터미널 2)
cd client
npm install
npm run dev              # http://localhost:5173
```

- DB 없이도 로아 조회/도구/즐겨찾기는 동작. DB는 회원가입/로그인/저장에만 필요.
- MongoDB는 로컬 `mongod` 또는 MongoDB Atlas(무료 클라우드) 중 선택.

---

## 5. ⚠️ 남은 작업 (TODO) — 우선순위 순

### 🔴 반드시 해야 함

1. **캐릭터 딥링크 URL 검증** — `client/src/data/tools.js`의 `charUrl()` 패턴은
   **추정값**이라 실제와 다를 수 있음. 아래 사이트에서 캐릭터 하나 검색해
   실제 URL 형식을 확인하고 수정할 것:
   - 로펙 lopec.kr / 로아와 loawa.com / 일로아 iloa.gg / 클로아 kloa.gg /
     로아랩 lo4.app / R로아 rloa.gg
   - 현재 코드의 추정 패턴 예: `https://loawa.com/char/{이름}` ← 검증 필요

2. **로컬 실행/통합 테스트** — server+client 동시에 띄워 원정대 조회가
   실제로 되는지 확인 (API 키 .env에 넣은 상태로).

3. **About 사진 교체** — `client/src/assets/`에 실제 사진 넣고
   `client/src/pages/About.jsx`의 `<PlaceholderAvatar/>`를 `<img>`로 교체.
   (현재 자기소개는 임의로 채워둔 placeholder 텍스트)

### 🟡 만들면 좋음 (논의했으나 미구현)

4. **멀티 오픈 프리셋 UI** — `presetSlice.js`(상태)는 만들었으나 화면 없음.
   "스펙업 세트" 같은 도구 묶음을 저장/실행하는 UI 추가 필요.
   `utils/openLinks.js` 재사용 가능.

5. **로그인 ↔ 서버 동기화** — 로그인 시 로컬(Persist) 데이터와 서버 데이터
   (`/api/me/data`)를 머지하는 로직. 현재 API 함수(`apiGetMyData`,
   `apiSaveMyData`)는 정의돼 있으나 호출/머지 로직 미연결.

6. **디스코드 웹훅** — 숙제 리마인더 등. 어떤 알림이 유용할지 설계부터 필요.
   웹훅 URL 입력받아 프론트에서 POST(백엔드 없이도 가능) 또는 백엔드 경유.

### 🟢 선택 / 개선

7. 번들 코드 스플리팅 (빌드 시 500KB 경고 — 동작엔 무관)
8. 숙제 체크리스트 기능 (주간 리셋 로직) — 원래 아이디어 목록에 있었음
9. 캐릭터 카드에 전투력 보강 (siblings엔 전투력 없음 → profile 호출로 채우기)

---

## 6. 검증된 로아 API 패턴 (챗봇 코드에서 이식)

| 용도 | 엔드포인트 | 핵심 필드 |
|------|-----------|-----------|
| 원정대(부캐) | `GET /characters/{name}/siblings` | CharacterName, ServerName, CharacterClassName, ItemAvgLevel, CharacterLevel |
| 프로필/전투력 | `GET /armories/characters/{name}/profiles` | CombatPower, CharacterClassName, ItemAvgLevel, Title, CharacterImage |

- 헤더: `authorization: bearer {KEY}`, `accept: application/json`
- 404 = 캐릭터 없음, `null`/`"null"` 응답도 NOT_FOUND 처리
- siblings 정렬: 본서버 우선 → ItemAvgLevel 내림차순 (server/routes/lostark.js에 구현됨)

---

## 7. Claude Code에서 이어서 작업하는 법

```bash
cd loa-hub
claude
```

그 다음 예시 프롬프트:
- "HANDOFF.md 읽고 현재 상태 파악해줘"
- "tools.js의 charUrl 딥링크 URL들을 실제 사이트 기준으로 검증하고 고쳐줘"
- "멀티 오픈 프리셋 UI를 만들어줘. presetSlice랑 openLinks 유틸 이미 있어"
