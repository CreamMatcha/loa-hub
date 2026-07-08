import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from "./routes/auth.js";
import lostarkRoutes from "./routes/lostark.js";
import meRoutes from "./routes/me.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// 요청 로깅 — 어떤 요청이 언제 어떤 상태코드로 끝났는지 기록
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 구 herokuapp 주소 → 새 도메인 이동
// localStorage는 도메인별로 분리되므로, 브라우저 페이지 요청은 기존 유저의
// 로컬 데이터(즐겨찾기·원정대·로그인)를 URL 해시에 실어 새 주소로 넘긴다.
// API 등 페이지가 아닌 요청은 즉시 301 (검색엔진 신호 이전 + 중복 색인 방지).
const NEW_ORIGIN = "https://loahub.pages.games";
app.use((req, res, next) => {
  if (!req.hostname?.endsWith(".herokuapp.com")) return next();
  if (req.method !== "GET" || req.path.startsWith("/api") || !req.accepts("html")) {
    return res.redirect(301, `${NEW_ORIGIN}${req.originalUrl}`);
  }
  res.send(`<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${NEW_ORIGIN}/">
<title>LOAHUB — 새 주소로 이동 중</title></head>
<body><p>LOAHUB가 새 주소(loahub.pages.games)로 이사했어요. 잠시만요...</p>
<script>
(function () {
  var target = "${NEW_ORIGIN}" + location.pathname + location.search;
  try {
    var data = {
      p: localStorage.getItem("persist:loa-hub-root"),
      r: localStorage.getItem("loa-recent-searches"),
    };
    if (data.p || data.r) {
      target += "#migrate=" + btoa(encodeURIComponent(JSON.stringify(data)));
    }
  } catch (e) {}
  location.replace(target);
})();
</script></body></html>`);
});

// 헬스 체크
app.get("/api/health", (req, res) => res.json({ ok: true, time: Date.now() }));

app.use("/api/auth", authRoutes);
app.use("/api/lostark", lostarkRoutes);
app.use("/api/me", meRoutes);

// API 404
app.use("/api", (req, res) => res.status(404).json({ message: "Not found" }));

// Production: React 정적 파일 서빙
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/loa-hub";

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[DB] MongoDB connected");
  } catch (e) {
    console.warn("[DB] MongoDB connection failed:", e.message);
    console.warn("[DB] 인증/저장 기능은 DB 연결 후 동작합니다. (로아 프록시는 DB 없이도 동작)");
  }
  app.listen(PORT, () => console.log(`[SERVER] listening on http://localhost:${PORT}`));
}

start();
