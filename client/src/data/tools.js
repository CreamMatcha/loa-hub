// 로스트아크 도구 사이트 모음 (정적 데이터)
// category: 용도별 분류 | type: 'tool'(일반 도구) | 'character'(캐릭터명으로 딥링크 가능)
// charUrl(name): 캐릭터명을 받아 해당 캐릭터 조회 URL을 반환 (type==='character'일 때)
// tools: 해당 사이트의 도구 목록 [{ key, label, url }] — 선택 시 바로가기 URL로 사용

export const CATEGORIES = [
  { id: "main", label: "로펙 · 공식 · 커뮤니티", icon: "Globe2", desc: "공식 사이트 및 커뮤니티 바로가기" },
  { id: "search", label: "캐릭터 검색", icon: "Search", desc: "원정대 / 캐릭터 정보 조회" },
  { id: "upgrade", label: "강화 · 스펙업 효율", icon: "Hammer", desc: "재련 / 상재 / 스펙업 계산" },
  { id: "deal", label: "딜 지분 분석", icon: "BarChartLine", desc: "스킬별 딜 지분 / 치명타 계산" },
  { id: "life", label: "생활 · 제작", icon: "Tree", desc: "벌목 / 융화재료 제작 효율" },
  { id: "market", label: "시세 조회", icon: "CashCoin", desc: "유각 / 보석 / 악세 실시간 시세" },
  { id: "reward", label: "보상 효율", icon: "GiftFill", desc: "젬파고 / 지옥 보상 효율" },
  { id: "raid", label: "숙제 · 레이드 관리", icon: "ListCheck", desc: "원정대 숙제 / 레이드 관리" },
  { id: "arkgrid", label: "아크그리드 최적화", icon: "Grid3x3GapFill", desc: "젬 스캔 / 전투력 최적화" },
];

export const TOOLS = [
  // 0. 공식 · 커뮤니티
  {
    id: "lopec",
    name: "로펙",
    url: "https://lopec.kr/",
    category: "main",
    type: "character",
    desc: "캐릭터 스펙을 수치화하여 점수로 보여주는 대표 사이트",
    charUrl: (name) => `https://lopec.kr/character/specPoint/${encodeURIComponent(name)}`,
    tools: [
      { key: "mvp", label: "기여도 계산기", url: "https://lopec.kr/tool/mvp" },
      { key: "reward", label: "지옥 보상 효율 계산기", url: "https://lopec.kr/tool/reward" },
    ],
  },
  {
    id: "lostark-official",
    name: "로스트아크",
    url: "https://lostark.game.onstove.com/",
    category: "main",
    type: "tool",
    desc: "로스트아크 공식 홈페이지",
    tools: [
      { key: "notice", label: "공지사항", url: "https://lostark.game.onstove.com/News/Notice/List" },
    ],
  },
  {
    id: "loa-inven",
    name: "로스트아크 인벤",
    url: "https://lostark.inven.co.kr/",
    category: "main",
    type: "tool",
    desc: "국내 최대 로스트아크 커뮤니티",
    tools: [
      { key: "chuchu", label: "30추 바로가기", url: "https://www.inven.co.kr/board/lostark/6271?my=chuchu" },
    ],
  },

  // 1. 스펙 수치화
  // 2. 캐릭터 검색
  {
    id: "loawa",
    name: "로아와",
    url: "https://loawa.com/",
    category: "search",
    type: "character",
    desc: "캐릭터 통계 보기 편함",
    charUrl: (name) => `https://loawa.com/char/${encodeURIComponent(name)}`,
    tools: [
      { key: "guild", label: "길드 검색", url: "https://loawa.com/guild" },
    ],
  },
  {
    id: "iloa",
    name: "일로아",
    url: "https://iloa.gg/",
    category: "search",
    type: "character",
    desc: "군장검사 · 숙제 · 경매계산기 기능",
    charUrl: (name) => `https://iloa.gg/character/${encodeURIComponent(name)}`,
    tools: [
      { key: "multi", label: "군장 검사", url: "https://iloa.gg/multi" },
      { key: "guilds", label: "길드 검색", url: "https://iloa.gg/guilds" },
      { key: "bid", label: "경매계산기", url: "https://iloa.gg/tools/bid" },
    ],
  },
  {
    id: "kloa",
    name: "클로아",
    url: "https://kloa.gg/",
    category: "search",
    type: "character",
    desc: "뉴비용 떠돌이 상인 현황 검색 가능",
    charUrl: (name) => `https://kloa.gg/characters/${encodeURIComponent(name)}`,
    tools: [
      { key: "merchant", label: "떠돌이 상인", url: "https://kloa.gg/merchant" },
    ],
  },

  // 3. 강화 · 스펙업 효율
  {
    id: "icepeng",
    name: "아이스펭",
    url: "https://loa.icepeng.com/",
    category: "upgrade",
    type: "tool",
    desc: "재련 / 상급재련 계산 사이트",
    tools: [
      { key: "refining", label: "재련 최적화", url: "https://loa.icepeng.com/refining" },
      { key: "advanced-refining", label: "상급 재련 최적화", url: "https://loa.icepeng.com/advanced-refining" },
    ],
  },
  {
    id: "loaup",
    name: "로아업",
    url: "https://loaup.com/",
    category: "upgrade",
    type: "tool",
    desc: "내 캐릭터 스펙업을 효율적으로",
    tools: [
      { key: "ranking", label: "랭킹", url: "https://loaup.com/ranking" },
    ],
  },
  {
    id: "loavesting",
    name: "로아베스팅",
    url: "https://www.loavesting.com/",
    category: "upgrade",
    type: "tool",
    desc: "재련견적 / 재료가격 / 스펙 시뮬레이터",
    tools: [
      { key: "calculator", label: "재련견적서", url: "https://www.loavesting.com/calculator/t4" },
    ],
  },
  {
    id: "gcalc",
    name: "껨산기",
    url: "https://www.gcalc.kr/",
    category: "upgrade",
    type: "tool",
    desc: "패키지 효율 / 성장 루트 / 경매계산",
    tools: [
      { key: "package", label: "패키지 효율", url: "https://www.gcalc.kr/package-efficiency" },
    ],
  },

  // 4. 딜 지분 분석
  {
    id: "lo4",
    name: "로아랩",
    url: "https://lo4.app/",
    category: "deal",
    type: "tool",
    desc: "음돌 · 치명타 계산 외 여러 기능",
    tools: [
      { key: "hell-reward", label: "지옥 보상 효율", url: "https://lo4.app/tools/hell-reward" },
      { key: "blunt-thorn", label: "치명타 계산기", url: "https://lo4.app/tools/blunt-thorn" },
    ],
  },

  // 5. 생활 · 제작
  {
    id: "lostgld",
    name: "로스트골드",
    url: "https://lostgld.com/",
    category: "life",
    type: "tool",
    desc: "벌목도구 계산 / 융화재료 제작 효율",
    tools: [
      { key: "craft", label: "융화재료 제작", url: "https://lostgld.com/craft" },
    ],
  },

  // 6. 시세 조회
  {
    id: "loashop",
    name: "로아샵",
    url: "https://loa-shop.pages.dev/",
    category: "market",
    type: "tool",
    desc: "실시간 유각 시세",
    tools: [
      { key: "jewel", label: "보석 시세", url: "https://loa-shop.pages.dev/jewel" },
      { key: "zem", label: "젬 시세", url: "https://loa-shop.pages.dev/zem" },
    ],
  },
  {
    id: "loachart",
    name: "로아차트",
    url: "https://loachart.com/rewardcalc",
    category: "market",
    type: "tool",
    desc: "군단장 더보기 효율",
  },
  {
    id: "loagap",
    name: "로아갭",
    url: "https://loagap.com/",
    category: "market",
    type: "tool",
    desc: "유각 보석 · 악세 · 젬 가격",
    tools: [
      { key: "accessory", label: "악세 시세", url: "https://loagap.com/price/accessory" },
    ],
  },
  {
    id: "loatool",
    name: "로아도구",
    url: "https://loatool.taeu.kr/",
    category: "market",
    type: "tool",
    desc: "제작효율 / 유각시세 / 쌀산기",
  },

  // 7. 보상 효율
  {
    id: "loatto",
    name: "로아또",
    url: "https://loatto.kr/",
    category: "reward",
    type: "tool",
    desc: "보조재료 실제가치 / 특재효율 한눈에",
  },

  // 8. 숙제 · 레이드 관리
  {
    id: "rloa",
    name: "R로아",
    url: "https://rloa.gg/",
    category: "raid",
    type: "tool",
    desc: "레이드 숙제 보며 빼기 편함",
  },

  // 9. 아크그리드 최적화
  {
    id: "aloa",
    name: "AL로아",
    url: "https://aloa.gg/ko/arkgrid",
    category: "arkgrid",
    type: "tool",
    desc: "젬 스캔 전투력 최적화",
  },
  {
    id: "arkgrid-locator",
    name: "젬 로케이터",
    url: "https://airplaner.github.io/lostark-arkgrid-gem-locator-v2/",
    category: "arkgrid",
    type: "tool",
    desc: "젬 스캔 전투력 최적화 (빠름)",
  },
];

// 헬퍼: 카테고리별 도구 그룹핑
export const getToolsByCategory = (catId) => TOOLS.filter((t) => t.category === catId);
// 헬퍼: 캐릭터명 딥링크 가능한 도구만
export const getCharacterTools = () => TOOLS.filter((t) => t.type === "character");
export const getToolById = (id) => TOOLS.find((t) => t.id === id);
