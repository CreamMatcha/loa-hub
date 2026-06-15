import { HexagonFill } from "react-bootstrap-icons";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-loa-border py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-loa-muted">
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <HexagonFill className="text-loa-goldDim" size={14} />
          <span className="font-display font-semibold">LOAHUB</span>
        </div>
        <p>로스트아크 편의 도구 모음 · 본 사이트는 비공식 팬 프로젝트입니다.</p>
        <p className="mt-1 text-xs text-loa-border">
          데이터 출처: LOSTARK Open API · 각 도구의 저작권은 해당 제작자에게 있습니다.
        </p>
      </div>
    </footer>
  );
}
