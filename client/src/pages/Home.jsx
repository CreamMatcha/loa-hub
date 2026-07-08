import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORIES, getToolsByCategory, TOOLS, getCharacterTools } from "../data/tools";
import { selectRosters, selectRepresentativeChar } from "../store/slices/rosterSlice";
import { openLinks } from "../utils/openLinks";

const ICON_PATHS = {
  spec:    '<polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/>',
  search:  '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  upgrade: '<polyline points="6 13 12 7 18 13"/><polyline points="6 18 12 12 18 18"/>',
  life:    '<line x1="12" y1="21" x2="12" y2="16"/><polygon points="12 4 18 13 6 13"/><polygon points="12 9 17 17 7 17"/>',
  market:  '<circle cx="9" cy="10" r="5.5"/><circle cx="15" cy="14" r="5.5"/>',
  auction: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 9.5h7M8.5 14.5h7"/>',
  main:    '<path d="M4 5.5h16v10.5H10l-6 4.5z"/>',
  reward:  '<rect x="4" y="8" width="16" height="12" rx="1.5"/><line x1="12" y1="8" x2="12" y2="20"/><line x1="4" y1="13" x2="20" y2="13"/>',
  raid:    '<line x1="10" y1="7" x2="20" y2="7"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="17" x2="20" y2="17"/><polyline points="3 7 4.5 8.5 6.5 6"/><polyline points="3 12 4.5 13.5 6.5 11"/><polyline points="3 17 4.5 18.5 6.5 16"/>',
  arkgrid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
};

function CatIcon({ id }) {
  const path = ICON_PATHS[id] || ICON_PATHS.arkgrid;
  return (
    <span style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html:
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
    }} />
  );
}

export default function Home() {
  const rosters = useSelector(selectRosters);
  const representativeName = useSelector(selectRepresentativeChar);
  const allChars = rosters.flatMap((r) => r.characters);
  const firstChar = representativeName
    ? (allChars.find((c) => c.name === representativeName) ?? allChars[0] ?? null)
    : (allChars[0] ?? null);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 80px", animation: "loaFade .4s ease both" }}>

      {/* Hero */}
      <section className="home-hero" style={{
        position: "relative", overflow: "hidden",
        border: "1px solid var(--border)",
        borderRadius: "calc(var(--r) + 6px)",
        background: "linear-gradient(135deg, var(--surface), var(--bg2))",
        padding: 44,
        display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 36, alignItems: "center",
      }}>
        {/* 도트 — 우상단 골드 */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: 240, height: 200, pointerEvents: "none",
          backgroundImage: "radial-gradient(color-mix(in srgb, var(--gold) 60%, transparent) 1.5px, transparent 1.6px)",
          backgroundSize: "17px 17px",
          WebkitMaskImage: "radial-gradient(140px 140px at top right, #000, transparent 72%)",
          maskImage: "radial-gradient(140px 140px at top right, #000, transparent 72%)",
        }} />
        {/* 도트 — 좌하단 네이비 */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, width: 240, height: 200, pointerEvents: "none",
          backgroundImage: "radial-gradient(color-mix(in srgb, var(--navy) 60%, transparent) 1.5px, transparent 1.6px)",
          backgroundSize: "17px 17px",
          WebkitMaskImage: "radial-gradient(140px 140px at bottom left, #000, transparent 72%)",
          maskImage: "radial-gradient(140px 140px at bottom left, #000, transparent 72%)",
        }} />

        {/* 좌측 콘텐츠 */}
        <div style={{ position: "relative" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px",
            border: "1px solid color-mix(in srgb, var(--gold) 45%, transparent)",
            borderRadius: 999, fontSize: 12, fontWeight: 600,
            color: "var(--gold-text)", background: "var(--badge-bg)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
            로스트아크 편의 도구 허브
          </span>

          <h1 className="home-h1" style={{ margin: "18px 0 0", fontSize: 46, lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.03em" }}>
            흩어진 로아 도구,<br />
            <span style={{ color: "var(--gold-text)" }}>한 곳에서</span> 한 번에.
          </h1>

          <p style={{ margin: "18px 0 0", maxWidth: 440, fontSize: 15.5, lineHeight: 1.65, color: "var(--muted)" }}>
            스펙 수치화부터 시세 · 재련 · 숙제 관리까지. 자주 쓰는 도구를 즐겨찾기하고, 원정대를 등록해 캐릭터 조회 사이트로 바로 이동하세요.
          </p>

          <div className="home-btns" style={{ marginTop: 28, display: "flex", gap: 12 }}>
            <Link to="/tools" style={{
              padding: "13px 24px", borderRadius: 12, border: "none",
              background: "linear-gradient(140deg, var(--gold), var(--gold-deep))",
              color: "var(--on-gold)", fontSize: 14.5, fontWeight: 700, cursor: "pointer",
              textDecoration: "none",
              boxShadow: "0 6px 20px color-mix(in srgb, var(--gold) 32%, transparent)",
            }}>
              도구 둘러보기
            </Link>
            <Link to="/dashboard" style={{
              padding: "13px 24px", border: "1px solid var(--border)",
              borderRadius: 12, background: "var(--surface)", color: "var(--text)",
              fontSize: 14.5, fontWeight: 700, cursor: "pointer", textDecoration: "none",
            }}>
              원정대 등록하기
            </Link>
          </div>

          <div className="home-metrics" style={{ marginTop: 34, display: "flex", gap: 40 }}>
            <Metric value={TOOLS.length} label="도구 사이트" />
            <Metric value={CATEGORIES.length} label="카테고리" />
            <Metric value={TOOLS.filter((t) => t.type === "character").length} label="캐릭터 조회 연동" />
          </div>
        </div>

        {/* 우측 프리뷰 카드 */}
        <div className="home-preview" style={{
          position: "relative",
          background: "color-mix(in srgb, var(--bg) 55%, transparent)",
          border: "1px solid var(--border)", borderRadius: "var(--r)",
          padding: 18, backdropFilter: "blur(4px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>대표 캐릭터</span>
            <span style={{ fontSize: 11, color: "var(--navy)", fontWeight: 700 }}>
              {firstChar?.server ?? "실리안"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r2)", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{firstChar?.name ?? "골드비숍"}</div>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: "var(--on-gold)",
                  background: "var(--gold)", padding: "3px 8px", borderRadius: 6,
                }}>
                  {firstChar?.className ?? "홀리나이트"}
                </span>
              </div>
              <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "9px 11px" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>아이템 레벨</div>
                  <div style={{ fontWeight: 800, color: "var(--text)", fontSize: 15 }}>
                    {firstChar?.itemLevel ?? "1680.0"}
                  </div>
                </div>
                <div style={{ background: "var(--surface2)", borderRadius: 8, padding: "9px 11px" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>전투력</div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>
                    {firstChar?.combatPower ?? "2,945"}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {firstChar ? (
                <>
                  <a
                    href={`https://lopec.kr/character/specPoint/${encodeURIComponent(firstChar.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      flex: 1, background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: 8, padding: 9, textAlign: "center", fontSize: 12, fontWeight: 600,
                      color: "var(--text)", textDecoration: "none",
                    }}
                  >
                    로펙
                  </a>
                  <a
                    href={`https://loawa.com/char/${encodeURIComponent(firstChar.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      flex: 1, background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: 8, padding: 9, textAlign: "center", fontSize: 12, fontWeight: 600,
                      color: "var(--text)", textDecoration: "none",
                    }}
                  >
                    로아와
                  </a>
                  <button
                    onClick={() => {
                      const urls = getCharacterTools().map((t) => t.charUrl(firstChar.name));
                      const ok = openLinks(urls);
                      if (!ok) alert("팝업이 차단되었어요. 브라우저에서 이 사이트의 팝업을 허용해 주세요.");
                    }}
                    style={{
                      flex: 1, background: "#fff", border: "1px solid var(--navy)",
                      borderRadius: 8, padding: 9, textAlign: "center", fontSize: 12, fontWeight: 700,
                      color: "var(--navy)", cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    전체 열기
                  </button>
                </>
              ) : (
                <Link to="/dashboard" style={{
                  flex: 1, background: "#fff", border: "1px solid var(--navy)",
                  borderRadius: 8, padding: 9, textAlign: "center", fontSize: 12, fontWeight: 700,
                  color: "var(--navy)", textDecoration: "none",
                }}>
                  원정대 등록
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" }}>카테고리</h2>
        <p style={{ margin: "6px 0 22px", fontSize: 14, color: "var(--muted)" }}>용도별로 정리된 도구를 살펴보세요.</p>
        <div className="home-cats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} count={getToolsByCategory(cat.id).length} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ cat, count }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={`/tools#${cat.id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 15,
          background: "var(--surface)",
          border: `1px solid ${hovered ? "color-mix(in srgb, var(--gold) 55%, var(--border))" : "var(--border)"}`,
          borderRadius: "var(--r)", padding: 17, cursor: "pointer",
          transition: "border-color .18s, transform .18s",
          transform: hovered ? "translateY(-2px)" : "none",
        }}>
        <div style={{
          flexShrink: 0, width: 46, height: 46, borderRadius: 11,
          background: "var(--icon-bg)", border: "1px solid var(--border)",
          color: "var(--icon-fg)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CatIcon id={cat.id} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{cat.label}</span>
            <span style={{ fontSize: 11, color: "var(--muted)", background: "var(--surface2)", padding: "1px 7px", borderRadius: 6 }}>{count}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat.desc}</div>
        </div>
      </div>
    </Link>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "var(--gold-text)" }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{label}</div>
    </div>
  );
}
