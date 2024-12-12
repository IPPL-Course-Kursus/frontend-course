import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeCourses: [],
  typeCourseDetail: {},
  loading: false,
  error: null,
  token: null, // Menyimpan token
  successMessage: "",
};

const typeCourseSlice = createSlice({
  name: "typeCourses",
  initialState,
  reducers: {
    setTypeCourses: (state, action) => {
      state.typeCourses = action.payload;
      state.loading = false;
      state.error = null;
      state.token = null; // Menyimpan token
    },
    setTypeCourseDetail: (state, action) => {
      state.typeCourseDetail = action.payload;
      state.loading = false;
      state.error = null;
      state.token = null; // Menyimpan token
    },
    addTypeCourse: (state, action) => {
      state.typeCourses.push(action.payload);
      state.loading = false;
      state.error = null;
      state.token = null; // Menyimpan token
    },
    updateTypeCourseInState: (state, action) => {
      const index = state.typeCourses.findIndex(
        (tc) => tc.id === action.payload.id
      );
      if (index !== -1) {
        state.typeCourses[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
      state.token = null; // Menyimpan token
    },
    removeTypeCourse: (state, action) => {
      state.typeCourses = state.typeCourses.filter(
        (tc) => tc.id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.token = null; // Menyimpan token
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null; // Menyimpan token
      state.successMessage = "";
    },
    setError: (state, action) => {
      state.loading = false;
      state.token = null; // Menyimpan token
      state.error = action.payload;
      state.successMessage = "";
    },
    setSuccessMessage: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = null; // Menyimpan token
      state.successMessage = action.payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.token = null; // Menyimpan token
      state.successMessage = "";
    },
  },
});

export const {
  setTypeCourses,
  setTypeCourseDetail,
  addTypeCourse,
  updateTypeCourseInState,
  removeTypeCourse,
  setLoading,
  setError,
  setSuccessMessage,
  clearMessages,
} = typeCourseSlice.actions;

export default typeCourseSlice.reducer;
