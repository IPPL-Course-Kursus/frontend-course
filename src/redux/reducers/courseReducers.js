// import { createSlice } from "@reduxjs/toolkit";

// const intialCourseState = {
//   course: [],
//   detail: {},
//   myCourse: [],
//   filteredCourse: [],
//   loading: false,
//   error: null,
// };

// const courseSlice = createSlice({
//   name: "course",
//   intialCourseState,
//   reducers: {
//     setCourse: (state, action) => {
//       state.courses = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     // Set detail course setelah mengambil detail
//     setDetail: (state, action) => {
//       state.detail = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     // Set courses milik instruktur/user
//     setMyCourse: (state, action) => {
//       state.myCourses = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     // Set filtered courses berdasarkan filter parameter
//     setFilteredCourses: (state, action) => {
//       state.filteredCourses = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     // Mulai loading ketika fetch data
//     setLoading: (state) => {
//       state.loading = true;
//     },
//     // Set error jika ada masalah
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     // Menghapus detail ketika tidak diperlukan lagi
//     removeDetail: (state) => {
//       state.detail = {};
//     },
//   },
// });

// export const {
//   setCourse,
//   setDetail,
//   setMyCourse,
//   setFilteredCourses,
//   setLoading,
//   setError,
//   removeDetail,
// } = courseSlice.actions;

// export default courseSlice.reducer;

// coursesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
