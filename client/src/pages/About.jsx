import { Github, EnvelopeFill, Joystick, CodeSlash, HexagonFill } from "react-bootstrap-icons";
import profileImg from "../assets/profile.png";

const stack = ["React", "Redux Toolkit", "React Router", "Tailwind CSS", "Node.js", "Express", "MongoDB"];

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-loa-border bg-loa-surface p-8 sm:p-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* 프로필 사진 */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 overflow-hidden rounded-2xl border-2 border-loa-goldDim">
              <img src={profileImg} alt="서윤 프로필" className="h-full w-full object-cover" />
            </div>
            <HexagonFill className="absolute -bottom-2 -right-2 text-loa-gold" size={22} />
          </div>

          {/* 소개 */}
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl font-extrabold">서윤</h1>
            <p className="mt-1 text-sm font-medium text-loa-gold">
              프론트엔드 개발자
            </p>
            <p className="mt-4 leading-relaxed text-loa-muted">
              게임을 즐겨 하는 개발자입니다. LOAHUB는 여러 편의성 사이트가 흩어져있는 것이
              불편해서 직접 만든 올인원 허브입니다. 다양한 도구를 이용하시는 분들께 도움이
              되길 바랍니다.
            </p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-loa-text">
            <CodeSlash size={16} className="text-loa-gold" />
            사용 기술
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-loa-border bg-loa-bg px-3 py-1.5 text-xs font-medium text-loa-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* 링크 */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://github.com/CreamMatcha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-loa-border px-4 py-2 text-sm text-loa-text transition-colors hover:border-loa-goldDim"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="mailto:youlaa357@gmail.com"
            className="flex items-center gap-2 rounded-lg border border-loa-border px-4 py-2 text-sm text-loa-text transition-colors hover:border-loa-goldDim"
          >
            <EnvelopeFill size={15} /> youlaa357@gmail.com
          </a>
          <span className="flex items-center gap-2 rounded-lg border border-loa-border px-4 py-2 text-sm text-loa-muted">
            <Joystick size={15} /> 카제로스 서버 · 바드
          </span>
        </div>
      </div>
    </div>
  );
}
