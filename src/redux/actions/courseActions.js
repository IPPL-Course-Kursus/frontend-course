import axios from "axios";
import {
  setCourse,
  //  setDetail,
  setPageCourse,
} from "../reducers/courseReducers";
// import { setCourse } from "../reducers/courseReducers";

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

export const getPagesCourse = (page) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}courses?page=${page}`);

    const { pagination } = response.data;

    dispatch(setPageCourse(pagination));
  } catch (error) {
    alert("error", "ERROR", error.message);
  }
};

// export const getDetaiId = (courseId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${api_url}course/detail-course/${courseId}`);
//     const detail = response.data;
//     console.log("ini detail", response.data);
//     dispatch(setDetail(detail));
//   } catch (error) {
//     swal("error", "ERROR", error.message);
//   }
// };
