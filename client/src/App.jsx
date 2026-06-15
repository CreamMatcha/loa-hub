import { Routes, Route } from "react-router-dom";
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

export default function App() {
  useSyncToServer();
  return (
    <div className="flex min-h-screen flex-col">
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
