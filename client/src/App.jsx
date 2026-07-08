import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSyncToServer } from "./hooks/useSyncToServer";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Search from "./pages/Search";
import Login from "./pages/Login";

const SITE_URL = "https://loahub.pages.games";

// 라우트별 title / description (검색엔진 + 브라우저 탭 표시용)
const ROUTE_META = {
  "/": { title: "LOAHUB — 로스트아크 편의 도구 허브", desc: "로스트아크 편의 도구 허브 - 흩어진 로아 도구를 한 곳에서 한 번에." },
  "/tools": { title: "도구 사이트 모음 — LOAHUB", desc: "재련 · 시세 · 경매 · 숙제 등 로스트아크 편의 도구 23곳을 용도별로 정리했습니다." },
  "/dashboard": { title: "내 원정대 — LOAHUB", desc: "원정대를 등록하고 캐릭터별 조회 사이트로 바로 이동하세요." },
  "/favorites": { title: "즐겨찾기 — LOAHUB", desc: "자주 쓰는 로스트아크 도구를 모아 보세요." },
  "/search": { title: "캐릭터 검색 — LOAHUB", desc: "캐릭터명 하나로 로펙 · 로아와 · 일로아 · 클로아를 한 번에 조회하세요." },
  "/about": { title: "소개 — LOAHUB", desc: "LOAHUB 제작자 소개." },
  "/login": { title: "로그인 — LOAHUB", desc: "로그인하면 원정대 · 즐겨찾기를 기기 간 동기화할 수 있어요." },
};

function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.desc);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", SITE_URL + pathname);
  }, [pathname]);
  return null;
}

export default function App() {
  useSyncToServer();
  return (
    <div className="flex min-h-screen flex-col">
      <RouteMeta />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-5xl font-extrabold text-loa-gold">404</h1>
      <p className="mt-3 text-loa-muted">길을 잃으셨네요. 모코코가 도와줄 수 없는 페이지예요.</p>
    </div>
  );
}
