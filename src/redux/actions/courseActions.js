import axios from "axios";
import {
<<<<<<< HEAD
  setCourses,
  setMyCourses,
  setLoading,
  setError,
  clearError,
} from "../reducers/courseReducers";
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getUserCourses = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  const token = getCookie("token");
  if (!token) {
    dispatch(setError("User not authenticated"));
    dispatch(setLoading(false));
    return;
  }

  try {
    const response = await axios.get(`${api_url}course-user/`, {
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
};

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
=======
    setCourse,
    setFree,
    setPageCourse,
    setPopular,
} from "../reducers/courseReducers";

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

export const getFilteredCourses = (filters) => async (dispatch) => {
    try {
        const { promoStatus, isNewest, isPopular } = filters;

        const response = await axios.get(`${api_url}course/filter`, {
            params: {
                promoStatus: promoStatus,
                isNewest: isNewest,
                isPopular: isPopular,
            },
        });

        const filteredCourses = response.data;
        console.log(filteredCourses);

        dispatch(setCourse(filteredCourses)); // Dispatch filtered courses
    } catch (error) {
        console.error("Error fetching filtered courses:", error.message);
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
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
};

export const getPopularCourse = () => async (dispatch) => {
  dispatch(setLoading(true)); // Start loading
  try {
    const response = await axios.get(`${api_url}course/popular`);
<<<<<<< HEAD
    dispatch(setPopular(response.data));
  } catch (error) {
    console.error("Error fetching popular courses:", error.message);
  } finally {
    dispatch(setLoading(false)); // End loading
  }
};

export const getFreeCourse = () => async (dispatch) => {
  dispatch(setLoading(true)); // Start loading
  try {
    const response = await axios.get(`${api_url}course/type/`);
    dispatch(setFree(response.data));
  } catch (error) {
    console.error("Error fetching free courses:", error.message);
  } finally {
    dispatch(setLoading(false)); // End loading
  }
};
=======
    const coursePopular = response.data;

    console.log("ada data popilar",response.data);

        console.log("Data kursus populer:", coursePopular); // Debugging
        dispatch(setPopular(coursePopular));
    } catch (error) {
        console.error("Error fetching popular courses:", error.message);
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

// export const getPopularCourse = () => async (dispatch) => {
//   try {
//     const response = await axios.get(`${api_url}course/popular`);

//     const coursePopular = response.data;
//     console.log(response.data);

//     dispatch(setPopular(coursePopular));
//   } catch (error) {
//     console.error("Error fetching all courses:", error.message);
//   }
// };

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
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
