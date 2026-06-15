import { Router } from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// 내 저장 데이터 조회 (원정대/즐겨찾기/프리셋)
router.get("/data", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    res.json(user.data);
  } catch {
    res.status(500).json({ message: "데이터 조회 중 오류가 발생했습니다." });
  }
});

// 내 데이터 저장 (덮어쓰기)
router.put("/data", requireAuth, async (req, res) => {
  try {
    const { roster, favorites, presets } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    if (roster !== undefined) user.data.roster = roster;
    if (favorites !== undefined) user.data.favorites = favorites;
    if (presets !== undefined) user.data.presets = presets;
    await user.save();
    res.json(user.data);
  } catch {
    res.status(500).json({ message: "데이터 저장 중 오류가 발생했습니다." });
  }
});

export default router;
