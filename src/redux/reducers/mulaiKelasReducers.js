import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailCourseUser: {},
  courseUser: {},
  chapters: [], // Menyimpan data chapters
  content: {},  // Menyimpan data content
  // Tambahkan state lain jika diperlukan...
};

const mulaikelasSlice = createSlice({
  name: "mulaikelas",
  initialState,
  reducers: {
    setDetailCourseUser: (state, action) => {
      state.detailCourseUser = action.payload;
    },
    setCourseUser: (state, action) => {
      state.courseUser = action.payload;
    },
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    // Tambahkan reducers lain jika diperlukan...
  },
});

// Export actions untuk digunakan di action creators atau komponen
export const {
  setDetailCourseUser,
  setCourseUser,
  setChapters,
  setContent, // Pastikan setContent diexport
} = mulaikelasSlice.actions;

export default mulaikelasSlice.reducer;

