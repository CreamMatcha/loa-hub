import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const W = 1200, H = 630;
const BG    = "#0A1020";
const BG2   = "#0D1526";
const GOLD  = "#F3C24C";
const NAVY  = "#3B6CCB";
const TEXT  = "#EAEEF7";
const MUTED = "#8696AE";
const BORDER = "#26344C";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${BG2}"/>
      <stop offset="100%" stop-color="${BG}"/>
    </linearGradient>
    <!-- 골드 도트 패턴 마스크 (우상단) -->
    <radialGradient id="dot-mask-tr" cx="100%" cy="0%" r="30%">
      <stop offset="0%" stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <!-- 네이비 도트 패턴 마스크 (좌하단) -->
    <radialGradient id="dot-mask-bl" cx="0%" cy="100%" r="30%">
      <stop offset="0%" stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <filter id="logo-glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- 배경 -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- 테두리 -->
  <rect x="1" y="1" width="${W-2}" height="${H-2}" rx="20" fill="none" stroke="${BORDER}" stroke-width="2"/>

  <!-- 도트 패턴 — 우상단 골드 -->
  ${Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 16 }, (_, col) => {
      const x = W - 240 + col * 17;
      const y = row * 17;
      const dx = (x - W) / 240, dy = y / 200;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const opacity = Math.max(0, 0.5 - dist * 0.7);
      return `<circle cx="${x}" cy="${y}" r="1.5" fill="${GOLD}" opacity="${opacity.toFixed(2)}"/>`;
    }).join("")
  ).join("")}

  <!-- 도트 패턴 — 좌하단 네이비 -->
  ${Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 16 }, (_, col) => {
      const x = col * 17;
      const y = H - 200 + row * 17;
      const dx = x / 240, dy = (y - H) / 200;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const opacity = Math.max(0, 0.5 - dist * 0.7);
      return `<circle cx="${x}" cy="${y}" r="1.5" fill="${NAVY}" opacity="${opacity.toFixed(2)}"/>`;
    }).join("")
  ).join("")}

  <!-- 로고 (중앙 기준 cx=580, cy=248) -->
  <g transform="translate(472, 188)" filter="url(#logo-glow)">
    <!-- lines -->
    <line x1="60" y1="60" x2="60"   y2="8"   stroke="${GOLD}" stroke-width="6.5" stroke-linecap="round"/>
    <line x1="60" y1="60" x2="15.6" y2="87"  stroke="${GOLD}" stroke-width="6.5" stroke-linecap="round"/>
    <line x1="60" y1="60" x2="104.4" y2="87" stroke="${GOLD}" stroke-width="6.5" stroke-linecap="round"/>
    <!-- endpoint circles -->
    <circle cx="60"    cy="8"  r="11" fill="${GOLD}"/>
    <circle cx="15.6"  cy="87" r="11" fill="${GOLD}"/>
    <circle cx="104.4" cy="87" r="11" fill="${GOLD}"/>
    <!-- center -->
    <circle cx="60" cy="60" r="20.5" fill="${GOLD}"/>
    <circle cx="60" cy="60" r="8"    fill="${NAVY}"/>
  </g>

  <!-- LOA -->
  <text x="594" y="272"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900" font-size="88"
    fill="${TEXT}" text-anchor="start" dominant-baseline="auto">LOA</text>

  <!-- HUB -->
  <text x="804" y="272"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900" font-size="88"
    fill="${GOLD}" text-anchor="start" dominant-baseline="auto">HUB</text>

  <!-- 구분선 -->
  <line x1="480" y1="296" x2="720" y2="296" stroke="${BORDER}" stroke-width="1.5" opacity="0.8"/>

  <!-- 서브타이틀 -->
  <text x="600" y="342"
    font-family="Arial, sans-serif"
    font-weight="400" font-size="28" letter-spacing="4"
    fill="${MUTED}" text-anchor="middle">로스트아크 편의 도구 허브</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
});
const png = resvg.render().asPng();
const outPath = join(__dirname, "../public/og-image-v2.png");
writeFileSync(outPath, png);
console.log(`✓ og-image-v2.png 생성 완료 (${W}×${H})`);
