export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto", padding: "26px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, color: "var(--muted)", fontSize: 13 }}>
          <svg width="23" height="23" viewBox="0 0 32 32" fill="none">
            <line x1="16" y1="16" x2="16"   y2="6"  style={{ stroke: "var(--gold)" }} strokeWidth="2.1" strokeLinecap="round" />
            <line x1="16" y1="16" x2="6.8"  y2="22" style={{ stroke: "var(--gold)" }} strokeWidth="2.1" strokeLinecap="round" />
            <line x1="16" y1="16" x2="25.2" y2="22" style={{ stroke: "var(--gold)" }} strokeWidth="2.1" strokeLinecap="round" />
            <circle cx="16"   cy="6"  r="2.9" style={{ fill: "var(--gold)" }} />
            <circle cx="6.8"  cy="22" r="2.9" style={{ fill: "var(--gold)" }} />
            <circle cx="25.2" cy="22" r="2.9" style={{ fill: "var(--gold)" }} />
            <circle cx="16"   cy="16" r="5.4" style={{ fill: "var(--gold)" }} />
            <circle cx="16"   cy="16" r="2.1" style={{ fill: "var(--navy)" }} />
          </svg>
          LOA<span style={{ color: "var(--gold)", fontWeight: 700 }}>HUB</span>
          <span style={{ margin: "0 2px" }}>·</span>
          비공식 팬 프로젝트
        </div>
        <div style={{ fontSize: 12.5, color: "var(--muted)" }}>데이터 제공: 로스트아크 공식 API</div>
      </div>
    </footer>
  );
}
