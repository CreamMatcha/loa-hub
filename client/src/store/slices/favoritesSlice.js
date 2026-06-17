import { createSlice } from "@reduxjs/toolkit";

// 즐겨찾기: { toolId: string, toolKey: string | null }[]
// 같은 사이트라도 toolKey가 다르면 별개의 즐겨찾기로 취급
const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { toolId, toolKey = null } = action.payload;
      const idx = state.items.findIndex(
        (item) => item.toolId === toolId && (item.toolKey ?? null) === (toolKey ?? null)
      );
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push({ toolId, toolKey: toolKey ?? null });
      }
    },
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    reorderFavorites: (state, action) => {
      const { from, to } = action.payload;
      if (from === to || from < 0 || to < 0 || from >= state.items.length || to >= state.items.length) return;
      const [item] = state.items.splice(from, 1);
      state.items.splice(to, 0, item);
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites, reorderFavorites } = favoritesSlice.actions;
export const selectFavoriteItems = (state) => state.favorites.items;
// 하위 호환: 서버 동기화 등 id 목록만 필요한 경우
export const selectFavoriteIds = (state) =>
  [...new Set(state.favorites.items.map((item) => item.toolId))];
export const selectIsFavorite = (toolId, toolKey = null) => (state) =>
  state.favorites.items.some(
    (item) => item.toolId === toolId && (item.toolKey ?? null) === (toolKey ?? null)
  );
export default favoritesSlice.reducer;
