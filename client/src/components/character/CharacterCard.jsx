import { useDispatch } from "react-redux";
import { Trash, BoxArrowUpRight, Diagram3 } from "react-bootstrap-icons";
import { removeCharacter } from "../../store/slices/rosterSlice";
import { getCharacterTools } from "../../data/tools";
import { openLinks } from "../../utils/openLinks";

// 직업별 색상 힌트(간단): 클래스명 첫 글자 기반 대신 골드 통일 + 보조색
export default function CharacterCard({ character }) {
  const dispatch = useDispatch();
  const charTools = getCharacterTools();

  // 이 캐릭터를 캐릭조회 도구 전체로 한 번에 열기
  const openAll = () => {
    const urls = charTools.map((t) => t.charUrl(character.name));
    const ok = openLinks(urls);
    if (!ok) alert("팝업이 차단되었어요. 브라우저에서 이 사이트의 팝업을 허용해 주세요.");
  };

  return (
    <div className="flex flex-col rounded-xl border border-loa-border bg-loa-surface p-4 transition-colors hover:border-loa-goldDim">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-base font-bold text-loa-text">
              {character.name}
            </h3>
            <span className="shrink-0 rounded bg-loa-surface2 px-1.5 py-0.5 text-[10px] text-loa-muted">
              {character.server}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-loa-muted">{character.className}</p>
        </div>
        <button
          onClick={() => dispatch(removeCharacter(character.name))}
          aria-label="원정대에서 제거"
          className="shrink-0 text-loa-muted transition-colors hover:text-loa-error"
        >
          <Trash size={15} />
        </button>
      </div>

      {/* 스탯 */}
      <div className="my-3 grid grid-cols-2 gap-2">
        <Stat label="아이템 레벨" value={character.itemLevel} accent />
        <Stat label="전투력" value={character.combatPower ?? "—"} />
      </div>

      {/* 딥링크 버튼들 */}
      <div className="mt-auto">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {charTools.map((t) => (
            <a
              key={t.id}
              href={t.charUrl(character.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg bg-loa-surface2 px-2.5 py-1 text-xs font-medium text-loa-text transition-colors hover:bg-loa-gold hover:text-loa-bg"
            >
              {t.name}
              <BoxArrowUpRight size={10} />
            </a>
          ))}
        </div>
        <button
          onClick={openAll}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-loa-goldDim/40 bg-loa-gold/10 px-3 py-1.5 text-xs font-semibold text-loa-gold transition-colors hover:bg-loa-gold hover:text-loa-bg"
        >
          <Diagram3 size={13} />
          전체 조회 사이트 한 번에 열기
        </button>
      </div>
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
