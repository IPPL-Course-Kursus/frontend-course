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
    setCourses: (state, action) => {
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
  },
});

const selectCourses = (state) => state.course;


export const {
  setCourse,
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
} = coursesSlice.actions;

export const selectMyCourse = createSelector(
  [selectCourses],
  (coursesState) => coursesState.mycourse
);
export default coursesSlice.reducer;
