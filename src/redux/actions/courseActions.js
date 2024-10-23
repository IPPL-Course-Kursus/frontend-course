import axios from "axios";
import {
  setCourses,
  setMyCourses,
  setLoading,
  setError,
  clearError,
} from "../reducers/courseReducers";
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;


export const getAllCourse = () => async (dispatch) => {
  dispatch(setLoading(true)); // Start loading
  try {
    const response = await axios.get(`${api_url}course`);
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
  } finally {
    dispatch(setLoading(false)); // End loading
  }
};

export const getPopularCourse = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course/popular`);
    const coursePopular = response.data;

    console.log("Data kursus populer:", coursePopular); // Debugging
    dispatch(setPopular(coursePopular));
  } catch (error) {
    console.error("Error fetching popular courses:", error.message
  
    );
  }
};
export const getFreeCourse = () => async (dispatch) => {
  try {
    // Mengambil semua kursus gratis
    const response = await axios.get(`${api_url}course/type/1`); // Endpoint yang sesuai
    const courseFree = response.data;

    console.log("Data kursus gratis:", courseFree); // Debugging
    dispatch(setFree(courseFree));
  } catch (error) {
    console.error("Error fetching free courses:", error.message);
  }
};









export const getUserCourses = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  const token = (getCookie("token"));
  if (!token) {
    dispatch(setError("User not authenticated"));
    dispatch(setLoading(false));
    return;
  }




  try {
    const response = await axios.get(`${api_url}course-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const courses = response.data.data;
    dispatch(setMyCourses(courses));
  } catch (error) {
    dispatch(setError(error.message || "Error fetching user courses"));
  } finally {
    dispatch(setLoading(false));
  }

  
  console.log("Token:", token); // Debugging
  console.log("Data kursus pengguna:", response.data); // Debugging
  // console.log("State mycourse:", mycourse); // Debugging
  // console.log("Filtered courses:", filteredCourses()); // Debugging



};
