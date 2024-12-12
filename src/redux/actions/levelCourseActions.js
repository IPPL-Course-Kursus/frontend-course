import axios from "axios";
import {
  setLevelCourses,
  setLevelCourseDetail,
  addLevelCourse,
  updateLevelCourseInState,
  removeLevelCourse,
  setLoading,
  setError,
  setSuccessMessage,
} from "../reducers/levelCourseReducers";

// Import getCookie from cookies-next
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS || "http://localhost:6969/";

export const getAllLevelCourses = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${api_url}course-level/`);
    const data = response.data;
    // The response is an array of level courses
    dispatch(setLevelCourses(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const getLevelCourseById = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${api_url}course-level/${id}`);
    const data = response.data;
    dispatch(setLevelCourseDetail(data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const createLevelCourse = (levelName) => async (dispatch) => {
  dispatch(setLoading());
  try {
    // Get the token from cookies
    const token = getCookie("token"); // Ensure you have a getCookie function defined

    // Set up the config with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${api_url}course-level/create-course-level`,
      { levelName },
      config
    );
    const data = response.data;

    if (data.message === "Course level created successfully") {
      dispatch(setSuccessMessage(data.message));
      // Optionally, fetch the updated list
      dispatch(getAllLevelCourses());
    } else {
      dispatch(setError("Failed to create level course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const updateLevelCourseById = (id, levelName) => async (dispatch) => {
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

    const response = await axios.put(
      `${api_url}course-level/update-course-level/${id}`,
      { levelName },
      config
    );
    const data = response.data;

    if (data.message === "Course level updated successfully") {
      dispatch(setSuccessMessage(data.message));
      // Optionally, fetch the updated list
      dispatch(getAllLevelCourses());
    } else {
      dispatch(setError("Failed to update level course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export const deleteLevelCourseById = (id) => async (dispatch) => {
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

    const response = await axios.delete(
      `${api_url}course-level/delete-course-level/${id}`,
      config
    );
    const data = response.data;

    if (data.message === "Course level deleted successfully") {
      dispatch(setSuccessMessage(data.message));
      dispatch(removeLevelCourse(id));
    } else {
      dispatch(setError("Failed to delete level course"));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};
