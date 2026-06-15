import { Link } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";
import { CATEGORIES, getToolsByCategory, TOOLS } from "../data/tools";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-loa-border bg-gradient-to-br from-loa-surface to-loa-bg p-8 sm:p-12">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #e0b96a, transparent 70%)" }}
        />
        <p className="mb-3 inline-block rounded-full border border-loa-goldDim/40 px-3 py-1 text-xs font-medium text-loa-gold">
          로스트아크 편의 도구 허브
        </p>
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">
          흩어진 로아 도구,<br />
          <span className="text-loa-gold">한 곳에서</span> 한 번에.
        </h1>
        <p className="mt-4 max-w-xl text-loa-muted">
          스펙 수치화부터 시세·재련·숙제 관리까지. 자주 쓰는 도구를 즐겨찾기하고,
          원정대를 등록해 캐릭터 조회 사이트로 바로 이동하세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/tools"
            className="rounded-lg bg-loa-gold px-5 py-2.5 text-sm font-semibold text-loa-bg transition-opacity hover:opacity-90"
          >
            도구 둘러보기
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg border border-loa-border px-5 py-2.5 text-sm font-semibold text-loa-text transition-colors hover:border-loa-goldDim"
          >
            원정대 등록하기
          </Link>
        </div>

        <div className="mt-8 flex gap-6 text-sm">
          <Metric value={TOOLS.length} label="도구 사이트" />
          <Metric value={CATEGORIES.length} label="카테고리" />
          <Metric value={TOOLS.filter((t) => t.type === "character").length} label="캐릭터 조회 연동" />
        </div>
      </section>

      {/* 카테고리 그리드 */}
      <section className="mt-12">
        <h2 className="mb-1 font-display text-xl font-bold">카테고리</h2>
        <p className="mb-5 text-sm text-loa-muted">용도별로 정리된 도구를 살펴보세요.</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const Icon = Icons[cat.icon] || Icons.Grid3x3GapFill;
            const count = getToolsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/tools#${cat.id}`}
                className="group flex items-center gap-4 rounded-xl border border-loa-border bg-loa-surface p-4 transition-all hover:border-loa-goldDim hover:bg-loa-surface2"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-loa-bg text-loa-gold">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-loa-text">{cat.label}</h3>
                    <span className="text-xs text-loa-muted">{count}</span>
                  </div>
                  <p className="truncate text-sm text-loa-muted">{cat.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl font-extrabold text-loa-gold">{value}</div>
      <div className="text-xs text-loa-muted">{label}</div>
    </div>
  );
}
