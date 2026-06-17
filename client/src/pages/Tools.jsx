import { useState, useMemo } from "react";
import * as Icons from "react-bootstrap-icons";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { CATEGORIES, TOOLS } from "../data/tools";
import ToolCard from "../components/tools/ToolCard";

export default function Tools() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        CATEGORIES.find((c) => c.id === t.category)?.label.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold">도구 사이트</h1>
      <p className="mt-1 text-sm text-loa-muted">
        용도별로 정리된 로스트아크 편의 도구. 별을 눌러 즐겨찾기에 추가하세요.
        하위 도구를 선택하면 그 도구로 바로가기·즐겨찾기가 연결돼요.
      </p>

      {/* 검색 */}
      <div className="relative mt-5 max-w-md">
        <SearchIcon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-loa-muted"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="도구 이름·기능 검색 (예: 재련, 시세)"
          className="w-full rounded-lg border border-loa-border bg-loa-surface py-2.5 pl-9 pr-3 text-sm text-loa-text placeholder:text-loa-muted focus:border-loa-goldDim focus:outline-none"
        />
      </div>

      {/* 검색 중이면 평면 그리드, 아니면 카테고리별 섹션 */}
      {query.trim() ? (
        <div className="mt-8">
          {filtered.length === 0 ? (
            <EmptyResult query={query} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          )}
        </div>
      ) : (
        CATEGORIES.map((cat) => {
          const tools = TOOLS.filter((t) => t.category === cat.id);
          if (tools.length === 0) return null;
          const Icon = Icons[cat.icon] || Icons.Grid3x3GapFill;
          return (
            <section key={cat.id} id={cat.id} className="mt-10 scroll-mt-20">
              <div className="mb-4 flex items-center gap-2">
                <Icon size={18} className="text-loa-gold" />
                <h2 className="font-display text-lg font-bold">{cat.label}</h2>
                <span className="text-xs text-loa-muted">{cat.desc}</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}

function EmptyResult({ query }) {
  return (
    <div className="rounded-xl border border-dashed border-loa-border py-16 text-center">
      <p className="text-loa-muted">
        "<span className="text-loa-text">{query}</span>"에 해당하는 도구가 없어요.
      </p>
      <p className="mt-1 text-sm text-loa-muted">다른 키워드로 검색해 보세요.</p>
    </div>
  );
}
