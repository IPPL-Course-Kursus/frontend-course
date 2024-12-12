// adminDataKategoriActions.js

import axios from "axios";
import {
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
} from "../reducers/adminDataKategoriReducers";
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Existing fetchAdminCategories action
export const fetchAdminCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await axios.get(`${api_url}category/`);
    dispatch(fetchCategoriesSuccess(response.data));


    console.log(response.data);
    
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

// WORK
// export const deleteCategory = (categoryId) => async (dispatch) => {
//   try {
//     dispatch(deleteCategoryRequest());

//     const token = getCookie("token"); // Ambil token dari cookie
//     const response = await axios.delete(`${api_url}category/delete-category/${categoryId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     dispatch(deleteCategorySuccess(response.data));
//     return response.data;
//   } catch (error) {
//     dispatch(deleteCategoryFailure(error.response?.data || "Delete failed"));
//     throw error;
//   }
// };

// MAYBE NOT WORK
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequest());

    const token = getCookie("token"); // Retrieve token from cookies
    await axios.delete(`${api_url}category/delete-category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Dispatch success action with categoryId as payload
    dispatch(deleteCategorySuccess(categoryId));
  } catch (error) {
    dispatch(deleteCategoryFailure(error.response?.data || "Delete failed"));
    throw error;
  }
};

// export const deleteCategory = (id) => async (dispatch, getState) => {
//     dispatch(deleteCategoryRequest());
//     try {
//       // Access the token
//       const {
//         auth: { token },
//       } = getState();

//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       // Set up headers
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       // Make the DELETE request
//       const response = await axios.delete(`${api_url}category/delete-category/${id}`, config);

//       if (response.status === 200) {
//         dispatch(deleteCategorySuccess(id));
//         // Optionally, refresh the category list
//         dispatch(fetchAdminCategories());
//       } else {
//         throw new Error(`Failed to delete category with status code: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Delete category error:", error);
//       dispatch(deleteCategoryFailure(error.message));
//     }
// };

// export const updateCategory = (id, updatedData) => async (dispatch) => {
//     dispatch(updateCategoryRequest());
//     try {
//       const response = await axios.put(`${api_url}category/update-category/${id}`, updatedData);
//       dispatch(updateCategorySuccess(response.data));
//       // Optionally refetch categories to update the list
//       dispatch(fetchAdminCategories());
//     } catch (error) {
//       dispatch(updateCategoryFailure(error.message));
//     }
// };

export const updateCategory = (id, updatedData) => async (dispatch) => {
  dispatch(updateCategoryRequest());
  try {
    // Get the token from cookies
    const token = getCookie("token"); // Ensure you have a getCookie function defined

    // Set up the config with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // Include 'Content-Type' if necessary
        "Content-Type": "multipart/form-data", // Use this if sending FormData with files
      },
    };

    const response = await axios.put(
      `${api_url}category/update-category/${id}`,
      updatedData,
      config
    );

    dispatch(updateCategorySuccess(response.data));
    // Optionally refetch categories to update the list
    dispatch(fetchAdminCategories());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(updateCategoryFailure(errorMessage));
  }
};

// export const addCategory = (newCategoryData) => async (dispatch) => {
//     dispatch(addCategoryRequest());
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           // Include Authorization header if needed
//         },
//       };
//       const response = await axios.post(`${api_url}category/create-category`, newCategoryData, config);
//       dispatch(addCategorySuccess(response.data));
//       dispatch(fetchAdminCategories());
//     } catch (error) {
//       dispatch(addCategoryFailure(error.message));
//     }
// };

// export const addCategory = (newCategoryData) => async (dispatch) => {
//     dispatch(addCategoryRequest());
//     try {
//       // Get the token from cookies
//       const token = getCookie("token"); // Ensure getCookie function is defined

//       // Set up the config with headers
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data", // Use this if sending FormData with files
//         },
//       };

//       const response = await axios.post(
//         `${api_url}category/create-category`,
//         newCategoryData,
//         config
//       );

//       dispatch(addCategorySuccess(response.data));
//       dispatch(fetchAdminCategories());
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       dispatch(addCategoryFailure(errorMessage));
//     }
//   };

// export const addCategory = (newCategoryData) => async (dispatch) => {
//     dispatch(addCategoryRequest());
//     try {
//       const token = getCookie("token"); // Ensure getCookie is defined

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // Let Axios set the Content-Type header when using FormData
//         },
//       };

//       const response = await axios.post(
//         `${api_url}category/create-category`,
//         newCategoryData,
//         config
//       );

//       dispatch(addCategorySuccess(response.data));
//       dispatch(fetchAdminCategories());
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Add category failed";
//       dispatch(addCategoryFailure(errorMessage));
//       throw error;
//     }
//   };

export const addCategory = (newCategoryData) => async (dispatch) => {
  dispatch(addCategoryRequest());
  try {
    // Get the token from cookies
    const token = getCookie("token");

    // Set up the config with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Set the Content-Type header
      },
    };

    // Make the POST request with the FormData
    const response = await axios.post(
      `${api_url}category/create-category`,
      newCategoryData,
      config
    );

    dispatch(addCategorySuccess(response.data));
    dispatch(fetchAdminCategories());
  } catch (error) {
    console.error("Add category error:", error.response || error);
    const errorMessage = error.response?.data?.message || error.message || "Add category failed";
    dispatch(addCategoryFailure(errorMessage));
    throw error;
  }
};
