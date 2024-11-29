import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: null,
  isLoading: false,
  error: null,
};

const compilerSlice = createSlice({
  name: "compiler",
  initialState,
  reducers: {
    compileStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    compileSuccess(state, action) {
      state.isLoading = false;
      state.result = action.payload;
    },
    compileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { compileStart, compileSuccess, compileFailure } = compilerSlice.actions;

export default compilerSlice.reducer;
