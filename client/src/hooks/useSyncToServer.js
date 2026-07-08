import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/slices/authSlice";
import { selectRosters, selectRepresentativeChar } from "../store/slices/rosterSlice";
import { selectFavoriteItems } from "../store/slices/favoritesSlice";
import { apiSaveMyData } from "../api";
import { DATA_VERSION } from "../store";

// 로그인 상태에서 즐겨찾기·원정대 변경 시 2초 디바운스 후 서버에 자동 저장
export function useSyncToServer() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const rosters = useSelector(selectRosters);
  const favoriteItems = useSelector(selectFavoriteItems);
  const representativeChar = useSelector(selectRepresentativeChar);
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
      apiSaveMyData({ roster: rosters, favorites: favoriteItems, representativeChar, dataVersion: DATA_VERSION }).catch((e) => {
        console.warn("[SYNC] 서버 저장 실패 — 로컬에는 유지됨:", e.response?.status ?? e.message);
      });
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [isLoggedIn, rosters, favoriteItems, representativeChar]);
}
