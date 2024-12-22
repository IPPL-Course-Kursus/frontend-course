import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingFetch: false,   // Loading state for fetching categories
  loadingAdd: false,     // Loading state for adding a category
  loadingDelete: false,  // Loading state for deleting a category
  loadingUpdate: false,  // Loading state for updating a category
  categories: [],
  errorFetch: null,      // Error state for fetching categories
  errorAdd: null,        // Error state for adding a category
  errorDelete: null,     // Error state for deleting a category
  errorUpdate: null,     // Error state for updating a category
  token: null,           // Menyimpan token
};

const adminDataKategoriSlice = createSlice({
  name: "adminDataKategori",
  initialState,
  reducers: {
    // Fetch Categories
    fetchCategoriesRequest: (state) => {
      state.loadingFetch = true;
      state.errorFetch = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loadingFetch = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loadingFetch = false;
      state.errorFetch = action.payload;
    },

    // Delete Category
    deleteCategoryRequest: (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.loadingDelete = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    deleteCategoryFailure: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },

    // Update Category
    updateCategoryRequest: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = null;
    },
    updateCategorySuccess: (state, action) => {
      state.loadingUpdate = false;
      const updatedCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
    },
    updateCategoryFailure: (state, action) => {
      state.loadingUpdate = false;
      state.errorUpdate = action.payload;
    },

    // Add Category
    addCategoryRequest: (state) => {
      state.loadingAdd = true;
      state.errorAdd = null;
    },
    addCategorySuccess: (state, action) => {
      state.loadingAdd = false;
      state.categories.push(action.payload);
    },
    addCategoryFailure: (state, action) => {
      state.loadingAdd = false;
      state.errorAdd = action.payload;
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
