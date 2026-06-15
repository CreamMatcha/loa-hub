import { createSlice } from "@reduxjs/toolkit";

// 즐겨찾기한 도구 id 목록
const initialState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
    setFavorites: (state, action) => {
      state.ids = action.payload;
    },
    clearFavorites: (state) => {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } = favoritesSlice.actions;
export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectIsFavorite = (id) => (state) => state.favorites.ids.includes(id);
export default favoritesSlice.reducer;
