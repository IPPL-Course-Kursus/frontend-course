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
    fetchContentesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
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
    deleteContentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateContentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateContentSuccess: (state, action) => {
      state.loading = false;
      state.content = action.payload;
      state.error = null;
    },
    updateContentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchContentesRequest,
  fetchContentStart,
  fetchContentSuccess,
  fetchContentFailure,
  addContent,
  deleteContent,
  deleteContentFailure,
  updateContentRequest,
  updateContentSuccess,
  updateContentFailure,
} = contentSlice.actions;

export default contentSlice.reducer;
