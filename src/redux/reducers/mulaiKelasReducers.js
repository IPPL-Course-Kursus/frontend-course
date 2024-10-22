import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startCourseData: {},  // Tambahkan state baru untuk menyimpan data course
};

const mulaiKelasSlice = createSlice({
  name: "mulaiKelas",
  initialState,
  reducers: {
    setStartCourse: (state, action) => {
      state.startCourseData = action.payload;
    },
    removeStartCourse: (state) => {
      state.startCourseData = {};
    },
  },
});

export const { setStartCourse, removeStartCourse } = mulaiKelasSlice.actions;

export default mulaiKelasSlice.reducer;
