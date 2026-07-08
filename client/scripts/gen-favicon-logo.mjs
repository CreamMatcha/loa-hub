import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SIZE = 512;
const GOLD = "#F3C24C";
const NAVY = "#3B6CCB";

// 로고 좌표 (512×512 기준)
const cx = 256, cy = 256;
const top    = { x: 256, y: 60  };
const left   = { x: 92,  y: 372 };
const right  = { x: 420, y: 372 };
const r_end  = 44;   // 끝점 원 반지름
const r_ctr  = 82;   // 중심 원 반지름
const r_dot  = 32;   // 중심 네이비 점 반지름
const sw     = 26;   // 선 두께

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <!-- 배경 투명 -->
  <!-- 선 -->
  <line x1="${cx}" y1="${cy}" x2="${top.x}" y2="${top.y}"     stroke="${GOLD}" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy}" x2="${left.x}" y2="${left.y}"   stroke="${GOLD}" stroke-width="${sw}" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy}" x2="${right.x}" y2="${right.y}" stroke="${GOLD}" stroke-width="${sw}" stroke-linecap="round"/>
  <!-- 끝점 원 -->
  <circle cx="${top.x}"   cy="${top.y}"   r="${r_end}" fill="${GOLD}"/>
  <circle cx="${left.x}"  cy="${left.y}"  r="${r_end}" fill="${GOLD}"/>
  <circle cx="${right.x}" cy="${right.y}" r="${r_end}" fill="${GOLD}"/>
  <!-- 중심 원 -->
  <circle cx="${cx}" cy="${cy}" r="${r_ctr}" fill="${GOLD}"/>
  <circle cx="${cx}" cy="${cy}" r="${r_dot}" fill="${NAVY}"/>
</svg>`;

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: SIZE } });
const png = resvg.render().asPng();
const outPath = join(__dirname, "../public/favicon_logo.png");
writeFileSync(outPath, png);
console.log(`✓ favicon_logo.png 생성 완료 (${SIZE}×${SIZE})`);
