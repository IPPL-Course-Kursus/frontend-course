import axios from "axios";
import { setDetail } from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getDetailCourse = (courseId, setErrors, errors) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course/detail-course/${courseId}`);

    const data = response.data.course; // Ambil data course
    const recommendedCourses = response.data.recommendedCourses || []; // Ambil recommendedCourses jika ada

    const courseWithRecommendations = {
      ...data,
      recommendedCourses, // Tambahkan recommendedCourses ke course detail
    };

    console.log("ini detail : ", courseWithRecommendations);

    dispatch(setDetail(courseWithRecommendations)); // Dispatch detail termasuk recommendedCourses
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErrors({
        ...errors,
        isError: true,
        message: error?.response?.data?.message || error?.message,
      });
      return;
    }

    alert(error?.message);
    setErrors({
      ...errors,
      isError: true,
      message: error?.error,
    });
  }
};
