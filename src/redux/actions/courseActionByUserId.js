// src/redux/actions/courseActionByUserId.js
import axios from "axios";
import { setMyCourses, setLoading, setError, clearError } from "../reducers/coursesReducerByUserId";
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getUserCourses = () => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError()); // Bersihkan error sebelumnya jika ada

    const token = getCookie("token");
    if (!token) {
        dispatch(setError("User not authenticated"));
        return;
    }

    try {
        const response = await axios.get(`${api_url}/course-user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const courses = response.data.data; // Pastikan data diambil dengan benar
        dispatch(setMyCourses(courses));
    } catch (error) {
        dispatch(setError(error.message || "Error fetching user courses"));
    } finally {
        dispatch(setLoading(false));
    }
};
