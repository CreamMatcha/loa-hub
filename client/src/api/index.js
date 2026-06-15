import axios from "axios";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";

// 백엔드 베이스 URL (개발 시 Vite 프록시 또는 env)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 12000,
});

// 모든 요청에 JWT 토큰 자동 첨부
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 → 자동 로그아웃
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) store.dispatch(logout());
    return Promise.reject(err);
  }
);

// ---- 인증 ----
export const apiRegister = (username, password) =>
  api.post("/auth/register", { username, password }).then((r) => r.data);
export const apiLogin = (username, password) =>
  api.post("/auth/login", { username, password }).then((r) => r.data);

// ---- 로스트아크 (백엔드 프록시) ----
// 원정대(부캐) 조회 — 백엔드가 공식 API 키를 붙여 대신 호출
export const apiFetchRoster = (characterName) =>
  api.get(`/lostark/siblings/${encodeURIComponent(characterName)}`).then((r) => r.data);
// 단일 캐릭터 프로필 (전투력, 직업, 템렙 등)
export const apiFetchProfile = (characterName) =>
  api.get(`/lostark/profile/${encodeURIComponent(characterName)}`).then((r) => r.data);

// ---- 서버 저장 (로그인 시) ----
export const apiGetMyData = () => api.get("/me/data").then((r) => r.data);
export const apiSaveMyData = (payload) => api.put("/me/data", payload).then((r) => r.data);

export default api;
