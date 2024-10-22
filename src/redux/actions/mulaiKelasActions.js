import axios from 'axios';
import { getCookie } from 'cookies-next';
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

const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

// Fetch all types
export const fetchAllTypes = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log("Fetching all types...");
    const response = await axios.get(`${apiUrl}/type-course`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched types:", response.data);
    dispatch(setTypes(response.data));
  } catch (error) {
    console.error('Error fetching all types:', error.response ? error.response.data : error.message);
  }
};

// Fetch all course levels
export const fetchAllCourseLevels = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log("Fetching all course levels...");
    const response = await axios.get(`${apiUrl}/course-level`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched course levels:", response.data);
    dispatch(setLevels(response.data));
  } catch (error) {
    console.error('Error fetching course levels:', error.response ? error.response.data : error.message);
  }
};

// Fetch all course levels by ID
export const fetchAllCourseLevelsById = (id) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching course levels for ID: ${id}`);
    const response = await axios.get(`${apiUrl}/course-level/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched course levels for ID ${id}:`, response.data);
    dispatch(setLevels(response.data));
  } catch (error) {
    console.error('Error fetching course levels by ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch all courses
export const fetchAllCourses = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log("Fetching all courses...");
    const response = await axios.get(`${apiUrl}course/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched courses:", response.data);
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error('Error fetching all courses:', error.response ? error.response.data : error.message);
  }
};

// Fetch all courses by user ID
export const fetchAllCoursesByUserId = (userId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching courses for user ID: ${userId}`);
    const response = await axios.get(`${apiUrl}course/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched courses for user ID ${userId}:`, response.data);
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error('Error fetching courses by user ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch all types by course level
export const fetchAllTypesByLevel = (levelId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching types for level ID: ${levelId}`);
    const response = await axios.get(`${apiUrl}type-course/level/${levelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched types for level ID ${levelId}:`, response.data);
    dispatch(setTypes(response.data));
  } catch (error) {
    console.error('Error fetching types by course level:', error.response ? error.response.data : error.message);
  }
};

// Fetch course by ID
export const fetchCourseById = (id) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching course with ID: ${id}`);
    const response = await axios.get(`${apiUrl}course/detail-course/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched course with ID ${id}:`, response.data);
    dispatch(setCourseDetail(response.data));
  } catch (error) {
    console.error('Error fetching course by ID:', error.response ? error.response.data : error.message);
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
    const response = await axios.get(`${apiUrl}chapter/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched chapters for course ID ${courseId}:`, response.data);
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error('Error fetching chapters by course ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch chapter by ID
export const fetchChapterById = (chapterId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching chapter with ID: ${chapterId}`);
    const response = await axios.get(`${apiUrl}chapter/${chapterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched chapter with ID ${chapterId}:`, response.data);
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error('Error fetching chapter by ID:', error.response ? error.response.data : error.message);
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
    const response = await axios.get(`${apiUrl}content/chapter/${chapterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched content for chapter ID ${chapterId}:`, response.data);
    dispatch(setContent(response.data));
  } catch (error) {
    console.error('Error fetching content by chapter ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch content by ID
export const fetchContentById = (contentId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching content with ID: ${contentId}`);
    const response = await axios.get(`${apiUrl}content/${contentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched content with ID ${contentId}:`, response.data);
    dispatch(setContent(response.data));
  } catch (error) {
    console.error('Error fetching content by ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch courses by category
export const fetchCourseByCategory = (categoryId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching courses by category ID: ${categoryId}`);
    const response = await axios.get(`${apiUrl}course/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched courses by category ID ${categoryId}:`, response.data);
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error('Error fetching courses by category:', error.response ? error.response.data : error.message);
  }
};

// Fetch courses by filter (search criteria)
export const fetchCourseByFilter = (filterParams) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log("Fetching courses by filter:", filterParams);
    const response = await axios.post(`${apiUrl}course/filter`, filterParams, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched courses by filter:", response.data);
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error('Error fetching courses by filter:', error.response ? error.response.data : error.message);
  }
};

// Fetch courses by search
export const fetchCourseBySearch = (searchTerm) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Searching courses with term: ${searchTerm}`);
    const response = await axios.get(`${apiUrl}course/search/${searchTerm}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched courses for search term ${searchTerm}:`, response.data);
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error('Error searching courses:', error.response ? error.response.data : error.message);
  }
};

// Fetch courses by type
export const fetchCourseByType = (typeId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching courses by type ID: ${typeId}`);
    const response = await axios.get(`${apiUrl}course/type/${typeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched courses by type ID ${typeId}:`, response.data);
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error('Error fetching courses by type:', error.response ? error.response.data : error.message);
  }
};

// Fetch courses by user ID
export const fetchCourseByUserId = (userId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching courses for user ID: ${userId}`);
    const response = await axios.get(`${apiUrl}course/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched courses for user ID ${userId}:`, response.data);
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error('Error fetching courses by user ID:', error.response ? error.response.data : error.message);
  }
};

// Fetch course user by ID
export const fetchCourseUser = (userId) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Fetching course user with ID: ${userId}`);
    const response = await axios.get(`${apiUrl}courseUser/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched course user with ID ${userId}:`, response.data);
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
    console.log(`Fetching detailed course user with ID: ${userId}`);
    const response = await axios.get(`${apiUrl}courseUser/detail/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Fetched detailed course user with ID ${userId}:`, response.data);
    dispatch(setDetailCourseUser(response.data));
  } catch (error) {
    console.error('Error fetching detailed course user:', error.response ? error.response.data : error.message);
  }
};

// Fetch new requests
export const fetchNewRequests = () => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log("Fetching new requests...");
    const response = await axios.get(`${apiUrl}requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched new requests:", response.data);
    dispatch(setRequests(response.data));
  } catch (error) {
    console.error('Error fetching new requests:', error.response ? error.response.data : error.message);
  }
};

// Create new request
export const createNewRequest = (requestData) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log("Creating new request...", requestData);
    const response = await axios.post(`${apiUrl}requests`, requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Created new request:", response.data);
    dispatch(setNewRequest(response.data));
  } catch (error) {
    console.error('Error creating new request:', error.response ? error.response.data : error.message);
  }
};

// Delete request by ID
export const deleteNewRequest = (id) => async (dispatch) => {
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    console.log(`Deleting request with ID: ${id}`);
    await axios.delete(`${apiUrl}requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Deleted request with ID ${id}`);
    dispatch(deleteRequest(id));
  } catch (error) {
    console.error('Error deleting request:', error.response ? error.response.data : error.message);
  }
};
