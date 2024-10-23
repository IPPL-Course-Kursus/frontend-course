import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    mycourse: [],
    popular: [],  // Tambahkan state untuk menyimpan kursus populer
    free: [],     // Tambahkan state untuk menyimpan kursus gratis
    loading: false,
    detail: {},
    error: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setMyCourses: (state, action) => {
      state.mycourse = action.payload;
    },
    setPopular: (state, action) => {  // Tambahkan reducer untuk setPopular
      state.popular = action.payload;
    },
    setFree: (state, action) => {     // Tambahkan reducer untuk setFree
      state.free = action.payload;
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


const selectCourses = (state) => state.courses || { mycourse: [] };

// Memoized selector untuk myCourses
export const selectMyCourses = createSelector(
  [selectCourses],
  (coursesState) => {
    // Mengembalikan mycourse dengan referensi tetap
    return coursesState.mycourse;
  }
);


// Ekspor semua aksi yang diperlukan
export const { 
  setCourses, 
  setMyCourses, 
  setDetail, 
  setLoading, 
  setError, 
  clearError, 
  setPopular,  // Pastikan untuk mengekspor setPopular
  setFree,     // Pastikan untuk mengekspor setFree
} = courseSlice.actions;



// Ekspor reducer utama
export default courseSlice.reducer;
