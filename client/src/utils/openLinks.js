// 여러 URL을 새 탭으로 한 번에 열기 (팝업 차단 시 false 반환)
export function openLinks(urls) {
  if (!urls || urls.length === 0) return true;
  let blocked = false;
  urls.forEach((url) => {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) blocked = true;
  });
  return !blocked;
}
