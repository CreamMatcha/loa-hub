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

// 새로고침 후에도 유지할 슬라이스만 화이트리스트로 지정
const persistConfig = {
  key: "loa-hub-root",
  version: 3,
  storage,
  whitelist: ["auth", "roster", "favorites"],
  migrate: (state) => {
    if (!state) return Promise.resolve(state);
    // v1 → v2: roster.characters[] → roster.rosters[]
    if (state.roster && state.roster.characters !== undefined) {
      return Promise.resolve({
        ...state,
        roster: { rosters: [] },
        favorites: { items: [] },
      });
    }
    // v2 → v3: favorites.ids(string[]) → favorites.items({toolId,toolKey}[])
    if (state.favorites && Array.isArray(state.favorites.ids)) {
      return Promise.resolve({
        ...state,
        favorites: {
          items: (state.favorites.ids || []).map((id) => ({ toolId: id, toolKey: null })),
        },
      });
    }
    return Promise.resolve(state);
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
