import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon, PersonPlusFill, ArrowClockwise, Trash, PersonFill, X, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import {
  selectRosters,
  selectAllCharacters,
  selectRepresentativeChar,
  addRoster,
  addSingleCharacter,
  removeRoster,
  clearRoster,
  updateCharacter,
  reorderCharacters,
  setRepresentativeChar,
} from "../store/slices/rosterSlice";
import { apiFetchRoster, apiFetchProfile } from "../api";
import { store } from "../store";
import CharacterCard from "../components/character/CharacterCard";

const DESKTOP_QUERY = "(min-width: 640px)";

export default function Dashboard() {
  const rosters = useSelector(selectRosters);
  const allCharacters = useSelector(selectAllCharacters);
  const representativeChar = useSelector(selectRepresentativeChar);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const [welcomeMsg, setWelcomeMsg] = useState(() => {
    if (!location.state?.justLoggedIn) return null;
    return location.state.isNewAccount
      ? "가입 완료! 즐겨찾기·원정대가 이 계정에 저장돼요."
      : "로그인 완료! 기기에 있던 즐겨찾기·원정대가 계정 데이터와 동기화됐어요.";
  });

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const characters = store.getState().roster.rosters.flatMap((r) => r.characters);
    characters.forEach((c) => {
      apiFetchProfile(c.name)
        .then((profile) => {
          dispatch(updateCharacter({ name: c.name, combatPower: profile.combatPower ?? null, level: profile.level }));
        })
        .catch(() => {});
    });
  }, [dispatch]);

  const handleFetchRoster = async () => {
    const name = input.trim();
    if (!name) return;
    setLoading("roster");
    setError("");
    try {
      const data = await apiFetchRoster(name);
      if (!data || data.length === 0) {
        setError("해당 캐릭터를 찾을 수 없어요. 이름을 확인해 주세요.");
        return;
      }
      const server = data[0]?.server ?? "";
      dispatch(addRoster({ mainChar: name, server, characters: data }));
      setInput("");
    } catch (e) {
      setError(
        e.response?.status === 404
          ? "해당 캐릭터를 찾을 수 없어요."
          : "조회 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setLoading(null);
    }
  };

  const handleFetchCharacter = async () => {
    const name = input.trim();
    if (!name) return;
    setLoading("character");
    setError("");
    try {
      const profile = await apiFetchProfile(name);
      if (allCharacters.some((c) => c.name === profile.name)) {
        setError("이미 추가된 캐릭터예요.");
        return;
      }
      dispatch(addSingleCharacter({
        name: profile.name,
        server: profile.server,
        className: profile.className,
        itemLevel: profile.itemLevel,
        level: profile.level,
        combatPower: profile.combatPower ?? null,
        image: profile.image ?? null,
      }));
      setInput("");
    } catch (e) {
      setError(
        e.response?.status === 404
          ? "해당 캐릭터를 찾을 수 없어요."
          : "조회 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setLoading(null);
    }
  };

  const totalCount = rosters.reduce((sum, r) => sum + (r.characters?.length ?? 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold">내 원정대</h1>
      <p className="mt-1 text-sm text-loa-muted">
        원정대 전체 또는 캐릭터 한 명씩 추가할 수 있어요.
      </p>

      {/* 검색 입력 + 버튼 */}
      <div className="mt-5 flex max-w-xl gap-2">
        <div className="relative flex-1">
          <SearchIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-loa-muted"
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetchRoster()}
            placeholder="캐릭터명 입력"
            className="w-full rounded-lg border border-loa-border bg-loa-surface py-2.5 pl-9 pr-3 text-sm text-loa-text placeholder:text-loa-muted focus:border-loa-goldDim focus:outline-none"
          />
        </div>
        <button
          onClick={handleFetchRoster}
          disabled={loading !== null}
          className="flex items-center gap-1.5 rounded-lg bg-loa-gold px-4 py-2.5 text-sm font-semibold text-loa-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading === "roster" ? <ArrowClockwise size={15} className="animate-spin" /> : <PersonPlusFill size={15} />}
          {loading === "roster" ? "불러오는 중" : "원정대 추가"}
        </button>
        <button
          onClick={handleFetchCharacter}
          disabled={loading !== null}
          className="flex items-center gap-1.5 rounded-lg border border-loa-goldDim bg-loa-gold/10 px-4 py-2.5 text-sm font-semibold text-loa-gold transition-colors hover:bg-loa-gold hover:text-loa-bg disabled:opacity-50"
        >
          {loading === "character" ? <ArrowClockwise size={15} className="animate-spin" /> : <PersonFill size={15} />}
          {loading === "character" ? "불러오는 중" : "캐릭터 추가"}
        </button>
      </div>

      {welcomeMsg && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-loa-goldDim/30 bg-loa-gold/10 px-3 py-2 text-sm text-loa-gold">
          <span>{welcomeMsg}</span>
          <button
            onClick={() => setWelcomeMsg(null)}
            aria-label="안내 닫기"
            className="text-loa-gold/70 transition-colors hover:text-loa-gold"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-lg border border-loa-error/30 bg-loa-error/10 px-3 py-2 text-sm text-loa-error">
          {error}
        </p>
      )}

      {/* 원정대 목록 */}
      {rosters.length > 0 ? (
        <>
          <div className="mt-8 mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">
              등록된 캐릭터{" "}
              <span className="text-loa-gold">{totalCount}</span>
              <span className="ml-2 text-sm font-normal text-loa-muted">
                ({rosters.length}개 그룹)
              </span>
            </h2>
            <div className="flex items-center gap-3">
              {isEditMode && (
                <span className="hidden text-xs text-loa-muted sm:inline">
                  {isDesktop ? "드래그해서 순서를 바꿔보세요" : "화살표로 순서를 바꿔보세요"}
                </span>
              )}
              <button
                onClick={() => setIsEditMode((v) => !v)}
                className="rounded-lg border border-loa-border px-3 py-1.5 text-sm font-medium text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text"
              >
                {isEditMode ? "완료" : "순서 편집"}
              </button>
              <button
                onClick={() => dispatch(clearRoster())}
                className="text-sm text-loa-muted transition-colors hover:text-loa-error"
              >
                전체 비우기
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {rosters.map((roster) => (
              <RosterGroup
                key={roster.mainChar}
                roster={roster}
                representativeChar={representativeChar}
                onSetRepresentative={(name) => dispatch(setRepresentativeChar(name))}
                onRemove={() => dispatch(removeRoster(roster.mainChar))}
                isEditMode={isEditMode}
                isDesktop={isDesktop}
                onReorder={(from, to) => dispatch(reorderCharacters({ mainChar: roster.mainChar, from, to }))}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-loa-border py-16 text-center">
          <p className="text-loa-muted">아직 등록된 캐릭터가 없어요.</p>
          <p className="mt-1 text-sm text-loa-muted">위에서 원정대 또는 캐릭터를 추가해 보세요.</p>
        </div>
      )}
    </div>
  );
}

function RosterGroup({ roster, representativeChar, onSetRepresentative, onRemove, isEditMode, isDesktop, onReorder }) {
  const isIndividual = roster.mainChar === "개별 캐릭터";
  const [dragIndex, setDragIndex] = useState(null);

  function handleDrop(targetIndex) {
    if (dragIndex !== null && dragIndex !== targetIndex) {
      onReorder(dragIndex, targetIndex);
    }
    setDragIndex(null);
  }

  function handleMove(idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= roster.characters.length) return;
    onReorder(idx, target);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between border-b border-loa-border pb-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-base font-bold text-loa-text">
            {roster.mainChar}
          </span>
          {!isIndividual && (
            <span className="rounded bg-loa-surface2 px-2 py-0.5 text-xs text-loa-muted">
              {roster.server}
            </span>
          )}
          <span className="text-xs text-loa-muted">{roster.characters.length}명</span>
        </div>
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-loa-muted transition-colors hover:text-loa-error"
        >
          <Trash size={13} />
          {isIndividual ? "그룹 삭제" : "원정대 삭제"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roster.characters.map((c, idx) => {
          const draggable = isEditMode && isDesktop;
          return (
            <div
              key={c.name}
              draggable={draggable}
              onDragStart={() => setDragIndex(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
              onDragEnd={() => setDragIndex(null)}
              className={`flex items-stretch gap-2 ${draggable ? "cursor-grab active:cursor-grabbing" : ""} ${dragIndex === idx ? "opacity-40" : ""}`}
            >
              {/* 모바일 화살표 */}
              {isEditMode && !isDesktop && (
                <div className="flex flex-col justify-center gap-1">
                  <button
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    aria-label="위로 이동"
                    className="rounded-md border border-loa-border p-1 text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === roster.characters.length - 1}
                    aria-label="아래로 이동"
                    className="rounded-md border border-loa-border p-1 text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <CharacterCard
                  character={c}
                  isRepresentative={representativeChar === c.name}
                  onSetRepresentative={() => onSetRepresentative(c.name)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
