import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levelCourses: [],
  levelCourseDetail: {},
  loading: false,
  error: null,
  token: null, // Menyimpan token
  successMessage: "",
};

const levelCourseSlice = createSlice({
  name: "levelCourses",
  initialState,
  reducers: {
    setLevelCourses: (state, action) => {
      state.levelCourses = action.payload;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    setLevelCourseDetail: (state, action) => {
      state.levelCourseDetail = action.payload;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    addLevelCourse: (state, action) => {
      state.levelCourses.push(action.payload);
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    updateLevelCourseInState: (state, action) => {
      const index = state.levelCourses.findIndex(
        (lc) => lc.id === action.payload.id
      );
      if (index !== -1) {
        state.levelCourses[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    removeLevelCourse: (state, action) => {
      state.levelCourses = state.levelCourses.filter(
        (lc) => lc.id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.successMessage = "";
    },
    setError: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
      state.successMessage = "";
    },
    setSuccessMessage: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = null;
      state.successMessage = action.payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.token = null;
      state.successMessage = "";
    },
  },
});

export const {
  setLevelCourses,
  setLevelCourseDetail,
  addLevelCourse,
  updateLevelCourseInState,
  removeLevelCourse,
  setLoading,
  setError,
  setSuccessMessage,
  clearMessages,
} = levelCourseSlice.actions;

export default levelCourseSlice.reducer;
