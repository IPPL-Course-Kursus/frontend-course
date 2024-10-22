import axios from 'axios';
import { getCookie } from 'cookies-next';
import {
  setStartCourse,
} from '../reducers/mulaiKelasReducers';

const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch start course details by courseUserId, chapterSort, and contentSort
export const fetchStartCourse = (courseUserId, chapterSort, contentSort) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching start course with User ID: ${courseUserId}, Chapter: ${chapterSort}, Content: ${contentSort}`);
    
    const response = await axios.get(`${apiUrl}/course-user/StartCourse/Course/${courseUserId}/${chapterSort}/${contentSort}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    console.log(`Fetched start course for User ID ${courseUserId}:`, response.data);
    dispatch(setStartCourse(response.data));  // Simpan data ke Redux state
  } catch (error) {
    console.error('Error fetching start course:', error.response ? error.response.data : error.message);
  }
};
