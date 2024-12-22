// // adminDataKategoriReducers.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   categories: [],
//   error: null,
//   token: null, // Menyimpan token
// };



// const adminDataKategoriSlice = createSlice({
//   name: "adminDataKategori",
//   initialState,
//   reducers: {
//     // Existing reducers...
//     fetchCategoriesRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchCategoriesSuccess: (state, action) => {
//       state.loading = false;
//       state.categories = action.payload;
//     },
//     fetchCategoriesFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // New reducers for delete action
//     deleteCategoryRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.token = null; // Menyimpan token
//     },
//     // deleteCategorySuccess: (state, action) => {
//     //   state.loading = false;
//     //   state.categories = state.categories.filter(
//     //     (category) => category.id !== action.payload
//     //   );
//     // },
//     deleteCategorySuccess: (state, action) => {
//       state.loading = false;
//       state.categories = state.categories.filter(
//         (category) => category.id !== action.payload
//       );
//     },    
//     deleteCategoryFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateCategoryRequest: (state) => {
//         state.loading = true;
//         state.error = null;
//         state.token = null; // Menyimpan token
//     },
//     updateCategorySuccess: (state, action) => {
//         state.loading = false;
//         const updatedCategory = action.payload;
//         state.categories = state.categories.map((category) =>
//             category.id === updatedCategory.id ? updatedCategory : category
//         );
//     },
//     updateCategoryFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
//     addCategoryRequest: (state) => {
//         state.loading = true;
//         state.error = null;
//         state.token = null; // Menyimpan token
//     },
//     addCategorySuccess: (state, action) => {
//         state.loading = false;
//         state.categories.push(action.payload);
//     },
//     addCategoryFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     },
    
//   },
// });

// export const {
//   fetchCategoriesRequest,
//   fetchCategoriesSuccess,
//   fetchCategoriesFailure,
//   deleteCategoryRequest,
//   deleteCategorySuccess,
//   deleteCategoryFailure,
//   updateCategoryRequest,
//   updateCategorySuccess,
//   updateCategoryFailure,
//   addCategoryRequest,
//   addCategorySuccess,
//   addCategoryFailure,
// } = adminDataKategoriSlice.actions;

// export default adminDataKategoriSlice.reducer;
// adminDataKategoriReducers.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingFetch: false,   // Loading state for fetching categories
  loadingAdd: false,     // Loading state for adding a category
  loadingDelete: false,  // Loading state for deleting a category
  loadingUpdate: false,  // Loading state for updating a category
  categories: [],
  error: null,
  token: null, // Menyimpan token
};

const adminDataKategoriSlice = createSlice({
  name: "adminDataKategori",
  initialState,
  reducers: {
    // Fetch Categories
    fetchCategoriesRequest: (state) => {
      state.loadingFetch = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loadingFetch = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loadingFetch = false;
      state.error = action.payload;
    },

    // Delete Category
    deleteCategoryRequest: (state) => {
      state.loadingDelete = true;
      state.error = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.loadingDelete = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    deleteCategoryFailure: (state, action) => {
      state.loadingDelete = false;
      state.error = action.payload;
    },

    // Update Category
    updateCategoryRequest: (state) => {
      state.loadingUpdate = true;
      state.error = null;
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
      state.error = action.payload;
    },

    // Add Category
    addCategoryRequest: (state) => {
      state.loadingAdd = true;
      state.error = null;
    },
    addCategorySuccess: (state, action) => {
      state.loadingAdd = false;
      state.categories.push(action.payload);
    },
    addCategoryFailure: (state, action) => {
      state.loadingAdd = false;
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
