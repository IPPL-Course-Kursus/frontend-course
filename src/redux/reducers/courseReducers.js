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
    fetchCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchCourseSuccess: (state, action) => {
      state.content = action.payload;
      state.loading = false;
    },

    fetchCourseFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    setDetail: (state, action) => {
      state.detail = {
        ...action.payload,
        recommendedCourses: action.payload.recommendedCourses || [],
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
  fetchCourseStart,
  fetchCourseSuccess,
  fetchCourseFailure,
} = coursesSlice.actions;

export default coursesSlice.reducer;
