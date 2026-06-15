import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/slices/authSlice";
import { selectRosters } from "../store/slices/rosterSlice";
import { selectFavoriteIds } from "../store/slices/favoritesSlice";
import { apiSaveMyData } from "../api";

// 로그인 상태에서 즐겨찾기·원정대 변경 시 2초 디바운스 후 서버에 자동 저장
export function useSyncToServer() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const rosters = useSelector(selectRosters);
  const favoriteIds = useSelector(selectFavoriteIds);
  const timerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      apiSaveMyData({ roster: rosters, favorites: favoriteIds }).catch(() => {});
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [isLoggedIn, rosters, favoriteIds]);
}
