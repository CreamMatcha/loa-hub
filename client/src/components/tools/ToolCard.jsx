import { useSelector, useDispatch } from "react-redux";
import { Star, StarFill, BoxArrowUpRight, PersonLinesFill } from "react-bootstrap-icons";
import { toggleFavorite, selectIsFavorite } from "../../store/slices/favoritesSlice";

export default function ToolCard({ tool }) {
  const dispatch = useDispatch();
  const isFav = useSelector(selectIsFavorite(tool.id));

  return (
    <div className="group relative flex flex-col rounded-xl border border-loa-border bg-loa-surface p-4 transition-all hover:border-loa-goldDim hover:bg-loa-surface2">
      {/* 즐겨찾기 버튼 */}
      <button
        onClick={() => dispatch(toggleFavorite(tool.id))}
        aria-label={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        className="absolute right-3 top-3 text-loa-muted transition-colors hover:text-loa-gold"
      >
        {isFav ? <StarFill className="text-loa-gold" size={18} /> : <Star size={18} />}
      </button>

      <div className="mb-1 flex items-center gap-2 pr-7">
        <h3 className="font-display text-base font-bold text-loa-text">{tool.name}</h3>
        {tool.type === "character" && (
          <span className="flex items-center gap-0.5 rounded bg-loa-gem/15 px-1.5 py-0.5 text-[10px] font-medium text-loa-gem">
            <PersonLinesFill size={10} />
            캐릭조회
          </span>
        )}
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-loa-muted">{tool.desc}</p>

      <div className="flex flex-wrap gap-2">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-loa-surface2 px-3 py-1.5 text-sm font-medium text-loa-text transition-colors hover:bg-loa-gold hover:text-loa-bg"
        >
          바로가기
          <BoxArrowUpRight size={13} />
        </a>
        {tool.extra?.map((ex) => (
          <a
            key={ex.url}
            href={ex.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg border border-loa-border px-2.5 py-1.5 text-xs text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text"
          >
            {ex.label}
            <BoxArrowUpRight size={11} />
          </a>
        ))}
      </div>
    </div>
  );
}
