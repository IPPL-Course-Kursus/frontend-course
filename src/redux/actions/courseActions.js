import axios from "axios";
import {
    setCourse,
    setFree,
    setPageCourse,
    setPopular,
    setMyCourse,
    setLoading,
    setError,
    clearError,
} from "../reducers/courseReducers";
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getAllCourse = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${api_url}course`);
        dispatch(setCourse(response.data));
    } catch (error) {
        console.error("Error fetching all courses:", error.message);
    } finally {
        dispatch(setLoading(false));
    }
};

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
        dispatch(setMyCourse(courses));
    } catch (error) {
        dispatch(setError(error.message || "Error fetching user courses"));
    } finally {
        dispatch(setLoading(false));
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
        dispatch(setCourse(response.data));
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
};

export const getPopularCourse = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${api_url}course/popular`);
        dispatch(setPopular(response.data));
    } catch (error) {
        console.error("Error fetching popular courses:", error.message);
    } finally {
        dispatch(setLoading(false));
    }
};

export const getFreeCourse = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`${api_url}course/type/1`); // Ganti dengan endpoint yang sesuai
        dispatch(setFree(response.data));
    } catch (error) {
        console.error("Error fetching free courses:", error.message);
    } finally {
        dispatch(setLoading(false));
    }
};
