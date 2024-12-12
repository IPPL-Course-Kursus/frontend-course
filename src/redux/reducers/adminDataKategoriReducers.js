// adminDataKategoriReducers.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  categories: [],
  error: null,
  token: null, // Menyimpan token
};



const adminDataKategoriSlice = createSlice({
  name: "adminDataKategori",
  initialState,
  reducers: {
    // Existing reducers...
    fetchCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // New reducers for delete action
    deleteCategoryRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null; // Menyimpan token
    },
    // deleteCategorySuccess: (state, action) => {
    //   state.loading = false;
    //   state.categories = state.categories.filter(
    //     (category) => category.id !== action.payload
    //   );
    // },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },    
    deleteCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCategoryRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.token = null; // Menyimpan token
    },
    updateCategorySuccess: (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        state.categories = state.categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
        );
    },
    updateCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addCategoryRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.token = null; // Menyimpan token
    },
    addCategorySuccess: (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
    },
    addCategoryFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
  },
});

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFailure,
} = adminDataKategoriSlice.actions;

export default adminDataKategoriSlice.reducer;