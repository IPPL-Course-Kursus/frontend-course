import axios from "axios";
// import { fetchCourseFailure, fetchCourseStart, fetchCourseSuccess, setCourse } from "../reducers/courseReducers";
import {
  deleteChapter,
  deleteChapterFailure,
  fetchChapterRequest,
  fetchChaptersFailure,
  fetchChaptersStart,
  fetchChaptersSuccess,
  updateChapterFailure,
  updateChapterRequest,
  updateChapterSuccess,
} from "../reducers/chapterReducers";
import { getCookie } from "cookies-next";
import {
  deleteContent,
  deleteContentFailure,
  fetchContentesRequest,
  fetchContentFailure,
  fetchContentStart,
  fetchContentSuccess,
  updateContentFailure,
  updateContentRequest,
  updateContentSuccess,
} from "../reducers/contentReducers";
import {
  addCourseFailure,
  addCourseRequest,
  addCourseSuccess,
  deleteCourseFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  setCourse,
} from "../reducers/courseReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Data Kelas

export const getAllKelas = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course`);

    const courses = response.data;
    // console.log("ini kelas :", response.data);

    dispatch(setCourse(courses));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
  }
};

export const addDataKelas = (requestData) => async (dispatch) => {
  dispatch(addCourseRequest()); // Set loading state

  try {
    // Ambil token dari cookies
    const token = getCookie("token"); // Pastikan fungsi ini sudah didefinisikan
    // console.log(token);

    // Set up config untuk header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set Content-Type ke multipart
      },
    };

    // Lakukan POST request dengan FormData
    const response = await axios.post(`${api_url}course/createCourse`, requestData, config);

    dispatch(addCourseSuccess(response.data.message)); // Sesuaikan dengan response API Anda
    console.log(response.data.message);
    dispatch(getAllKelas());
  } catch (error) {
    console.error("Error adding data kelas:", error.response || error);
    const errorMessage = error.response?.data?.message || error.message || "Add data kelas failed";
    dispatch(addCourseFailure(errorMessage)); // Dispatch action failure
  }
};

export const deleteDataCourse = (courseId) => async (dispatch) => {
  dispatch(deleteCourseRequest()); // Memulai proses penghapusan
  try {
    const token = getCookie("token"); // Ambil token dari cookie
    const response = await axios.delete(`${api_url}course/delete-course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteCourseSuccess(courseId)); // Kirim ID kursus yang dihapus ke aksi sukses
    return response.data; // Kembalikan data dari respon
  } catch (error) {
    console.error("Delete error:", error.response ? error.response.data : error.message);
    dispatch(deleteCourseFailure(error.response?.data || "Delete failed")); // Tangani kesalahan
    throw error; // Lempar kesalahan jika perlu
  }
};

// Data Module/Chapter
export const getDataModule = (chapterId) => async (dispatch) => {
  try {
    dispatch(fetchChaptersStart());

    const token = getCookie("token");

    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${api_url}chapter/course/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("datamodule: ", response.data.data);

    if (response.data && response.data.data) {
      dispatch(fetchChaptersSuccess(response.data.data));
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } catch (error) {
    console.error("Fetch error:", error.response ? error.response.data : error.message);
    dispatch(fetchChaptersFailure(error.message));
  }
};

export const updateDataModule = (chapterId, updatedData) => async (dispatch) => {
  dispatch(updateChapterRequest());
  try {
    const token = getCookie("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Pastikan tetap application/json karena tidak ada file
      },
    };

    const response = await axios.put(`${api_url}chapter/update/${chapterId}`, updatedData, config);

    dispatch(updateChapterSuccess(response.data.message));
    dispatch(getDataModule()); // Optional: Untuk refresh data setelah update
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(updateChapterFailure(errorMessage));
    throw new Error(errorMessage); // Untuk ditangani di komponen
  }
};

export const addDataModule = (requestData, courseId) => async (dispatch) => {
  dispatch(fetchChaptersStart());

  try {
    if (!courseId) {
      const errorMessage = "Chapter ID is required";
      dispatch(fetchChaptersFailure(errorMessage));
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const token = getCookie("token");

    const response = await axios.post(`${api_url}chapter/create-chapter/${courseId}`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch(fetchChaptersSuccess(response.data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Add content failed";
    dispatch(fetchChaptersFailure(errorMessage));
    console.error(errorMessage);
    throw error;
  }
};

export const deleteDataModule = (chapterId) => async (dispatch) => {
  dispatch(fetchChapterRequest());
  try {
    const token = getCookie("token"); // Ambil token dari cookie
    const response = await axios.delete(`${api_url}chapter/delete/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteChapter(response.data));
    return response.data;
  } catch (error) {
    console.error("Delete error:", error.response ? error.response.data : error.message);
    dispatch(deleteChapterFailure(error.response?.data || "Delete failed"));
    throw error;
  }
};

// Data Konten
export const getDataKonten = (contentId) => async (dispatch) => {
  try {
    dispatch(fetchContentStart());
    console.log(`Fetching content with ID: ${contentId}`); // Debug log

    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${api_url}content/chapter/${contentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.data) {
      dispatch(fetchContentSuccess(response.data.data));
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } catch (error) {
    console.error("Fetch error:", error.response ? error.response.data : error.message);
    dispatch(fetchContentFailure(error.message));
  }
};

export const addDataKonten = (requestData, chapterId) => async (dispatch) => {
  dispatch(fetchContentStart());
  try {
    if (!chapterId) {
      const errorMessage = "Chapter ID is required";
      dispatch(fetchContentFailure(errorMessage));
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const token = getCookie("token");

    const response = await axios.post(
      `${api_url}content/create-content/${chapterId}`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(fetchContentSuccess(response.data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Add content failed";
    dispatch(fetchContentFailure(errorMessage));
    console.error(errorMessage);
    throw error;
  }
};

export const updateDataKonten = (contentId, updatedData) => async (dispatch) => {
  dispatch(updateContentRequest());
  try {
    const token = getCookie("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Pastikan tetap application/json karena tidak ada file
      },
    };

    const response = await axios.put(
      `${api_url}content/update-content/${contentId}`,
      updatedData,
      config
    );

    dispatch(updateContentSuccess(response.data.message));
    dispatch(getDataKonten()); // Optional: Untuk refresh data setelah update
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(updateContentFailure(errorMessage));
    throw new Error(errorMessage); // Untuk ditangani di komponen
  }
};

export const deleteDataKonten = (contentId) => async (dispatch) => {
  dispatch(fetchContentesRequest());
  try {
    const token = getCookie("token"); // Ambil token dari cookie
    const response = await axios.delete(`${api_url}content/delete-content/${contentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteContent(response.data));
    return response.data;
  } catch (error) {
    dispatch(deleteContentFailure(error.response?.data || "Delete failed"));
    throw error;
  }
};
