import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

import authReducer from "./slices/authSlice";
import rosterReducer from "./slices/rosterSlice";
import favoritesReducer from "./slices/favoritesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  roster: rosterReducer,
  favorites: favoritesReducer,
});

// 저장 데이터 스키마 버전 (로컬 Persist + 서버 저장 공용)
export const DATA_VERSION = 4;

// 구 주소(herokuapp)에서 URL 해시(#migrate=...)로 넘어온 로컬 데이터 반입.
// persistStore가 실행되기 전(모듈 로드 시점)에 localStorage에 넣어야 하며,
// 새 주소에 이미 데이터가 있으면 덮어쓰지 않는다.
try {
  const m = window.location.hash.match(/#migrate=(.+)/);
  if (m) {
    const data = JSON.parse(decodeURIComponent(atob(m[1])));
    if (data.p && !window.localStorage.getItem("persist:loa-hub-root")) {
      window.localStorage.setItem("persist:loa-hub-root", data.p);
    }
    if (data.r && !window.localStorage.getItem("loa-recent-searches")) {
      window.localStorage.setItem("loa-recent-searches", data.r);
    }
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
} catch (e) {
  console.warn("[MIGRATE] 구 주소 데이터 반입 실패:", e);
}

// 구버전 데이터를 마이그레이션하기 전에 원본을 백업 (마이그레이션 문제 시 복구용)
try {
  const raw = window.localStorage.getItem("persist:loa-hub-root");
  if (raw) {
    const oldVersion = JSON.parse(JSON.parse(raw)._persist ?? "{}").version ?? 0;
    const backupKey = `persist:loa-hub-root-backup-v${oldVersion}`;
    if (oldVersion < DATA_VERSION && !window.localStorage.getItem(backupKey)) {
      window.localStorage.setItem(backupKey, raw);
    }
  }
} catch (e) {
  console.warn("[PERSIST] 마이그레이션 전 백업 실패:", e);
}

// 새로고침 후에도 유지할 슬라이스만 화이트리스트로 지정
const persistConfig = {
  key: "loa-hub-root",
  version: DATA_VERSION,
  storage,
  whitelist: ["auth", "roster", "favorites"],
  migrate: (state) => {
    if (!state) return Promise.resolve(state);
    const original = state;
    try {
      // v1 → v2: roster.characters[] → roster.rosters[]
      if (state.roster && state.roster.characters !== undefined) {
        state = {
          ...state,
          roster: { rosters: [] },
          favorites: { items: [] },
        };
      }
      // v2 → v3: favorites.ids(string[]) → favorites.items({toolId,toolKey}[])
      if (state.favorites && Array.isArray(state.favorites.ids)) {
        state = {
          ...state,
          favorites: {
            items: (state.favorites.ids || []).map((id) => ({ toolId: id, toolKey: null })),
          },
        };
      }
      // v3 → v4: 로아차트 대표 URL이 더보기 계산기(/rewardcalc)에서 홈으로 변경됨.
      // 구버전에서 저장한 로아차트 즐겨찾기는 더보기 계산기를 가리키던 것이므로 하위 도구로 이관
      if ((state._persist?.version ?? 0) < 4 && Array.isArray(state.favorites?.items)) {
        state = {
          ...state,
          favorites: {
            ...state.favorites,
            items: state.favorites.items.map((it) =>
              it.toolId === "loachart" && (it.toolKey ?? null) === null
                ? { ...it, toolKey: "reward" }
                : it
            ),
          },
        };
      }
      return Promise.resolve(state);
    } catch (e) {
      // 마이그레이션 도중 오류가 나면 데이터를 초기화하지 않고 원본 그대로 사용
      console.error("[PERSIST] 마이그레이션 실패 — 원본 데이터 유지:", e);
      return Promise.resolve(original);
    }
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist 액션은 직렬화 검사에서 제외
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
