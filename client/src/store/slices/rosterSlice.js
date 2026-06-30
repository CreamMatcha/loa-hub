import { createSlice } from "@reduxjs/toolkit";

// rosters: [{ mainChar, server, fetchedAt, characters: [...] }]
const initialState = {
  rosters: [],
  representativeChar: null, // 대표 캐릭터 이름 (null이면 미설정)
};

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    // 원정대 추가 (같은 mainChar면 덮어쓰기) — 다른 그룹에 겹치는 캐릭터는 제거하여 중복 방지
    addRoster: (state, action) => {
      const { mainChar, characters } = action.payload;
      const incomingNames = new Set(characters.map((c) => c.name));
      state.rosters.forEach((r) => {
        if (r.mainChar !== mainChar) {
          r.characters = r.characters.filter((c) => !incomingNames.has(c.name));
        }
      });
      state.rosters = state.rosters.filter((r) => r.mainChar === mainChar || r.characters.length > 0);

      const idx = state.rosters.findIndex((r) => r.mainChar === mainChar);
      const entry = { ...action.payload, fetchedAt: Date.now() };
      if (idx >= 0) state.rosters[idx] = entry;
      else state.rosters.push(entry);
    },
    // 원정대 전체 삭제
    removeRoster: (state, action) => {
      state.rosters = state.rosters.filter((r) => r.mainChar !== action.payload);
      // 삭제된 원정대 소속 대표 캐릭터 초기화
      const allNames = new Set(state.rosters.flatMap((r) => r.characters.map((c) => c.name)));
      if (state.representativeChar && !allNames.has(state.representativeChar)) {
        state.representativeChar = null;
      }
    },
    // 단일 캐릭터 삭제 (모든 원정대 대상, 빈 원정대 자동 제거)
    removeCharacter: (state, action) => {
      state.rosters.forEach((r) => {
        r.characters = r.characters.filter((c) => c.name !== action.payload);
      });
      state.rosters = state.rosters.filter((r) => r.characters.length > 0);
      if (state.representativeChar === action.payload) {
        state.representativeChar = null;
      }
    },
    // 캐릭터 필드 업데이트 (전투력 등)
    updateCharacter: (state, action) => {
      const { name, ...fields } = action.payload;
      state.rosters.forEach((r) => {
        const char = r.characters.find((c) => c.name === name);
        if (char) Object.assign(char, fields);
      });
    },
    // 캐릭터 1명 추가 → "개별 캐릭터" 그룹에 합산 (모든 그룹 통틀어 중복 방지)
    addSingleCharacter: (state, action) => {
      const KEY = "개별 캐릭터";
      const exists = state.rosters.some((r) => r.characters.some((c) => c.name === action.payload.name));
      if (exists) return;
      let roster = state.rosters.find((r) => r.mainChar === KEY);
      if (!roster) {
        state.rosters.push({ mainChar: KEY, server: "", fetchedAt: Date.now(), characters: [] });
        roster = state.rosters[state.rosters.length - 1];
      }
      roster.characters.push(action.payload);
    },
    // 원정대 내 캐릭터 순서 변경
    reorderCharacters: (state, action) => {
      const { mainChar, from, to } = action.payload;
      const roster = state.rosters.find((r) => r.mainChar === mainChar);
      if (!roster) return;
      const [item] = roster.characters.splice(from, 1);
      roster.characters.splice(to, 0, item);
    },
    // 대표 캐릭터 설정 (같은 이름 재클릭 시 해제)
    setRepresentativeChar: (state, action) => {
      state.representativeChar = state.representativeChar === action.payload ? null : action.payload;
    },
    // 서버 복원용 직접 할당 (토글 없이)
    restoreRepresentativeChar: (state, action) => {
      state.representativeChar = action.payload ?? null;
    },
    // 서버에서 복원
    setRosters: (state, action) => {
      state.rosters = action.payload;
    },
    clearRoster: (state) => {
      state.rosters = [];
      state.representativeChar = null;
    },
  },
});

export const {
  addRoster, addSingleCharacter, removeRoster, removeCharacter,
  updateCharacter, reorderCharacters, setRosters, clearRoster,
  setRepresentativeChar, restoreRepresentativeChar,
} = rosterSlice.actions;

export const selectRosters = (state) =>
  (state.roster?.rosters ?? []).filter((r) => Array.isArray(r.characters));
export const selectAllCharacters = (state) => state.roster.rosters.flatMap((r) => r.characters);
export const selectRepresentativeChar = (state) => state.roster.representativeChar ?? null;
export default rosterSlice.reducer;
