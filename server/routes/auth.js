import { Router } from "express";
import User from "../models/User.js";
import { signToken } from "../middleware/auth.js";

const router = Router();

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
    if (password.length < 4)
      return res.status(400).json({ message: "비밀번호는 4자 이상이어야 합니다." });

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "이미 사용 중인 아이디입니다." });

    const user = new User({ username });
    await user.setPassword(password);
    await user.save();

    const token = signToken(user);
    res.status(201).json({ token, user: user.toSafeJSON() });
  } catch (e) {
    res.status(500).json({ message: "회원가입 처리 중 오류가 발생했습니다." });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });

    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });

    const token = signToken(user);
    res.json({ token, user: user.toSafeJSON() });
  } catch (e) {
    res.status(500).json({ message: "로그인 처리 중 오류가 발생했습니다." });
  }
});

export default router;
