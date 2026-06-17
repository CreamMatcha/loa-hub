import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search as SearchIcon, PersonPlusFill, ArrowClockwise, Trash, PersonFill } from "react-bootstrap-icons";
import {
  selectRosters,
  selectAllCharacters,
  addRoster,
  addSingleCharacter,
  removeRoster,
  clearRoster,
  updateCharacter,
} from "../store/slices/rosterSlice";
import { apiFetchRoster, apiFetchProfile } from "../api";
import { store } from "../store";
import CharacterCard from "../components/character/CharacterCard";

export default function Dashboard() {
  const rosters = useSelector(selectRosters);
  const allCharacters = useSelector(selectAllCharacters);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(null); // null | "roster" | "character"
  const [error, setError] = useState("");

  // 원정대 탭 진입 시 저장된 캐릭터들의 전투력 · 레벨 갱신
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

      {/* 검색 입력 + 버튼 두 개 */}
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
            <button
              onClick={() => dispatch(clearRoster())}
              className="text-sm text-loa-muted transition-colors hover:text-loa-error"
            >
              전체 비우기
            </button>
          </div>

          <div className="space-y-8">
            {rosters.map((roster) => (
              <RosterGroup
                key={roster.mainChar}
                roster={roster}
                onRemove={() => dispatch(removeRoster(roster.mainChar))}
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

function RosterGroup({ roster, onRemove }) {
  const isIndividual = roster.mainChar === "개별 캐릭터";
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
        {roster.characters.map((c) => (
          <CharacterCard key={c.name} character={c} />
        ))}
      </div>
    </div>
  );
}
