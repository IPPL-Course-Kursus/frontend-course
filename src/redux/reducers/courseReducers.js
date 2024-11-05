import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  courses: [],
  mycourse: [],
  loading: false,
  detail: {},
  error: null,
  free: [],
  pageCourse: [],
  popular: [],
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
    updateCourseRequest(state) {
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
    setMyCourse: (state, action) => {
      state.mycourse = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = {
        ...action.payload,
        recommendedCourses: action.payload.recommendedCourses || [],
      };
    },
    removeDetail: (state) => {
      state.detail = {};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFree: (state, action) => {
      state.free = action.payload;
    },
    setPageCourse: (state, action) => {
      state.pageCourse = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
    },

    updateCourseSuccess(state, action) {
      const updatedCourse = action.payload;
      console.log("Updated Course:", updatedCourse); // Log untuk debug
      const index = state.courses.findIndex((course) => course.id === updatedCourse.id);
      if (index !== -1) {
        console.log("Updating course at index:", index); // Log untuk debug
        state.courses[index] = updatedCourse; // Ganti kursus yang diperbarui
      } else {
        console.warn("Course not found for update:", updatedCourse.id); // Log jika tidak ditemukan
      }
      state.loading = false;
      state.error = null;
    },

    updateCourseFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
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

    // Aksi baru untuk fetch user courses
    fetchUserCoursesStart: (state) => {
      state.loading = true; // Set loading to true when starting fetch
      state.error = null; // Clear previous errors
    },
    fetchUserCoursesSuccess: (state, action) => {
      state.mycourse = action.payload; // Save fetched courses to mycourse
      state.loading = false; // Set loading to false after fetching
    },
    fetchUserCoursesFailure: (state, action) => {
      state.error = action.payload; // Save error message
      state.loading = false; // Set loading to false
    },
  },
});

const selectCourses = (state) => state.course;

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
  clearError,
  setError,
  setLoading,
  fetchCourseStart,
  fetchCourseSuccess,
  fetchCourseFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFailure,
  fetchUserCoursesStart,
  fetchUserCoursesSuccess,
  fetchUserCoursesFailure,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFailure,
} = coursesSlice.actions;

export const selectMyCourse = createSelector(
  [selectCourses],
  (coursesState) => coursesState.mycourse
);

export default coursesSlice.reducer;
