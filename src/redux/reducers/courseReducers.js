import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  detail: {}, // Ubah menjadi objek
  mycourse: [],
  free: [],
  pageCourse: [],
  loading: false,
  error: null, // Tambahkan error dan loading ke initial state
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
    addCourseRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addCourseSuccess(state, action) {
      state.courses.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addCourseFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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

    // Tambahkan aksi baru untuk delete course
    deleteCourseRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCourseSuccess(state, action) {
      state.courses = state.courses.filter((course) => course.id !== action.payload); // Ubah sesuai dengan ID kursus
      state.loading = false;
      state.error = null;
    },
    deleteCourseFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCourse,
  addCourseSuccess,
  addCourseRequest,
  addCourseFailure,
  setDetail,
  removeDetail,
  setMyCourse,
  setPopular,
  setFree,
  setPageCourse,
  fetchCourseStart,
  fetchCourseSuccess,
  fetchCourseFailure,
  deleteCourseRequest, // Ekspor aksi delete course
  deleteCourseSuccess,
  deleteCourseFailure,
} = coursesSlice.actions;

export default coursesSlice.reducer;
