import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null, // { id, username }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectIsLoggedIn = (state) => !!state.auth.token;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
