import { Github, EnvelopeFill, Joystick, CodeSlash } from "react-bootstrap-icons";

const stack = ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Node.js", "Express", "MongoDB"];

export default function About() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px", animation: "loaFade .4s ease both" }}>
      <div style={{
        border: "1px solid var(--border)", borderRadius: "var(--r)",
        background: "var(--surface)", padding: 36,
        overflow: "hidden",
      }}>
        {/* 헤더 */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
          {/* 프로필 플레이스홀더 */}
          <div style={{
            flexShrink: 0, width: 84, height: 84, borderRadius: 16,
            border: "2px solid color-mix(in srgb, var(--gold) 55%, transparent)",
            background: "repeating-linear-gradient(135deg, var(--surface2) 0 10px, color-mix(in srgb, var(--gold) 7%, var(--surface2)) 10px 20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, userSelect: "none",
          }}>
            🎮
          </div>

          {/* 소개 텍스트 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>서윤</h1>
            <p style={{ margin: "5px 0 0", fontSize: 14, fontWeight: 600, color: "var(--gold-text)" }}>
              프론트엔드 개발자
            </p>
            <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "var(--muted)" }}>
              게임을 즐겨 하는 개발자입니다. LOAHUB는 여러 편의성 사이트가 흩어져 있는 것이
              불편해서 직접 만든 올인원 허브입니다. 다양한 도구를 이용하시는 분들께 도움이
              되길 바랍니다.
            </p>
          </div>
        </div>

        <div style={{ margin: "28px 0", height: 1, background: "var(--border)" }} />

        {/* 기술 스택 */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13.5, fontWeight: 700 }}>
            <CodeSlash size={15} style={{ color: "var(--gold-text)" }} />
            사용 기술
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stack.map((s) => (
              <span key={s} style={{
                borderRadius: 8, border: "1px solid var(--border)",
                background: "var(--bg)", padding: "6px 14px",
                fontSize: 12.5, fontWeight: 500, color: "var(--muted)",
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ margin: "28px 0", height: 1, background: "var(--border)" }} />

        {/* 링크 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <a
            href="https://github.com/CreamMatcha"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              borderRadius: "var(--r2)", border: "1px solid var(--border)",
              padding: "9px 16px", fontSize: 13.5, fontWeight: 500,
              color: "var(--text)", textDecoration: "none",
              transition: "border-color .18s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "color-mix(in srgb, var(--gold) 55%, var(--border))")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <Github size={15} /> GitHub
          </a>
          <a
            href="mailto:youlaa357@gmail.com"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              borderRadius: "var(--r2)", border: "1px solid color-mix(in srgb, var(--gold) 40%, var(--border))",
              padding: "9px 16px", fontSize: 13.5, fontWeight: 500,
              color: "var(--gold-text)", textDecoration: "none",
              background: "var(--badge-bg)",
            }}
          >
            <EnvelopeFill size={14} /> youlaa357@gmail.com
          </a>
          <span style={{
            display: "flex", alignItems: "center", gap: 8,
            borderRadius: "var(--r2)", border: "1px solid var(--border)",
            padding: "9px 16px", fontSize: 13.5, fontWeight: 500, color: "var(--muted)",
          }}>
            <Joystick size={14} /> 카제로스 서버 · 바드
          </span>
        </div>
      </div>
    </div>
  );
}
