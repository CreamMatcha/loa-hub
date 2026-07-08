import { Router } from "express";
import axios from "axios";

const router = Router();
const LOSTARK_BASE = "https://developer-lostark.game.onstove.com";

// 공식 API 호출용 axios 인스턴스 (API 키는 서버에만 존재 → 프론트 노출 없음)
const loaApi = axios.create({
  baseURL: LOSTARK_BASE,
  timeout: 8000,
  headers: {
    accept: "application/json",
    authorization: `bearer ${process.env.LOSTARK_API_KEY || ""}`,
  },
});

// 콤마 제거 후 숫자 변환 (아이템레벨 정렬용)
const toNum = (s) => parseFloat(String(s ?? "0").replace(/,/g, "")) || 0;

// 직업명 → 짧은 표기 (선택)
const CLASS_SHORT = {
  // 필요 시 확장. 매핑 없으면 원본 그대로 사용.
};
const shortClass = (name) => CLASS_SHORT[name] || name;

/**
 * GET /api/lostark/siblings/:name
 * 원정대(부캐) 전체 조회 → 본서버 우선 + 아이템레벨 내림차순 정렬
 * (챗봇 fetchSiblings 로직 이식)
 */
router.get("/siblings/:name", async (req, res) => {
  const name = req.params.name?.trim();
  if (!name) return res.status(400).json({ message: "캐릭터명이 필요합니다." });

  try {
    const { data } = await loaApi.get(`/characters/${encodeURIComponent(name)}/siblings`);
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    }

    // 입력한 캐릭터의 서버를 기준 서버로
    const target = data.find((c) => c.CharacterName === name) || data[0];
    const targetServer = target.ServerName;

    const sorted = data.slice().sort((a, b) => {
      if (a.ServerName === targetServer && b.ServerName !== targetServer) return -1;
      if (a.ServerName !== targetServer && b.ServerName === targetServer) return 1;
      return toNum(b.ItemAvgLevel) - toNum(a.ItemAvgLevel);
    });

    // 프론트가 쓰기 좋은 형태로 정규화
    const result = sorted.map((c) => ({
      name: c.CharacterName,
      server: c.ServerName,
      className: shortClass(c.CharacterClassName),
      itemLevel: c.ItemAvgLevel,
      level: c.CharacterLevel,
      combatPower: null, // siblings 응답엔 전투력 없음 → 필요 시 profile로 보강
    }));

    res.json(result);
  } catch (e) {
    const code = e.response?.status;
    if (code === 404) return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    if (code === 401) {
      console.error("[LOSTARK] API 키 인증 실패(401) — LOSTARK_API_KEY 확인 필요");
      return res.status(502).json({ message: "API 키가 유효하지 않습니다." });
    }
    if (code === 429) {
      console.warn(`[LOSTARK] siblings(${name}) 호출량 초과(429)`);
      return res.status(429).json({ message: "로스트아크 API 호출량을 초과했어요. 잠시 후 다시 시도해 주세요." });
    }
    console.error(`[LOSTARK] siblings(${name}) 실패:`, code ?? e.code ?? e.message);
    res.status(502).json({ message: "로스트아크 API 조회에 실패했습니다." });
  }
});

/**
 * GET /api/lostark/profile/:name
 * 단일 캐릭터 프로필 (전투력, 직업, 템렙 등)
 * (챗봇 fetchCombatPower / fetchProfileClassName 로직 이식)
 */
router.get("/profile/:name", async (req, res) => {
  const name = req.params.name?.trim();
  if (!name) return res.status(400).json({ message: "캐릭터명이 필요합니다." });

  try {
    const { data } = await loaApi.get(
      `/armories/characters/${encodeURIComponent(name)}/profiles`
    );
    if (!data) return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });

    res.json({
      name: data.CharacterName,
      server: data.ServerName,
      className: data.CharacterClassName,
      itemLevel: data.ItemAvgLevel,
      level: data.CharacterLevel,
      combatPower: data.CombatPower ?? null,
      image: data.CharacterImage ?? null,
      title: data.Title ?? null,
    });
  } catch (e) {
    const code = e.response?.status;
    if (code === 404) return res.status(404).json({ message: "캐릭터를 찾을 수 없습니다." });
    if (code === 429) {
      console.warn(`[LOSTARK] profile(${name}) 호출량 초과(429)`);
      return res.status(429).json({ message: "로스트아크 API 호출량을 초과했어요. 잠시 후 다시 시도해 주세요." });
    }
    console.error(`[LOSTARK] profile(${name}) 실패:`, code ?? e.code ?? e.message);
    res.status(502).json({ message: "로스트아크 API 조회에 실패했습니다." });
  }
});

export default router;
