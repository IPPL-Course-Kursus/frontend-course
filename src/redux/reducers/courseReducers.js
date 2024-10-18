import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  detail: {}, // Ubah menjadi objek
  mycourse: [],
  free: [],
  pageCourse: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = {
        ...action.payload, 
        recommendedCourses: action.payload.recommendedCourses || [] // Simpan recommendedCourses
      };
    },
    setMyCourse: (state, action) => {
      state.mycourse = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    setFree: (state, action) => {
      state.free = action.payload;
    },
    setPageCourse: (state, action) => {
      state.pageCourse = action.payload;
    },
    removeDetail: (state) => {
      state.detail = {};
    },
  },
});

export const {
  setCourse,
  setDetail,
  removeDetail,
  setMyCourse,
  setPopular,
  setFree,
  setPageCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;

