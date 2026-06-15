import { createSlice, nanoid } from "@reduxjs/toolkit";

// 멀티 오픈 프리셋: 도구 묶음을 저장해두고 한 번에 여러 탭으로 열기
// preset: { id, name, toolIds: [] }
const initialState = {
  presets: [],
};

const presetSlice = createSlice({
  name: "presets",
  initialState,
  reducers: {
    addPreset: {
      reducer: (state, action) => {
        state.presets.push(action.payload);
      },
      prepare: (name, toolIds) => ({
        payload: { id: nanoid(), name, toolIds },
      }),
    },
    updatePreset: (state, action) => {
      const { id, name, toolIds } = action.payload;
      const p = state.presets.find((x) => x.id === id);
      if (p) {
        if (name !== undefined) p.name = name;
        if (toolIds !== undefined) p.toolIds = toolIds;
      }
    },
    removePreset: (state, action) => {
      state.presets = state.presets.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPreset, updatePreset, removePreset } = presetSlice.actions;
export const selectPresets = (state) => state.presets.presets;
export default presetSlice.reducer;
