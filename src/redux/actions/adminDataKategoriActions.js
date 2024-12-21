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
    throw error;
  }
};

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