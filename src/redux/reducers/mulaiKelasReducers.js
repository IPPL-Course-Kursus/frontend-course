import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  types: [],
  levels: [],
  courses: [],
  filteredCourses: [],
  courseDetail: {},
  chapters: [],
  content: {},
  courseUser: {},
  detailCourseUser: {},
  requests: [],
  newRequest: null,
};

const mulaikelasSlice = createSlice({
  name: "mulaikelas",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setLevels: (state, action) => {
      state.levels = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setFilteredCourses: (state, action) => {
      state.filteredCourses = action.payload;
    },
    setCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
    },
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setCourseUser: (state, action) => {
      state.courseUser = action.payload;
    },
    setDetailCourseUser: (state, action) => {
      state.detailCourseUser = action.payload;
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setNewRequest: (state, action) => {
      state.newRequest = action.payload;
    },
    updateNewRequest: (state, action) => {
      const updatedRequest = action.payload;
      state.requests = state.requests.map(request => 
        request.id === updatedRequest.id ? updatedRequest : request
      );
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(request => request.id !== action.payload);
    },
    removeCourseDetail: (state) => {
      state.courseDetail = {};
    },
  },
});

export const {
  setTypes,
  setLevels,
  setCourses,
  setFilteredCourses,
  setCourseDetail,
  setChapters,
  setContent,
  setCourseUser,
  setDetailCourseUser,
  setRequests,
  setNewRequest,
  updateNewRequest,
  deleteRequest,
  removeCourseDetail,
} = mulaikelasSlice.actions;

export default mulaikelasSlice.reducer;