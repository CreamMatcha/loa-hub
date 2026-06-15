import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Search as SearchIcon,
  ArrowClockwise,
  BoxArrowUpRight,
  Diagram3,
  PersonPlusFill,
  ClockHistory,
  X,
} from "react-bootstrap-icons";
import { apiFetchProfile } from "../api";
import { addSingleCharacter } from "../store/slices/rosterSlice";
import { getToolById } from "../data/tools";
import { openLinks } from "../utils/openLinks";

const SEARCH_TOOL_IDS = ["lopec", "loawa", "iloa", "kloa"];
const RECENT_KEY = "loa-recent-searches";
const MAX_RECENT = 5;

function loadRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
  catch { return []; }
}
function saveRecent(name) {
  const next = [name, ...loadRecent().filter((n) => n !== name)].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}

export default function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [recent, setRecent] = useState(loadRecent);
  const [added, setAdded] = useState(false);

  const searchTools = SEARCH_TOOL_IDS.map((id) => getToolById(id)).filter(Boolean);

  const handleSearch = async (name) => {
    const n = (name ?? input).trim();
    if (!n) return;
    setLoading(true);
    setError("");
    setResult(null);
    setAdded(false);
    try {
      const profile = await apiFetchProfile(n);
      setResult(profile);
      setRecent(saveRecent(n));
      setInput(n);
    } catch (e) {
      setError(
        e.response?.status === 404
          ? "해당 캐릭터를 찾을 수 없어요."
          : "조회 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAll = () => {
    const urls = searchTools.map((t) => t.charUrl(result.name));
    if (!openLinks(urls)) alert("팝업이 차단되었어요. 브라우저에서 팝업을 허용해 주세요.");
  };

  const handleAddToRoster = () => {
    dispatch(addSingleCharacter({
      name: result.name,
      server: result.server,
      className: result.className,
      itemLevel: result.itemLevel,
      level: result.level,
      combatPower: result.combatPower ?? null,
      image: result.image ?? null,
    }));
    setAdded(true);
  };

  const removeRecent = (name) => {
    const next = recent.filter((n) => n !== name);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const reset = () => { setResult(null); setInput(""); setAdded(false); setError(""); };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold">캐릭터 검색</h1>
      <p className="mt-1 text-sm text-loa-muted">
        캐릭터명으로 조회 사이트에 바로 이동할 수 있어요. 원정대에 저장하지 않고 일회성으로 조회할 때 사용하세요.
      </p>

      {/* 검색 입력 */}
      <div className="mt-5 flex gap-2">
        <div className="relative flex-1">
          <SearchIcon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-loa-muted" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="캐릭터명 입력"
            className="w-full rounded-lg border border-loa-border bg-loa-surface py-2.5 pl-9 pr-3 text-sm text-loa-text placeholder:text-loa-muted focus:border-loa-goldDim focus:outline-none"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-loa-gold px-5 py-2.5 text-sm font-semibold text-loa-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <ArrowClockwise size={15} className="animate-spin" /> : <SearchIcon size={15} />}
          {loading ? "검색 중" : "검색"}
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-loa-error/30 bg-loa-error/10 px-3 py-2 text-sm text-loa-error">
          {error}
        </p>
      )}

      {/* 최근 검색 */}
      {recent.length > 0 && !result && (
        <div className="mt-6">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-loa-muted">
            <ClockHistory size={12} /> 최근 검색
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((name) => (
              <div key={name} className="flex items-center gap-1 rounded-lg border border-loa-border bg-loa-surface px-3 py-1.5">
                <button onClick={() => handleSearch(name)} className="text-sm text-loa-text hover:text-loa-gold transition-colors">
                  {name}
                </button>
                <button onClick={() => removeRecent(name)} className="text-loa-muted hover:text-loa-error transition-colors">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      {result && (
        <div className="mt-6 space-y-3">
          {/* 캐릭터 정보 카드 */}
          <div className="rounded-xl border border-loa-border bg-loa-surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-bold text-loa-text">{result.name}</h2>
                  <span className="rounded bg-loa-surface2 px-1.5 py-0.5 text-[10px] text-loa-muted">{result.server}</span>
                </div>
                <p className="mt-0.5 text-sm text-loa-muted">{result.className}</p>
              </div>
              <button
                onClick={handleAddToRoster}
                disabled={added}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-loa-goldDim/40 bg-loa-gold/10 px-3 py-1.5 text-xs font-semibold text-loa-gold transition-colors hover:bg-loa-gold hover:text-loa-bg disabled:cursor-default disabled:opacity-60"
              >
                <PersonPlusFill size={12} />
                {added ? "추가됨" : "원정대에 추가"}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Stat label="아이템 레벨" value={result.itemLevel} accent />
              <Stat label="전투력" value={result.combatPower ?? "—"} />
            </div>
          </div>

          {/* 조회 사이트 링크 */}
          <div className="rounded-xl border border-loa-border bg-loa-surface p-5">
            <p className="mb-3 text-xs font-semibold text-loa-muted">조회 사이트</p>
            <div className="flex flex-wrap gap-2">
              {searchTools.map((t) => (
                <a
                  key={t.id}
                  href={t.charUrl(result.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-loa-border bg-loa-surface2 px-3 py-2 text-sm font-medium text-loa-text transition-colors hover:border-loa-gold hover:text-loa-gold"
                >
                  {t.name}
                  <BoxArrowUpRight size={11} />
                </a>
              ))}
            </div>
            <button
              onClick={handleOpenAll}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-loa-goldDim/40 bg-loa-gold/10 px-3 py-2 text-sm font-semibold text-loa-gold transition-colors hover:bg-loa-gold hover:text-loa-bg"
            >
              <Diagram3 size={14} />
              4개 사이트 한 번에 열기
            </button>
          </div>

          <button onClick={reset} className="text-sm text-loa-muted transition-colors hover:text-loa-text">
            ← 다시 검색
          </button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-lg bg-loa-bg/50 px-3 py-2">
      <div className="text-[11px] text-loa-muted">{label}</div>
      <div className={`font-display text-sm font-bold ${accent ? "text-loa-gold" : "text-loa-text"}`}>
        {value}
      </div>
    </div>
  );
}
