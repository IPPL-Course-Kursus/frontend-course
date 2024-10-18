import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [],
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    fetchContentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContentSuccess: (state, action) => {
      state.content = action.payload;
      state.loading = false;
    },
    fetchContentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addContent: (state, action) => {
      state.content.push(action.payload);
    },
    deleteContent: (state, action) => {
      state.content = state.content.filter((content) => content.id !== action.payload);
    },
  },
});

export const {
  fetchContentStart,
  fetchContentSuccess,
  fetchContentFailure,
  addContent,
  deleteContent,
} = contentSlice.actions;

export default contentSlice.reducer;
