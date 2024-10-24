import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    mycourse: [],
    loading: false,
    detail: {},
    error: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
<<<<<<< HEAD
    setMyCourses: (state, action) => {
=======
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
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
      state.mycourse = action.payload;
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
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

<<<<<<< HEAD
export const { setCourses, setMyCourses, setDetail, setLoading, setError, clearError } = courseSlice.actions;

// Selector to get the courses state
const selectCourses = (state) => state.course || { mycourse: [] };

// Memoized selector for myCourses
export const selectMyCourses = createSelector(
  [selectCourses],
  (coursesState) => coursesState.mycourse
);

export default courseSlice.reducer;
=======
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
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
