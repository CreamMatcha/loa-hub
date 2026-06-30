import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BoxArrowRight, PersonCircle,
  House, Grid3x3GapFill, PersonBadge, StarFill, InfoCircle, Search,
} from "react-bootstrap-icons";
import { useTheme } from "../../context/ThemeContext";
import { selectIsLoggedIn, selectUser, logout } from "../../store/slices/authSlice";
import { selectRosters, selectRepresentativeChar, clearRoster } from "../../store/slices/rosterSlice";
import { selectFavoriteIds, clearFavorites } from "../../store/slices/favoritesSlice";
import { apiSaveMyData } from "../../api";

const links = [
  { to: "/", label: "홈", icon: House, end: true },
  { to: "/tools", label: "도구", icon: Grid3x3GapFill },
  { to: "/dashboard", label: "원정대", icon: PersonBadge },
  { to: "/search", label: "검색", icon: Search },
  { to: "/favorites", label: "즐겨찾기", icon: StarFill },
  { to: "/about", label: "About", icon: InfoCircle },
];

function LogoSVG({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
      style={{ filter: "drop-shadow(0 2px 6px color-mix(in srgb, var(--gold) 36%, transparent))" }}>
      <line x1="16" y1="16" x2="16"  y2="6"  style={{ stroke: "var(--gold)" }} strokeWidth="2.1" strokeLinecap="round" />
      <line x1="16" y1="16" x2="6.8"  y2="22" style={{ stroke: "var(--gold)" }} strokeWidth="2.1" strokeLinecap="round" />
      <line x1="16" y1="16" x2="25.2" y2="22" style={{ stroke: "var(--gold)" }} strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="16"   cy="6"  r="2.9" style={{ fill: "var(--gold)" }} />
      <circle cx="6.8"  cy="22" r="2.9" style={{ fill: "var(--gold)" }} />
      <circle cx="25.2" cy="22" r="2.9" style={{ fill: "var(--gold)" }} />
      <circle cx="16"   cy="16" r="5.4" style={{ fill: "var(--gold)" }} />
      <circle cx="16"   cy="16" r="2.1" style={{ fill: "var(--navy)" }} />
    </svg>
  );
}

export default function Navbar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const rosters = useSelector(selectRosters);
  const favoriteIds = useSelector(selectFavoriteIds);
  const representativeChar = useSelector(selectRepresentativeChar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const handleLogout = async () => {
    try { await apiSaveMyData({ roster: rosters, favorites: favoriteIds, representativeChar }); } catch (_) {}
    dispatch(clearRoster());
    dispatch(clearFavorites());
    dispatch(logout());
    navigate("/");
  };

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "color-mix(in srgb, var(--bg) 82%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <nav style={{
        maxWidth: 1120, margin: "0 auto", height: 66,
        padding: "0 24px", display: "flex", alignItems: "center", gap: 8,
      }}>
        {/* 로고 */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 18, textDecoration: "none" }}>
          <LogoSVG size={30} />
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>
            LOA<span style={{ color: "var(--gold)" }}>HUB</span>
          </span>
        </Link>

        {/* 데스크탑 네비 */}
        <ul className="hidden sm:flex"
          style={{ alignItems: "center", gap: 4, flex: 1, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <span style={{
                    position: "relative", display: "flex", alignItems: "center", gap: 7,
                    cursor: "pointer", padding: "9px 14px", borderRadius: 10,
                    fontFamily: "inherit", fontSize: 14, fontWeight: 600,
                    color: isActive ? "var(--gold)" : "var(--muted)",
                    transition: "color .18s",
                  }}>
                    {label}
                    {isActive && (
                      <span style={{
                        position: "absolute", left: 14, right: 14, bottom: 2,
                        height: 2, borderRadius: 2, background: "var(--gold)",
                      }} />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 우측 */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={toggle} aria-label="테마 전환" style={{
            width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--border)", borderRadius: 10,
            background: "var(--surface)", color: "var(--muted)", cursor: "pointer",
          }}>
            {isDark
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
            }
          </button>

          {isLoggedIn ? (
            <>
              <span className="hidden sm:flex items-center gap-1.5 text-sm" style={{ color: "var(--muted)" }}>
                <PersonCircle size={16} style={{ color: "var(--gold)" }} />
                {user?.username}
              </span>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm" style={{
                padding: "9px 14px", borderRadius: 10, border: "1px solid var(--border)",
                background: "none", color: "var(--muted)", cursor: "pointer", fontFamily: "inherit",
              }}>
                <BoxArrowRight size={15} />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </>
          ) : (
            <Link to="/login" style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 10, border: "none",
              background: "linear-gradient(140deg, var(--gold), var(--gold-deep))",
              color: "var(--on-gold)", fontFamily: "inherit", fontSize: 14, fontWeight: 700,
              cursor: "pointer", textDecoration: "none",
              boxShadow: "0 4px 14px color-mix(in srgb, var(--gold) 30%, transparent)",
            }}>
              로그인
            </Link>
          )}
        </div>
      </nav>

      {/* 모바일 하단 탭 */}
      <ul className="flex sm:hidden items-center justify-around border-t px-2 py-1"
        style={{ listStyle: "none", margin: 0, padding: "4px 8px", borderColor: "var(--border)", background: "var(--bg)" }}>
        {links.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <span style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  padding: "6px 8px", borderRadius: 8, fontSize: 10, fontWeight: 600,
                  color: isActive ? "var(--gold)" : "var(--muted)",
                }}>
                  <Icon size={17} />
                  {label}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
