import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  detail: {}, // Ubah menjadi objek
  mycourse: [],
  // rating: [],
  pageCourse: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload; // Ini sudah benar
    },
    setMyCourse: (state, action) => {
      state.mycourse = action.payload;
    },
    // setRating: (state, action) => {
    //   state.rating = action.payload;
    // },
    setPageCourse: (state, action) => {
      state.pageCourse = action.payload;
    },
    removeDetail: (state) => {
      state.detail = {}; // Mengosongkan detail dengan objek kosong
    },
  },
});

export const {
  setCourse,
  setDetail,
  removeDetail,
  setMyCourse,
  // setRating,
  setPageCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
