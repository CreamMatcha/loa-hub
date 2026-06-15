import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  HexagonFill,
  House,
  Grid3x3GapFill,
  PersonBadge,
  StarFill,
  InfoCircle,
  BoxArrowRight,
  PersonCircle,
  SunFill,
  MoonFill,
  Search,
} from "react-bootstrap-icons";
import { useTheme } from "../../context/ThemeContext";
import { selectIsLoggedIn, selectUser, logout } from "../../store/slices/authSlice";
import { selectRosters, clearRoster } from "../../store/slices/rosterSlice";
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

export default function Navbar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const rosters = useSelector(selectRosters);
  const favoriteIds = useSelector(selectFavoriteIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const handleLogout = async () => {
    try {
      await apiSaveMyData({ roster: rosters, favorites: favoriteIds });
    } catch (_) {}
    dispatch(clearRoster());
    dispatch(clearFavorites());
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-loa-border bg-loa-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4">
        <Link to="/" className="mr-2 flex items-center gap-2 shrink-0">
          <HexagonFill className="text-loa-gold" size={22} />
          <span className="font-display text-lg font-bold tracking-tight">
            LOA<span className="text-loa-gold">HUB</span>
          </span>
        </Link>

        <ul className="hidden flex-1 items-center gap-1 sm:flex">
          {links.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-loa-surface2 text-loa-gold"
                      : "text-loa-muted hover:bg-loa-surface hover:text-loa-text"
                  }`
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="테마 전환"
            className="flex items-center justify-center rounded-lg border border-loa-border p-2 text-loa-muted transition-colors hover:border-loa-gold hover:text-loa-gold"
          >
            {isDark ? <SunFill size={15} /> : <MoonFill size={15} />}
          </button>
          {isLoggedIn ? (
            <>
              <span className="hidden items-center gap-1.5 text-sm text-loa-muted sm:flex">
                <PersonCircle size={16} className="text-loa-gold" />
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-loa-border px-3 py-1.5 text-sm text-loa-muted transition-colors hover:border-loa-gold hover:text-loa-gold"
              >
                <BoxArrowRight size={15} />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-loa-gold px-4 py-1.5 text-sm font-semibold text-loa-bg transition-opacity hover:opacity-90"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>

      {/* 모바일 하단 네비 */}
      <ul className="flex items-center justify-around border-t border-loa-border bg-loa-bg px-2 py-1 sm:hidden">
        {links.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors ${
                  isActive ? "text-loa-gold" : "text-loa-muted"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
