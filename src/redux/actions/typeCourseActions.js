import axios from "axios";
import {
  setTypeCourses,
  setTypeCourseDetail,
  addTypeCourse,
  updateTypeCourseInState,
  removeTypeCourse,
  setLoading,
  setError,
  setSuccessMessage,
} from "../reducers/typeCourseReducers";

// Import getCookie from cookies-next
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getAllTypeCourses = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${api_url}type-course/`);
    const data = response.data;
    if (data.success) {
      dispatch(setTypeCourses(data.data));
    } else {
      dispatch(setError("Failed to fetch type courses"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const getTypeCourseById = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${api_url}type-course/${id}`);
    const data = response.data;
    if (data.success) {
      dispatch(setTypeCourseDetail(data.data));
    } else {
      dispatch(setError("Failed to fetch type course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const createTypeCourse = (typeName) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Get the token from cookies
    const token = getCookie("token"); // Make sure you have a getCookie function defined

    // Set up the config with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${api_url}type-course/create-type-course`,
      { typeName },
      config
    );
    const data = response.data;
    if (data.success) {
      dispatch(setSuccessMessage(data.message));
      // Optionally, fetch the updated list
      dispatch(getAllTypeCourses());
    } else {
      dispatch(setError("Failed to create type course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const updateTypeCourseById = (id, typeName) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Get the token from cookies
    const token = getCookie("token");

    // Set up the config with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(`${api_url}type-course/update/${id}`, { typeName }, config);
    const data = response.data;
    if (data.success) {
      dispatch(setSuccessMessage(data.message));
      // Optionally, fetch the updated list
      dispatch(getAllTypeCourses());
    } else {
      dispatch(setError("Failed to update type course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const deleteTypeCourseById = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Get the token from cookies
    const token = getCookie("token");

    // Set up the config with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(`${api_url}type-course/delete/${id}`, config);
    const data = response.data;
    if (data.success) {
      dispatch(setSuccessMessage(data.message));
      dispatch(removeTypeCourse(id));
    } else {
      dispatch(setError("Failed to delete type course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};
