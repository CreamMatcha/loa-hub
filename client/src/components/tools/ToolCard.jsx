import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Star, StarFill, BoxArrowUpRight, PersonLinesFill } from "react-bootstrap-icons";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

export default function ToolCard({ tool, initialToolKey = null }) {
  const dispatch = useDispatch();
  const [selectedToolKey, setSelectedToolKey] = useState(initialToolKey);
  const isSimplified = Boolean(initialToolKey);

  const selectedTool = tool.tools?.find((t) => t.key === selectedToolKey) ?? null;
  const targetUrl = selectedTool?.url ?? tool.url;

  const isFav = useSelector((state) =>
    state.favorites.items.some(
      (item) =>
        item.toolId === tool.id &&
        (item.toolKey ?? null) === (selectedToolKey ?? null)
    )
  );

  function handleToolClick(key) {
    setSelectedToolKey((prev) => (prev === key ? null : key));
  }

  function handleFavorite() {
    dispatch(toggleFavorite({ toolId: tool.id, toolKey: selectedToolKey }));
  }

  const favoriteButton = (
    <button
      onClick={handleFavorite}
      aria-label={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      className="absolute right-3 top-3 text-loa-muted transition-colors hover:text-loa-gold"
    >
      {isFav ? <StarFill className="text-loa-gold" size={18} /> : <Star size={18} />}
    </button>
  );

  const linkButton = (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 items-center gap-1.5 rounded-lg bg-loa-surface2 px-3 py-1.5 text-sm font-medium text-loa-text transition-colors hover:bg-loa-gold hover:text-loa-bg"
    >
      {selectedTool ? selectedTool.label : "바로가기"}
      <BoxArrowUpRight size={13} />
    </a>
  );

  if (isSimplified) {
    return (
      <div className="group relative flex items-center justify-between gap-2 rounded-xl border border-loa-border bg-loa-surface p-4 pr-9 transition-all hover:border-loa-goldDim hover:bg-loa-surface2">
        {favoriteButton}
        <h3 className="truncate font-display text-base font-bold text-loa-text">{tool.name}</h3>
        {linkButton}
      </div>
    );
  }

  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-loa-border bg-loa-surface p-4 transition-all hover:border-loa-goldDim hover:bg-loa-surface2">
      {favoriteButton}

      <div className="mb-1 flex items-center gap-2 pr-7">
        <h3 className="font-display text-base font-bold text-loa-text">{tool.name}</h3>
        {tool.type === "character" && (
          <span className="flex items-center gap-0.5 rounded bg-loa-gem/15 px-1.5 py-0.5 text-[10px] font-medium text-loa-gem">
            <PersonLinesFill size={10} />
            캐릭조회
          </span>
        )}
      </div>

      <p className="mb-3 flex-1 text-sm leading-relaxed text-loa-muted">{tool.desc}</p>

      {/* 도구 선택 버튼 */}
      {tool.tools && tool.tools.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tool.tools.map((t) => (
            <button
              key={t.key}
              onClick={() => handleToolClick(t.key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedToolKey === t.key
                  ? "bg-loa-gold text-loa-bg"
                  : "border border-loa-border bg-loa-surface2 text-loa-muted hover:border-loa-goldDim hover:text-loa-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">{linkButton}</div>
    </div>
  );
}
