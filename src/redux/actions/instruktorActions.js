import axios from "axios";
// import { fetchCourseFailure, fetchCourseStart, fetchCourseSuccess, setCourse } from "../reducers/courseReducers";
import {
  deleteChapter,
  // deleteChapterFailure,
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
  fetchUserCoursesFailure,
  fetchUserCoursesStart,
  fetchUserCoursesSuccess,
  setCourse,
  updateCourseFailure,
  updateCourseRequest,
  updateCourseSuccess,
} from "../reducers/courseReducers";
import { compileFailure, compileStart, compileSuccess } from "../reducers/compileReducers";
import toast from "react-hot-toast";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Data Kelas

export const getAllKelas = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course/`);

    const courses = response.data;
    console.log("ini kelas :", response.data);

    dispatch(setCourse(courses));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
  }
};

export const fetchUserCourses = () => async (dispatch) => {
  dispatch(fetchUserCoursesStart()); // Indicate the start of the fetch process
  try {
    const token = getCookie("token");

    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }

    const response = await axios.get(`${api_url}course/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Dispatch success action with the fetched data
    dispatch(fetchUserCoursesSuccess(response.data));
  } catch (error) {
    // Dispatch failure action with error message
    dispatch(fetchUserCoursesFailure(error.message));
  }
};

export const addDataKelas = (requestData, imageFile) => async (dispatch) => {
  dispatch(addCourseRequest());

  try {
    const token = getCookie("token");
    const formData = new FormData();

    const categoryId = parseInt(requestData.categoryId, 10);
    const courseLevelId = parseInt(requestData.courseLevelId);
    const typeCourseId = parseInt(requestData.typeCourseId, 10);

    formData.append("categoryId", !isNaN(categoryId) ? categoryId : null);
    formData.append("courseLevelId", !isNaN(courseLevelId) ? courseLevelId : null);
    formData.append("typeCourseId", !isNaN(typeCourseId) ? typeCourseId : null);
    formData.append("courseName", requestData.courseName || "");
    formData.append("aboutCourse", requestData.aboutCourse || "");
    formData.append("intendedFor", requestData.intendedFor || "");
    formData.append("coursePrice", parseFloat(requestData.coursePrice) || 0);
    formData.append("courseDiscountPercent", parseFloat(requestData.courseDiscountPercent) || 0);
    formData.append("certificateStatus", requestData.certificateStatus);
    formData.append("publish", requestData.publish);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(`${api_url}course/createCourse`, formData, config);
    dispatch(addCourseSuccess(response.data.message));
    dispatch(getAllKelas());
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || error.message || "Add data kelas failed";
    dispatch(addCourseFailure(errorMessage));
  }
};

export const updateDataCourse = (courseId, updatedData) => async (dispatch) => {
  dispatch(updateCourseRequest());
  try {
    if (!courseId || typeof courseId !== "string" || courseId.trim() === "") {
      const errorMessage = "Invalid course ID";
      console.log(errorMessage);
      dispatch(updateCourseFailure(errorMessage));
      return;
    }

    const token = getCookie("token");
    const formData = new FormData();
    const categoryId = parseInt(updatedData.categoryId, 10);
    const courseLevelId = parseInt(updatedData.courseLevelId);
    const typeCourseId = parseInt(updatedData.typeCourseId, 10);

    formData.append("categoryId", !isNaN(categoryId) ? categoryId : null);
    formData.append("courseLevelId", !isNaN(courseLevelId) ? courseLevelId : null);
    formData.append("typeCourseId", !isNaN(typeCourseId) ? typeCourseId : null);
    formData.append("courseName", updatedData.courseName || "");
    formData.append("aboutCourse", updatedData.aboutCourse || "");
    formData.append("intendedFor", updatedData.intendedFor || "");
    formData.append("coursePrice", parseFloat(updatedData.coursePrice) || 0);
    formData.append("courseDiscountPercent", parseFloat(updatedData.courseDiscountPercent) || 0);
    formData.append("certificateStatus", updatedData.certificateStatus);
    formData.append("publish", updatedData.publish);

    if (updatedData.image) {
      formData.append("image", updatedData.image);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.put(
      `${api_url}course/update-course/${courseId}`,
      formData,
      config
    );

    console.log(response.data);

    dispatch(updateCourseSuccess(response.data));
    dispatch(fetchUserCourses()); // Memperbarui kursus pengguna setelah pembaruan
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || error.message || "Update data kelas failed";
    dispatch(updateCourseFailure(errorMessage)); // Dispatch kegagalan
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

    console.log("Requesting chapter with ID:", chapterId);
    const response = await axios.get(`${api_url}chapter/course/${chapterId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response.data);

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
    dispatch(deleteContentFailure(error.response?.data || "Delete failed"));
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
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(
      `${api_url}content/update-content/${contentId}`,
      updatedData,
      config
    );

    dispatch(updateContentSuccess(response.data.message));
    dispatch(getDataKonten());
    return response.data.message; // Mengembalikan pesan sukses untuk di-`then` pada komponen
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(updateContentFailure(errorMessage));
    throw new Error(errorMessage);
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

export const compileCode = (compileData) => async (dispatch) => {
  dispatch(compileStart());

  try {
    const response = await axios.put(`${api_url}compiler/compile`, compileData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(compileSuccess(response.data));
    toast.success("Code compiled successfully!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to compile code.";
    dispatch(compileFailure(errorMessage));
    toast.error(errorMessage);
  }
};
