import axios from 'axios';
import { getCookie } from 'cookies-next';
import {
  setDetailCourseUser,
  setChapters,
  setContent,
  setCourseUser
} from '../reducers/mulaiKelasReducers';

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Export semua fungsi yang diperlukan
export const fetchDetailCourseUser = (userId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    const response = await axios.get(`${api_url}course-user/detail/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
  });
    dispatch(setDetailCourseUser(response.data));
  } catch (error) {
    console.error("Failed to fetch detail course user:", error);
  }
};

export const fetchChapterByCourseId = (courseId) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}chapters/${courseId}`); // Ganti dengan endpoint yang benar
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error("Failed to fetch chapters:", error);
  }
};

export const fetchContentByChapterId = (chapterId) => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}content/${chapterId}`); // Ganti dengan endpoint yang benar
    dispatch(setContent(response.data));
  } catch (error) {
    console.error("Failed to fetch content:", error);
  }
};

// Update progress for content by courseId and contentId
export const updateProgressContent = (courseId, contentId, progressData) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Updating progress for course ID: ${courseId} and content ID: ${contentId}`);
    const response = await axios.put(`${api_url}course-user/course/${courseId}/progress/content/${contentId}`, progressData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Updated progress for course ID: ${courseId} and content ID: ${contentId}:`, response.data);
    dispatch(fetchDetailCourseUser(1));
    // Dispatch an action here if you want to update the Redux state with the new progress.
  } catch (error) {
    console.error("Error updating progress content:", error.response ? error.response.data : error.message);
  }
};

// Start course by course user ID, chapterSort, and contentSort
export const startCourse = (courseUserId, chapterSort, contentSort) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Starting course for courseUserId: ${courseUserId}, chapterSort: ${chapterSort}, contentSort: ${contentSort}`);
    const response = await axios.get(`${api_url}course-user/StartCourse/Course/${courseUserId}/${chapterSort}/${contentSort}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Started course for courseUserId: ${courseUserId}:`, response.data);
    dispatch(setCourseUser(response.data));
  } catch (error) {
    console.error('Error starting course:', error.response ? error.response.data : error.message);
  }
};

// Manage interpreters with CRUD operations
export const fetchInterpreters = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}api/interpreters`);
    console.log('Fetched interpreters:', response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error fetching interpreters:', error.response ? error.response.data : error.message);
  }
};

export const addInterpreter = (interpreterData) => async (dispatch) => {
  try {
    const response = await axios.post(`${api_url}api/interpreters`, interpreterData);
    console.log('Added interpreter:', response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error adding interpreter:', error.response ? error.response.data : error.message);
  }
};

export const updateInterpreter = (interpreterId, interpreterData) => async (dispatch) => {
  try {
    const response = await axios.put(`${api_url}api/interpreters/${interpreterId}`, interpreterData);
    console.log(`Updated interpreter with ID ${interpreterId}:`, response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error updating interpreter:', error.response ? error.response.data : error.message);
  }
};

export const deleteInterpreter = (interpreterId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${api_url}api/interpreters/${interpreterId}`);
    console.log(`Deleted interpreter with ID ${interpreterId}:`, response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error deleting interpreter:', error.response ? error.response.data : error.message);
  }
};

