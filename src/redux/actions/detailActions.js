import axios from "axios";
import { setDetail } from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getDetailCourse = (courseId, setErrors, errors) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course/detail-course/${courseId}`);

    const data = response.data.course; // Hanya ambil objek course
    console.log("ini detail : ", data);

    dispatch(setDetail(data)); // Dispatch data course
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
