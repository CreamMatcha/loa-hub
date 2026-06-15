import { createSlice } from "@reduxjs/toolkit";

// rosters: [{ mainChar, server, fetchedAt, characters: [...] }]
const initialState = {
  rosters: [],
};

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    // 원정대 추가 (같은 mainChar면 덮어쓰기)
    addRoster: (state, action) => {
      const { mainChar } = action.payload;
      const idx = state.rosters.findIndex((r) => r.mainChar === mainChar);
      const entry = { ...action.payload, fetchedAt: Date.now() };
      if (idx >= 0) state.rosters[idx] = entry;
      else state.rosters.push(entry);
    },
    // 원정대 전체 삭제
    removeRoster: (state, action) => {
      state.rosters = state.rosters.filter((r) => r.mainChar !== action.payload);
    },
    // 단일 캐릭터 삭제 (모든 원정대 대상, 빈 원정대 자동 제거)
    removeCharacter: (state, action) => {
      state.rosters.forEach((r) => {
        r.characters = r.characters.filter((c) => c.name !== action.payload);
      });
      state.rosters = state.rosters.filter((r) => r.characters.length > 0);
    },
    // 캐릭터 필드 업데이트 (전투력 등)
    updateCharacter: (state, action) => {
      const { name, ...fields } = action.payload;
      state.rosters.forEach((r) => {
        const char = r.characters.find((c) => c.name === name);
        if (char) Object.assign(char, fields);
      });
    },
    // 캐릭터 1명 추가 → "개별 캐릭터" 그룹에 합산 (중복 방지)
    addSingleCharacter: (state, action) => {
      const KEY = "개별 캐릭터";
      let roster = state.rosters.find((r) => r.mainChar === KEY);
      if (!roster) {
        state.rosters.push({ mainChar: KEY, server: "", fetchedAt: Date.now(), characters: [] });
        roster = state.rosters[state.rosters.length - 1];
      }
      const exists = roster.characters.some((c) => c.name === action.payload.name);
      if (!exists) roster.characters.push(action.payload);
    },
    // 서버에서 복원
    setRosters: (state, action) => {
      state.rosters = action.payload;
    },
    clearRoster: (state) => {
      state.rosters = [];
    },
  },
});

export const { addRoster, addSingleCharacter, removeRoster, removeCharacter, updateCharacter, setRosters, clearRoster } =
  rosterSlice.actions;

export const selectRosters = (state) =>
  (state.roster?.rosters ?? []).filter((r) => Array.isArray(r.characters));
export const selectAllCharacters = (state) => state.roster.rosters.flatMap((r) => r.characters);
export default rosterSlice.reducer;
