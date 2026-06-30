import { useState } from "react";
import { useDispatch } from "react-redux";
import { Trash, BoxArrowUpRight, Diagram3, StarFill, Star } from "react-bootstrap-icons";
import { removeCharacter } from "../../store/slices/rosterSlice";
import { getCharacterTools } from "../../data/tools";
import { openLinks } from "../../utils/openLinks";

export default function CharacterCard({ character, isRepresentative, onSetRepresentative }) {
  const dispatch = useDispatch();
  const charTools = getCharacterTools();

  const openAll = () => {
    const urls = charTools.map((t) => t.charUrl(character.name));
    const ok = openLinks(urls);
    if (!ok) alert("팝업이 차단되었어요. 브라우저에서 이 사이트의 팝업을 허용해 주세요.");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      borderRadius: "var(--r)", border: "1px solid var(--border)",
      background: "var(--surface)", padding: 16,
      transition: "border-color .18s",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gold) 55%, var(--border))")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {character.name}
            </h3>
            {isRepresentative && (
              <span style={{
                flexShrink: 0, borderRadius: 6,
                background: "color-mix(in srgb, var(--gold) 15%, transparent)",
                border: "1px solid color-mix(in srgb, var(--gold) 40%, transparent)",
                padding: "1px 7px", fontSize: 10, color: "var(--gold-text)", fontWeight: 600,
              }}>
                대표
              </span>
            )}
            <span style={{
              flexShrink: 0, borderRadius: 6, background: "var(--surface2)",
              padding: "1px 7px", fontSize: 10, color: "var(--muted)",
            }}>
              {character.server}
            </span>
          </div>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: "var(--muted)" }}>{character.className}</p>
        </div>
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          {onSetRepresentative && (
            <button
              onClick={onSetRepresentative}
              aria-label={isRepresentative ? "대표 캐릭터 해제" : "대표 캐릭터 설정"}
              title={isRepresentative ? "대표 캐릭터 해제" : "대표 캐릭터 설정"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4,
                color: isRepresentative ? "var(--gold)" : "var(--muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isRepresentative ? "var(--gold)" : "var(--muted)")}
            >
              {isRepresentative ? <StarFill size={15} /> : <Star size={15} />}
            </button>
          )}
          <button
            onClick={() => dispatch(removeCharacter(character.name))}
            aria-label="원정대에서 제거"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C44040")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <Trash size={15} />
          </button>
        </div>
      </div>

      <div style={{ margin: "12px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Stat label="아이템 레벨" value={character.itemLevel} />
        <Stat label="전투력" value={character.combatPower ?? "—"} />
      </div>

      <div style={{ marginTop: "auto" }}>
        <div style={{ marginBottom: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {charTools.map((t) => (
            <LinkChip key={t.id} tool={t} name={character.name} />
          ))}
        </div>
        <button
          onClick={openAll}
          style={{
            display: "flex", width: "100%", alignItems: "center", justifyContent: "center",
            gap: 6, borderRadius: "var(--r2)", padding: "7px 12px",
            border: "1px solid color-mix(in srgb, var(--gold-deep) 60%, transparent)",
            background: "color-mix(in srgb, var(--gold) 10%, transparent)",
            color: "var(--gold)",
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            transition: "background .18s, color .18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.color = "var(--on-gold)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "color-mix(in srgb, var(--gold) 10%, transparent)";
            e.currentTarget.style.color = "var(--gold)";
          }}
        >
          <Diagram3 size={13} />
          전체 조회 사이트 한 번에 열기
        </button>
      </div>
    </div>
  );
}

function LinkChip({ tool, name }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={tool.charUrl(name)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 4,
        borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 500,
        textDecoration: "none",
        background: hovered ? "var(--gold)" : "var(--surface2)",
        color: hovered ? "var(--on-gold)" : "var(--text)",
        transition: "background .15s, color .15s",
      }}
    >
      {tool.name}
      <BoxArrowUpRight size={10} />
    </a>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ borderRadius: 8, background: "var(--surface2)", padding: "8px 12px" }}>
      <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{value}</div>
    </div>
  );
}
