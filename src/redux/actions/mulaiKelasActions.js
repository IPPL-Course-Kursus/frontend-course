import axios from 'axios';
import { getCookie } from 'cookies-next';
import {
  setDetailCourseUser,
  setChapters,
  setContent,
  setCourseUser
} from '../reducers/mulaiKelasReducers';

const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch detailed course user by course user ID
export const fetchDetailCourseUser = (courseUserId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching detailed course user with ID: ${courseUserId}`);
    const response = await axios.get(`${apiUrl}/courseUser/detail/${courseUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched detailed course user with ID ${courseUserId}:`, response.data);
    dispatch(setDetailCourseUser(response.data));
  } catch (error) {
    console.error('Error fetching detailed course user:', error.response ? error.response.data : error.message);
  }
};

// Fetch chapters by course ID
export const fetchChapterByCourseId = (courseId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching chapters for course ID: ${courseId}`);
    const response = await axios.get(`${apiUrl}/chapter/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched chapters for course ID ${courseId}:`, response.data);
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error('Error fetching chapters:', error.response ? error.response.data : error.message);
  }
};

// Fetch content by chapter ID
export const fetchContentByChapterId = (chapterId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching content for chapter ID: ${chapterId}`);
    const response = await axios.get(`${apiUrl}/content/chapter/${chapterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched content for chapter ID ${chapterId}:`, response.data);
    dispatch(setContent(response.data));
  } catch (error) {
    console.error('Error fetching content by chapter ID:', error.response ? error.response.data : error.message);
  }
};

// Start course by course user ID
export const startCourse = (courseUserId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Starting course with course user ID: ${courseUserId}`);
    const response = await axios.post(`${apiUrl}/courseUser/start-course/${courseUserId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Started course with course user ID ${courseUserId}:`, response.data);
    dispatch(setCourseUser(response.data));
  } catch (error) {
    console.error('Error starting course:', error.response ? error.response.data : error.message);
  }
};

// Update progress for content by content ID
export const updateProgressContent = (contentId, progressData) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Updating progress for content ID: ${contentId}`);
    const response = await axios.put(`${apiUrl}/content/progress/${contentId}`, progressData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Updated progress for content ID ${contentId}:`, response.data);
    // Dispatch an action here if you want to update the Redux state with the new progress.
  } catch (error) {
    console.error('Error updating progress content:', error.response ? error.response.data : error.message);
  }
};
