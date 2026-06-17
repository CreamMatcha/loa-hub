import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StarFill, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { selectFavoriteItems, reorderFavorites } from "../store/slices/favoritesSlice";
import { TOOLS } from "../data/tools";
import ToolCard from "../components/tools/ToolCard";

// Tailwind의 sm 브레이크포인트(640px)와 동일한 기준으로 PC/모바일 구분
const DESKTOP_QUERY = "(min-width: 640px)";

export default function Favorites() {
  const favItems = useSelector(selectFavoriteItems);
  const dispatch = useDispatch();
  const [dragIndex, setDragIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedFavs = favItems
    .map((item, index) => {
      const tool = TOOLS.find((t) => t.id === item.toolId);
      if (!tool) return null;
      return { tool, toolKey: item.toolKey ?? null, index };
    })
    .filter(Boolean)
    .map((item, pos) => ({ ...item, pos }));

  // 간소화 카드(도구 선택됨)는 연속될 경우 둘씩 묶어 일반 카드 한 칸 자리에 쌓음
  const slots = [];
  for (let i = 0; i < resolvedFavs.length; i++) {
    const cur = resolvedFavs[i];
    const next = resolvedFavs[i + 1];
    if (cur.toolKey && next?.toolKey) {
      slots.push({ type: "pair", items: [cur, next] });
      i++;
    } else {
      slots.push({ type: "single", items: [cur] });
    }
  }

  function handleDrop(targetIndex) {
    if (dragIndex !== null && dragIndex !== targetIndex) {
      dispatch(reorderFavorites({ from: dragIndex, to: targetIndex }));
    }
    setDragIndex(null);
  }

  function handleMove(pos, direction) {
    const targetPos = pos + direction;
    if (targetPos < 0 || targetPos >= resolvedFavs.length) return;
    dispatch(
      reorderFavorites({ from: resolvedFavs[pos].index, to: resolvedFavs[targetPos].index })
    );
  }

  function renderCard({ tool, toolKey, index, pos }, stretch) {
    const draggableNow = isEditMode && isDesktop;
    return (
      <div
        key={`${tool.id}::${toolKey ?? ""}`}
        draggable={draggableNow}
        onDragStart={() => setDragIndex(index)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(index)}
        onDragEnd={() => setDragIndex(null)}
        className={`flex items-stretch gap-2 ${stretch ? "h-full" : ""} ${draggableNow ? "cursor-grab active:cursor-grabbing" : ""} ${dragIndex === index ? "opacity-40" : ""}`}
      >
        {isEditMode && !isDesktop && (
          <div className="flex flex-col justify-center gap-1">
            <button
              onClick={() => handleMove(pos, -1)}
              disabled={pos === 0}
              aria-label="위로 이동"
              className="rounded-md border border-loa-border p-1 text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={() => handleMove(pos, 1)}
              disabled={pos === resolvedFavs.length - 1}
              aria-label="아래로 이동"
              className="rounded-md border border-loa-border p-1 text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <ToolCard tool={tool} initialToolKey={toolKey} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <StarFill className="text-loa-gold" size={20} />
          <h1 className="whitespace-nowrap font-display text-2xl font-bold">즐겨찾기</h1>
        </div>
        {resolvedFavs.length > 0 && (
          <div className="flex items-center gap-2">
            {isEditMode && (
              <span className="whitespace-nowrap text-xs text-loa-muted">
                {isDesktop ? "드래그해서 순서를 바꿔보세요" : "화살표로 순서를 바꿔보세요"}
              </span>
            )}
            <button
              onClick={() => setIsEditMode((v) => !v)}
              className="rounded-lg border border-loa-border px-3 py-1.5 text-sm font-medium text-loa-muted transition-colors hover:border-loa-goldDim hover:text-loa-text"
            >
              {isEditMode ? "완료" : "편집"}
            </button>
          </div>
        )}
      </div>
      <p className="mt-1 text-sm text-loa-muted">
        자주 쓰는 도구를 모아 봤어요. 새로고침해도 유지됩니다.
      </p>

      {resolvedFavs.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((slot) =>
            slot.type === "pair" ? (
              <div
                key={slot.items.map((it) => `${it.tool.id}::${it.toolKey ?? ""}`).join("|")}
                className="flex flex-col gap-3"
              >
                {slot.items.map((item) => renderCard(item, false))}
              </div>
            ) : (
              renderCard(slot.items[0], !slot.items[0].toolKey)
            )
          )}
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
