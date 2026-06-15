import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import lostarkRoutes from "./routes/lostark.js";
import meRoutes from "./routes/me.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 헬스 체크
app.get("/api/health", (req, res) => res.json({ ok: true, time: Date.now() }));

app.use("/api/auth", authRoutes);
app.use("/api/lostark", lostarkRoutes);
app.use("/api/me", meRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

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
