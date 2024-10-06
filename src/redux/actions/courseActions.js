import axios from "axios";
import { setCourse } from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getAllCourse = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course`);

    const courses = response.data;
    console.log(response.data);

    dispatch(setCourse(courses));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
  }
};
