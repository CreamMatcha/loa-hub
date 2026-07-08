// 로스트아크 도구 사이트 모음 (정적 데이터)
// category: 사이트의 대표 분류 | type: 'tool'(일반 도구) | 'character'(캐릭터명으로 딥링크 가능)
// charUrl(name): 캐릭터명을 받아 해당 캐릭터 조회 URL을 반환 (type==='character'일 때)
// tools: 해당 사이트의 도구 목록 [{ key, label, url, category? }] — 선택 시 바로가기 URL로 사용
//   하위 도구의 category가 있으면 그 카테고리 섹션에, 없으면 사이트 category 섹션에 표시됨
//   category는 문자열 또는 배열(여러 섹션에 동시 노출) 가능
//   (한 사이트가 여러 카테고리 섹션에 등장할 수 있음)

export const CATEGORIES = [
  { id: "main", label: "로펙 · 공식 · 커뮤니티", icon: "Globe2", desc: "자주 찾는 사이트 바로가기" },
  { id: "search", label: "캐릭터 조회 · 분석", icon: "Search", desc: "캐릭터 검색 / 랭킹 / 딜 · 스펙 분석" },
  { id: "upgrade", label: "강화 · 재련", icon: "Hammer", desc: "재련 / 상재 / 세공 최적화" },
  { id: "market", label: "시세 · 거래소", icon: "CashCoin", desc: "유각 / 보석 / 악세 / 재료 시세" },
  { id: "auction", label: "경매 · 입찰", icon: "Coin", desc: "경매 입찰 적정가 / 분배금 계산" },
  { id: "reward", label: "보상 · 효율", icon: "GiftFill", desc: "더보기 / 지옥 보상 / 패키지 효율" },
  { id: "life", label: "생활 · 제작", icon: "Tree", desc: "벌목 / 융화재료 / 제작 효율" },
  { id: "raid", label: "숙제 · 일정", icon: "ListCheck", desc: "원정대 숙제 / 떠돌이 상인 / 레이드" },
  { id: "arkgrid", label: "아크그리드 · 젬", icon: "Grid3x3GapFill", desc: "젬 스캔 / 전투력 최적화" },
];

export const TOOLS = [
  // 0. 로펙 · 공식 · 커뮤니티 (자주 찾는 사이트 — 맨 위 고정)
  {
    id: "lopec",
    name: "로펙",
    url: "https://lopec.kr/",
    category: "main",
    type: "character",
    desc: "캐릭터 스펙을 수치화하여 점수로 보여주는 대표 사이트",
    charUrl: (name) => `https://lopec.kr/character/specPoint/${encodeURIComponent(name)}`,
    tools: [
      { key: "rank", label: "랭킹", url: "https://lopec.kr/rank/specPoint", category: ["main", "search"] },
      { key: "reward", label: "지옥 보상 효율 계산기", url: "https://lopec.kr/tool/reward", category: ["main", "reward"] },
      { key: "mvp", label: "기여도 계산기", url: "https://lopec.kr/tool/mvp", category: ["main", "reward"] },
      { key: "enhancement", label: "강화 최적화", url: "https://lopec.kr/tool/enhancement", category: "upgrade" },
      { key: "raid", label: "공격대 구성", url: "https://lopec.kr/tool/raid", category: "raid" },
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
      { key: "rank", label: "아이템레벨 랭킹", url: "https://loawa.com/rank" },
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
      { key: "bid", label: "경매계산기", url: "https://iloa.gg/tools/bid", category: "auction" },
      { key: "stone", label: "돌파고 (세공 최적화)", url: "https://iloa.gg/tools/stone", category: "upgrade" },
    ],
  },
  {
    id: "kloa",
    name: "클로아",
    url: "https://kloa.gg/",
    category: "search",
    type: "character",
    desc: "캐릭터 조회 · 거래소 · 떠돌이 상인 종합 정보",
    charUrl: (name) => `https://kloa.gg/characters/${encodeURIComponent(name)}`,
    tools: [
      { key: "merchant", label: "떠돌이 상인", url: "https://kloa.gg/merchant", category: "raid" },
      { key: "ranking", label: "전투력 랭킹", url: "https://kloa.gg/ranking/combat-power" },
      { key: "market", label: "거래소", url: "https://kloa.gg/market", category: "market" },
      { key: "crow", label: "딜 계산기", url: "https://kloa.gg/crow" },
      { key: "multisearch", label: "멀티서치", url: "https://kloa.gg/multisearch" },
    ],
  },
  {
    id: "loagg",
    name: "로아지지",
    url: "https://loagg.com/",
    category: "search",
    type: "tool",
    desc: "직업별 세팅 통계 / 팔찌 비교 / 랭킹",
    tools: [
      { key: "ranking", label: "랭킹", url: "https://loagg.com/ranking" },
      { key: "stats", label: "세팅 통계", url: "https://loagg.com/stats/setting" },
      { key: "bracelet", label: "팔찌 비교", url: "https://loagg.com/calc/bracelet", category: "upgrade" },
      { key: "auction", label: "시세", url: "https://loagg.com/auction", category: "market" },
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
    desc: "재련 효율 / 각종 시세 / 랭킹",
    tools: [
      { key: "ranking", label: "랭킹", url: "https://loaup.com/ranking", category: "search" },
      { key: "refine-efficiency", label: "재련 효율 계산기", url: "https://loaup.com/refine-efficiency" },
      { key: "special-refine", label: "특수 재련 효율표", url: "https://loaup.com/special-refine-efficiency" },
      { key: "hell-reward", label: "지옥 보상 효율표", url: "https://loaup.com/hell-reward", category: "reward" },
      { key: "accessory", label: "장신구 시세", url: "https://loaup.com/accessory", category: "market" },
      { key: "legend-avatar", label: "전설 아바타 시세", url: "https://loaup.com/legend-avatar", category: "market" },
      { key: "bracelet", label: "팔찌 시세", url: "https://loaup.com/bracelet", category: "market" },
      { key: "refine-material", label: "재련 재료 시세", url: "https://loaup.com/market/refine-material", category: "market" },
      { key: "arkgem", label: "유각 시세", url: "https://loaup.com/market/arkgem", category: "market" },
    ],
  },
  {
    id: "loavesting",
    name: "로아베스팅",
    url: "https://www.loavesting.com/",
    category: "upgrade",
    type: "tool",
    desc: "재련견적 / 재료가격 / 팔찌 · 장신구 시뮬레이터",
    tools: [
      { key: "calculator", label: "재련견적서", url: "https://www.loavesting.com/calculator/t4" },
      { key: "dashboard", label: "재료 가격 차트", url: "https://www.loavesting.com/dashboard", category: "market" },
      { key: "bracelet", label: "팔찌 시뮬레이터", url: "https://www.loavesting.com/bracelett4" },
      { key: "acc", label: "장신구 연마 시뮬레이터", url: "https://www.loavesting.com/acc" },
    ],
  },
  {
    id: "gcalc",
    name: "껨산기",
    url: "https://www.gcalc.kr/",
    category: "reward",
    type: "tool",
    desc: "패키지 효율 / 성장 루트 / 경매계산",
    tools: [
      { key: "package", label: "패키지 효율", url: "https://www.gcalc.kr/package-efficiency" },
      { key: "auction", label: "쌀산기 (경매 계산기)", url: "https://www.gcalc.kr/auction-calculator", category: "auction" },
      { key: "crystal", label: "골드 환율", url: "https://www.gcalc.kr/crystal-gold", category: "market" },
      { key: "value-db", label: "가치계산 DB", url: "https://www.gcalc.kr/value-db" },
    ],
  },

  // 4. 종합 계산기 (로아랩)
  {
    id: "lo4",
    name: "로아랩",
    url: "https://lo4.app/",
    category: "upgrade",
    type: "tool",
    desc: "재련 · 경매 · 시세 · 치명타 계산 종합 도구",
    tools: [
      { key: "hell-reward", label: "지옥 보상 효율", url: "https://lo4.app/tools/hell-reward", category: "reward" },
      { key: "blunt-thorn", label: "치명타 계산기", url: "https://lo4.app/tools/blunt-thorn", category: "search" },
      { key: "refining", label: "재련 계산기", url: "https://lo4.app/tools" },
      { key: "auction", label: "경매 입찰 계산기", url: "https://lo4.app/tools/auction-calculator", category: "auction" },
      { key: "inscriptions", label: "유물 각인서 시세", url: "https://lo4.app/markets/inscriptions", category: "market" },
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
      { key: "lumbering", label: "벌목 도구 계산기", url: "https://lostgld.com/life-tool/lumbering" },
      { key: "life-data", label: "생활 효율 비교", url: "https://lostgld.com/life-data" },
    ],
  },
  {
    id: "loalogol",
    name: "로아로골",
    url: "https://loalogol.kr/",
    category: "life",
    type: "tool",
    desc: "생활 제작 / 주간 골드 / 숙제 · 재련 · 팔찌 시뮬",
    tools: [
      { key: "life-master", label: "생활 제작", url: "https://loalogol.kr/life-master" },
      { key: "package", label: "패키지 효율", url: "https://loalogol.kr/package", category: "reward" },
      { key: "hell-reward", label: "지옥 보상", url: "https://loalogol.kr/hell-reward", category: "reward" },
      { key: "weekly-gold", label: "주간 레이드 골드", url: "https://loalogol.kr/weekly-gold", category: "raid" },
      { key: "homework", label: "일일·주간 숙제", url: "https://loalogol.kr/homework", category: "raid" },
      { key: "refining", label: "재련 시뮬", url: "https://loalogol.kr/refining", category: "upgrade" },
      { key: "bracelet", label: "팔찌 시뮬", url: "https://loalogol.kr/bracelet", category: "upgrade" },
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
    url: "https://loachart.com/",
    category: "market",
    type: "tool",
    desc: "시세차트 · 더보기 / 경매 / 제작 등 각종 계산기",
    tools: [
      { key: "reward", label: "더보기 계산기", url: "https://loachart.com/rewardcalc", category: "reward" },
      { key: "chart", label: "시세차트", url: "https://loachart.com/chart" },
      { key: "dpsmeter", label: "DPS 미터기", url: "https://loachart.com/dpsmeter", category: "search" },
      { key: "mari", label: "마리샵", url: "https://loachart.com/mari" },
      { key: "bid", label: "경매 계산기", url: "https://loachart.com/bidcalc", category: "auction" },
      { key: "craft", label: "제작 계산기", url: "https://loachart.com/craftcalc", category: "life" },
      { key: "card", label: "도감작 계산기", url: "https://loachart.com/cardcalc", category: "reward" },
    ],
  },
  {
    id: "loagap",
    name: "로아갭",
    url: "https://loagap.com/",
    category: "market",
    type: "tool",
    desc: "유각 · 보석 · 악세 시세 / 재련 · 큐브 · 효율 계산",
    tools: [
      { key: "accessory", label: "악세 시세", url: "https://loagap.com/price/accessory" },
      { key: "market", label: "젬·재료 시세", url: "https://loagap.com/price/market" },
      { key: "book", label: "유각 시세", url: "https://loagap.com/price/book" },
      { key: "jewel", label: "보석 시세", url: "https://loagap.com/price/jewel" },
      { key: "cube", label: "큐브 계산기", url: "https://loagap.com/cube", category: "reward" },
      { key: "enhance-try", label: "재련 시뮬레이터", url: "https://loagap.com/enhance/try", category: "upgrade" },
      { key: "package", label: "패키지 계산기", url: "https://loagap.com/efficiency/package", category: "reward" },
      { key: "enhance", label: "상급재련·재련루트", url: "https://loagap.com/efficiency/enhance", category: "upgrade" },
      { key: "chaos", label: "카오스 던전 효율", url: "https://loagap.com/efficiency/chaos", category: "reward" },
      { key: "guardian", label: "가디언 토벌 효율", url: "https://loagap.com/efficiency/guardian", category: "reward" },
      { key: "raid", label: "레이드 더보기", url: "https://loagap.com/efficiency/raid", category: "reward" },
    ],
  },
  {
    id: "loatool",
    name: "로아도구",
    url: "https://loatool.taeu.kr/",
    category: "market",
    type: "tool",
    desc: "제작효율 / 크리스탈·각인서 시세 / 경매 계산",
    tools: [
      { key: "craft", label: "제작 계산기", url: "https://loatool.taeu.kr/calculator/craft", category: "life" },
      { key: "bid", label: "경매 입찰", url: "https://loatool.taeu.kr/calculator/bid", category: "auction" },
      { key: "mari", label: "마리샵 계산기", url: "https://loatool.taeu.kr/calculator/mari-shop" },
      { key: "lospi", label: "LOSPI (크리스탈 지표)", url: "https://loatool.taeu.kr/lospi" },
    ],
  },

  // 7. 보상 효율
  {
    id: "loatto",
    name: "로아또",
    url: "https://loatto.kr/",
    category: "reward",
    type: "tool",
    desc: "재련 최적화 / 지옥 보상 / 젬파고 · 돌파고",
    tools: [
      { key: "refining", label: "통합 재련", url: "https://loatto.kr/refining-simulator", category: "upgrade" },
      { key: "standard", label: "일반 재련", url: "https://loatto.kr/standard-refining", category: "upgrade" },
      { key: "advanced", label: "상급 재련", url: "https://loatto.kr/advanced-refining", category: "upgrade" },
      { key: "special", label: "특수 재련", url: "https://loatto.kr/special-refining", category: "upgrade" },
      { key: "auxiliary", label: "보조 재료", url: "https://loatto.kr/auxiliary", category: "upgrade" },
      { key: "hell", label: "지옥 보상", url: "https://loatto.kr/hell-rewards" },
      { key: "single", label: "싱글코인 교환", url: "https://loatto.kr/single-exchange" },
      { key: "raid-auction", label: "레이드 경매", url: "https://loatto.kr/raid-auction", category: "auction" },
      { key: "gempago", label: "젬파고 (화면인식)", url: "https://loatto.kr/gempago", category: "arkgrid" },
      { key: "dolpago", label: "돌파고 (화면인식)", url: "https://loatto.kr/dolpago", category: "upgrade" },
    ],
  },

  // 8. 숙제 · 일정
  {
    id: "loatodo",
    name: "로아투두",
    url: "https://app.loatodo.com/",
    category: "raid",
    type: "tool",
    desc: "일일 · 주간 숙제 관리 대표 사이트",
    tools: [
      { key: "cube", label: "큐브 계산기", url: "https://app.loatodo.com/cube", category: "reward" },
    ],
  },
  {
    id: "rloa",
    name: "R로아",
    url: "https://rloa.gg/",
    category: "raid",
    type: "tool",
    desc: "레이드 숙제 보며 빼기 편함",
    tools: [
      { key: "calc", label: "경매 입찰 계산기", url: "https://rloa.gg/tools/calc", category: "auction" },
    ],
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

// 헬퍼: 카테고리별 도구 그룹핑 (기능 단위)
// 해당 카테고리에 속한 하위 도구만 남긴 사이트 카드를 반환.
// 하위 도구가 없어도 사이트 대표 카테고리가 일치하면 포함.
export const getToolsByCategory = (catId) =>
  TOOLS.map((t) => {
    const subs = (t.tools ?? []).filter((s) => {
      const cats = Array.isArray(s.category) ? s.category : [s.category ?? t.category];
      return cats.includes(catId);
    });
    if (subs.length === 0 && t.category !== catId) return null;
    return { ...t, tools: subs };
  }).filter(Boolean);
// 헬퍼: 캐릭터명 딥링크 가능한 도구만
export const getCharacterTools = () => TOOLS.filter((t) => t.type === "character");
export const getToolById = (id) => TOOLS.find((t) => t.id === id);
