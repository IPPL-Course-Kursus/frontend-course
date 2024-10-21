import axios from "axios";
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
} from "../reducers/mulaiKelasReducer";

const api_url = "https://backend-course-production-9a7a.up.railway.app/";

// Fetch all types
export const fetchAllTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/type-course/);
    dispatch(setTypes(response.data));
  } catch (error) {
    console.error("Error fetching all types:", error.message);
  }
};


// Di dalam mulaikelasAction.js
export const createNewRequest = (requestData) => async (dispatch) => {
  try {
    const response = await axios.post(${api_url}/requests, requestData); // Perbaiki backtick dan tanda kutip
    dispatch(setNewRequest(response.data));
  } catch (error) {
    console.error("Error posting new request:", error.message);
  }
};

// Di dalam mulaikelasAction.js
export const deleteNewRequest = (id) => async (dispatch) => {
  try {
    await axios.delete(${api_url}/requests/${id}); // Tambahkan backtick untuk template literal
    dispatch(deleteRequest(id)); // Pastikan ini merujuk pada action creator yang sesuai
  } catch (error) {
    console.error("Error deleting request:", error.message);
  }
};


// Di dalam mulaikelasAction.js
export const fetchAll = () => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/all-endpoint); // Perbaiki backtick untuk template literal
    dispatch(setCourses(response.data)); // Misalnya, jika data ini terkait dengan kursus
  } catch (error) {
    console.error("Error fetching all data:", error.message);
  }
};

// mulaikelasAction.js
export const updateNewRequest = (id, requestData) => async (dispatch) => {
  try {
    const response = await axios.put(${api_url}/requests/${id}, requestData); // Perbaiki template literal dan kurung tutup
    dispatch(updateRequestAction(response.data)); // Gunakan nama baru di sini
  } catch (error) {
    console.error("Error updating request:", error.message);
  }
};

// Di dalam mulaikelasAction.js
export const fetchById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/some-endpoint/${id}); // Gunakan backtick dan template literal
    // Misalnya, kamu ingin menyimpan data ini di reducer tertentu
    dispatch(setCourseDetail(response.data)); // Sesuaikan dengan action yang tepat
  } catch (error) {
    console.error("Error fetching by ID:", error.message);
  }
};



// Fetch type by ID
export const fetchTypeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/types/${id});
    dispatch(setTypes(response.data));
  } catch (error) {
    console.error("Error fetching type by ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch all courses
export const fetchAllCourses = () => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses);
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course by type
export const fetchCourseByType = (typeId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/type/${typeId});
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error("Error fetching course by type:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course by search
export const fetchCourseBySearch = (query) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/search?query=${query});
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error("Error fetching course by search:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};


// Fetch course by ID
export const fetchCourseById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/${id});
    dispatch(setCourseDetail(response.data));
  } catch (error) {
    console.error("Error fetching course by ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch all types by level
export const fetchAllTypesByLevel = (levelId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/types/level/${levelId});
    dispatch(setTypes(response.data));
  } catch (error) {
    console.error("Error fetching all types by level:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course by category
export const fetchCourseByCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/category/${categoryId});
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error("Error fetching course by category:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course by user ID
export const fetchCourseByUserId = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/user/${userId});
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error("Error fetching course by user ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course by filter
export const fetchCourseByFilter = (filter) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/filter, { params: filter });
    dispatch(setFilteredCourses(response.data));
  } catch (error) {
    console.error("Error fetching course by filter:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};


// Fetch all courses by user ID
export const fetchAllCoursesByUserId = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courses/all/user/${userId});
    dispatch(setCourses(response.data));
  } catch (error) {
    console.error("Error fetching all courses by user ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch all course levels
export const fetchAllCourseLevels = () => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courseLevels);
    dispatch(setLevels(response.data));
  } catch (error) {
    console.error("Error fetching all course levels:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course levels by ID
export const fetchAllCourseLevelsById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courseLevels/${id});
    dispatch(setLevels(response.data));
  } catch (error) {
    console.error("Error fetching course levels by ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch chapters by course ID
export const fetchChapterByCourseId = (courseId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/chapters/course/${courseId});
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error("Error fetching chapters by course ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch chapter by ID
export const fetchChapterById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/chapters/${id});
    dispatch(setChapters(response.data));
  } catch (error) {
    console.error("Error fetching chapter by ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch content by chapter ID
export const fetchContentByChapterId = (chapterId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/contents/chapter/${chapterId});
    dispatch(setContent(response.data));
  } catch (error) {
    console.error("Error fetching content by chapter ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};


// Fetch content by ID
export const fetchContentById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/contents/${id});
    dispatch(setContent(response.data));
  } catch (error) {
    console.error("Error fetching content by ID:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch course user
export const fetchCourseUser = () => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courseUser);
    dispatch(setCourseUser(response.data));
  } catch (error) {
    console.error("Error fetching course user:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch detailed course user
export const fetchDetailCourseUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/courseUser/detail/${userId});
    dispatch(setDetailCourseUser(response.data));
  } catch (error) {
    console.error("Error fetching detailed course user:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Fetch new requests
export const fetchNewRequests = () => async (dispatch) => {
  try {
    const response = await axios.get(${api_url}/requests/new);
    dispatch(setRequests(response.data));
  } catch (error) {
    console.error("Error fetching new requests:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Post new request
export const postNewRequest = (requestData) => async (dispatch) => {
  try {
    const response = await axios.post(${api_url}/requests, requestData);
    dispatch(setNewRequest(response.data));
  } catch (error) {
    console.error("Error posting new request:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Update request by ID
export const updateRequestById = (id, requestData) => async (dispatch) => {
  try {
    const response = await axios.put(${api_url}/requests/${id}, requestData);
    dispatch(updateNewRequest(response.data));
  } catch (error) {
    console.error("Error updating request:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};

// Delete request by ID
export const deleteRequestById = (id) => async (dispatch) => {
  try {
    await axios.delete(${api_url}/requests/${id});
    dispatch(deleteRequest(id));
  } catch (error) {
    console.error("Error deleting request:", error.message);
    // Anda bisa menambahkan dispatch untuk menangani error jika diperlukan
  }
};