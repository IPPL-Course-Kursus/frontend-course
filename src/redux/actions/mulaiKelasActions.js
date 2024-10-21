import axios from 'axios';
import {
  setTypes,
  setLevels,
  setCourses,
  setFilteredCourses,
  setCourseDetail,
  setChapters,
  setContent,
  setCourseUser,
  setDetailCourseUser,
  setRequests,
  setNewRequest,
  updateNewRequest as updateRequestAction,
  deleteRequest,
} from '../reducers/mulaiKelasReducers';
import { getCookie } from 'cookies-next';

const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch all types
export const fetchAllTypes = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}/type-course`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setTypes(response.data));
  } catch (error) {
    console.error('Error fetching all types:', error.response ? error.response.data : error.message);
  }
};

// Fetch course levels
export const fetchAllCourseLevels = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}/course-level`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setLevels(response.data));
  } catch (error) {
    console.error('Error fetching course levels:', error.response ? error.response.data : error.message);
  }
};

// Fetch all courses
export const fetchAllCourses = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}course/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error('Error fetching all courses:', error.response ? error.response.data : error.message);
  }
};

// Fetch course by ID
export const fetchCourseById = (id) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}course/detail-course/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setCourseDetail(response.data));
  } catch (error) {
    console.error('Error fetching course by ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch course by type
export const fetchCourseByType = (typeId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}course/type/${typeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error('Error fetching course by type:', error.response ? error.response.data : error.message);
  }
};

// Fetch course by category
export const fetchCourseByCategory = (categoryId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}course/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error('Error fetching course by category:', error.response ? error.response.data : error.message);
  }
};

// Fetch chapters by course ID
export const fetchChapterByCourseId = (courseId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}chapter/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error('Error fetching chapters by course ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch content by chapter ID
export const fetchContentByChapterId = (chapterId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}content/chapter/${chapterId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setContent(response.data));
  } catch (error) {
    console.error('Error fetching content by chapter ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch course user by ID
export const fetchCourseUser = (userId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}courseUser/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setCourseUser(response.data));
  } catch (error) {
    console.error('Error fetching course user:', error.response ? error.response.data : error.message);
  }
};

// Fetch detailed course user by ID
export const fetchDetailCourseUser = (userId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}courseUser/detail/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setDetailCourseUser(response.data));
  } catch (error) {
    console.error('Error fetching detailed course user:', error.response ? error.response.data : error.message);
  }
};

// Fetch all requests
export const fetchAllRequests = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${apiUrl}requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setRequests(response.data));
  } catch (error) {
    console.error('Error fetching all requests:', error.response ? error.response.data : error.message);
  }
};

// Create new request
export const createNewRequest = (requestData) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.post(`${apiUrl}requests`, requestData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setNewRequest(response.data));
  } catch (error) {
    console.error('Error posting new request:', error.response ? error.response.data : error.message);
  }
};

// Update request by ID
export const updateNewRequest = (id, requestData) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.put(`${apiUrl}requests/${id}`, requestData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(updateRequestAction(response.data));
  } catch (error) {
    console.error('Error updating request:', error.response ? error.response.data : error.message);
  }
};

// Delete request by ID
export const deleteRequestById = (id) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    await axios.delete(`${apiUrl}/requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(deleteRequest(id));
  } catch (error) {
    console.error('Error deleting request:', error.response ? error.response.data : error.message);
    
  }
};
