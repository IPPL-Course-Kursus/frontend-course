import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailCourseUser: {},
  courseUser: {},
  chapters: [], // Make sure this is included
  content: {}, // Initialize content state
  // other states...
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
    setContent: (state, action) => { // Add the setContent reducer
      state.content = action.payload;
    },
    // other reducers...
  },
});

// Export the actions including setContent
export const {
  setDetailCourseUser,
  setCourseUser,
  setChapters,
  setContent, // Ensure setContent is exported
} = mulaikelasSlice.actions;

export default mulaikelasSlice.reducer;
