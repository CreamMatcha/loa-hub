import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// JWT 발급
export function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// 보호 라우트용 미들웨어
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "인증이 필요합니다." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
}
