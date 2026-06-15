import { useSelector } from "react-redux";
import { StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { selectFavoriteIds } from "../store/slices/favoritesSlice";
import { TOOLS } from "../data/tools";
import ToolCard from "../components/tools/ToolCard";

export default function Favorites() {
  const favIds = useSelector(selectFavoriteIds);
  const favTools = TOOLS.filter((t) => favIds.includes(t.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <StarFill className="text-loa-gold" size={20} />
        <h1 className="font-display text-2xl font-bold">즐겨찾기</h1>
      </div>
      <p className="mt-1 text-sm text-loa-muted">
        자주 쓰는 도구를 모아 봤어요. 새로고침해도 유지됩니다.
      </p>

      {favTools.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favTools.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-loa-border py-16 text-center">
          <p className="text-loa-muted">아직 즐겨찾기한 도구가 없어요.</p>
          <Link
            to="/tools"
            className="mt-3 inline-block rounded-lg bg-loa-gold px-4 py-2 text-sm font-semibold text-loa-bg transition-opacity hover:opacity-90"
          >
            도구 둘러보러 가기
          </Link>
        </div>
      )}
    </div>
  );
}
