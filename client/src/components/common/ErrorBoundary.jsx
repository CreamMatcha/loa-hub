import { Component } from "react";

// 렌더링 중 예외 발생 시 흰 화면 대신 안내 화면을 보여주는 경계
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[UI] 렌더링 오류:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12,
        background: "var(--bg, #0d1117)", color: "var(--text, #e6e6e6)",
        padding: 24, textAlign: "center",
      }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>문제가 발생했어요</h1>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted, #9aa4b2)", maxWidth: 360, lineHeight: 1.6 }}>
          일시적인 오류일 수 있어요. 새로고침해도 반복되면
          브라우저 콘솔(F12)에 표시된 오류 내용을 제보해 주세요.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 8, padding: "10px 22px", borderRadius: 10,
            border: "1px solid var(--border, #333)",
            background: "var(--gold, #d4a94e)", color: "var(--on-gold, #1a1205)",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          새로고침
        </button>
      </div>
    );
  }
}
