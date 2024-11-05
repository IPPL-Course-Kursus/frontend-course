import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapter: [],
  loading: false,
  error: null,
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setchapter: (state, action) => {
      state.chapter = action.payload;
    },
    fetchChaptersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchChapterRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteChapterFailure: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchChaptersSuccess: (state, action) => {
      console.log("Data received in reducer:", action.payload); // Log data yang diterima
      state.chapter = action.payload; // Pastikan payload di sini sesuai
      state.loading = false;
    },
    fetchChaptersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addChapter: (state, action) => {
      state.chapter.push(action.payload);
    },
    deleteChapter: (state, action) => {
      state.chapter = state.chapter.filter((chapter) => chapter.id !== action.payload);
    },

    updateChapterRequest: (state) => {
      state.loading = true;
      state.error = null;

    },

    updateChapterSuccess: (state, action) => {
      state.loading = false;
      state.chapter = action.payload;
      state.error = null;
    },
    updateChapterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchChapterRequest,
  deleteChapterFailure,
  setchapter,
  fetchChaptersStart,
  fetchChaptersSuccess,
  fetchChaptersFailure,
  addChapter,
  deleteChapter,
  updateChapterRequest,
  updateChapterSuccess,
  updateChapterFailure,
} = chapterSlice.actions;

export default chapterSlice.reducer;
