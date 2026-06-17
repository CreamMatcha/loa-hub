import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonFill, LockFill, HexagonFill } from "react-bootstrap-icons";
import { setCredentials } from "../store/slices/authSlice";
import { setRosters } from "../store/slices/rosterSlice";
import { setFavorites, selectFavoriteItems } from "../store/slices/favoritesSlice";
import { apiLogin, apiRegister, apiGetMyData } from "../api";

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localFavoriteItems = useSelector(selectFavoriteItems);

  const submit = async () => {
    if (!username.trim() || !password) {
      setError("아이디와 비밀번호를 입력해 주세요.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fn = mode === "login" ? apiLogin : apiRegister;
      const data = await fn(username.trim(), password);
      dispatch(setCredentials({ token: data.token, user: data.user }));

      // 서버 데이터 머지 (실패해도 로그인은 유지)
      try {
        const serverData = await apiGetMyData();
        // 즐겨찾기: 로컬 + 서버 합집합 (구버전 string[] → {toolId,toolKey}[] 자동 변환)
        if (serverData?.favorites?.length) {
          const toItems = (arr) =>
            arr.map((x) =>
              typeof x === "string" ? { toolId: x, toolKey: null } : x
            );
          const serverItems = toItems(serverData.favorites);
          const merged = [...localFavoriteItems];
          for (const si of serverItems) {
            const exists = merged.some(
              (m) => m.toolId === si.toolId && (m.toolKey ?? null) === (si.toolKey ?? null)
            );
            if (!exists) merged.push(si);
          }
          dispatch(setFavorites(merged));
        }
        // 원정대: 새 형식(rosters 배열)인 경우만 적용. 구버전 flat 배열은 무시.
        const rosterData = serverData?.roster;
        if (Array.isArray(rosterData) && rosterData.length > 0 && rosterData[0]?.mainChar !== undefined) {
          dispatch(setRosters(rosterData));
        }
      } catch (_) {}

      navigate("/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "요청 처리 중 문제가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-16">
      <div className="mb-6 flex flex-col items-center">
        <HexagonFill className="text-loa-gold" size={32} />
        <h1 className="mt-3 font-display text-xl font-bold">
          {mode === "login" ? "로그인" : "회원가입"}
        </h1>
        <p className="mt-1 text-sm text-loa-muted">
          로그인하면 원정대·즐겨찾기를 기기 간 동기화할 수 있어요.
        </p>
      </div>

      <div className="rounded-2xl border border-loa-border bg-loa-surface p-6">
        <Field icon={PersonFill} placeholder="아이디" value={username} onChange={setUsername} />
        <Field
          icon={LockFill}
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={setPassword}
          onEnter={submit}
        />

        {error && <p className="mb-3 text-sm text-loa-error">{error}</p>}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full rounded-lg bg-loa-gold py-2.5 text-sm font-semibold text-loa-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "처리 중..." : mode === "login" ? "로그인" : "가입하기"}
        </button>

        <button
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
          className="mt-4 w-full text-center text-sm text-loa-muted transition-colors hover:text-loa-gold"
        >
          {mode === "login" ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
        </button>
      </div>
    </div>
  );
}

function Field({ icon: Icon, placeholder, type = "text", value, onChange, onEnter }) {
  return (
    <div className="relative mb-3">
      <Icon size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-loa-muted" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        className="w-full rounded-lg border border-loa-border bg-loa-bg py-2.5 pl-9 pr-3 text-sm text-loa-text placeholder:text-loa-muted focus:border-loa-goldDim focus:outline-none"
      />
    </div>
  );
}
