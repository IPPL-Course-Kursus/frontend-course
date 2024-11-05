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
    const response = await axios.get(`${api_url}course/`);

    const courses = response.data;
    console.log("ini kelas :", response.data);

    dispatch(setCourse(courses));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
  }
};

// export const addDataKelas = (requestData) => async (dispatch) => {
//   dispatch(addCourseRequest()); // Set loading state

//   try {
//     // Ambil token dari cookies
//     const token = getCookie("token");

//     // Konversi tipe data ke format yang diharapkan
//     const formattedData = {
//       ...requestData,
//       categoryId: parseInt(requestData.categoryId, 10),
//       courseLevelId: parseInt(requestData.courseLevelId, 10),
//       typeCourseId: parseInt(requestData.typeCourseId, 10),
//       totalDuration: parseInt(requestData.totalDuration, 10),
//       certificateStatus: Boolean(requestData.certificateStatus),
//     };

//     // Set up config untuk header
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     // Lakukan POST request dengan FormData
//     const response = await axios.post(`${api_url}course/createCourse`, formattedData, config);

//     dispatch(addCourseSuccess(response.data.message)); // Sesuaikan dengan response API Anda
//     console.log(response.data.message);
//     dispatch(getAllKelas());
//   } catch (error) {
//     console.error("Error adding data kelas:", error.response || error);
//     const errorMessage = error.response?.data?.message || error.message || "Add data kelas failed";
//     dispatch(addCourseFailure(errorMessage)); // Dispatch action failure
//   }
// };

// export const addDataKelas = (requestData) => async (dispatch) => {
//   dispatch(addCourseRequest());

//   try {
//     // Get token from cookies
//     const token = getCookie("token");

//     // Create FormData and manually format each field
//     const formData = new FormData();

//     formData.append("categoryId", JSON.stringify(parseInt(requestData.categoryId, 10)));
//     formData.append("courseLevelId", JSON.stringify(parseInt(requestData.courseLevelId, 10)));
//     formData.append("typeCourseId", JSON.stringify(parseInt(requestData.typeCourseId, 10)));
//     formData.append("courseName", requestData.courseName || "");
//     formData.append("aboutCourse", requestData.aboutCourse || "");
//     formData.append("intendedFor", requestData.intendedFor || "");
//     formData.append("coursePrice", JSON.stringify(parseFloat(requestData.coursePrice) || 0));
//     formData.append(
//       "courseDiscountPercent",
//       JSON.stringify(parseFloat(requestData.courseDiscountPercent) || 0)
//     );
//     formData.append("totalDuration", JSON.stringify(parseFloat(requestData.totalDuration) || 0));
//     formData.append("certificateStatus", JSON.stringify(Boolean(requestData.certificateStatus)));
//     formData.append("publish", JSON.stringify(Boolean(requestData.publish)));

//     if (requestData.image) {
//       formData.append("image", requestData.image);
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     const response = await axios.post(`${api_url}course/createCourse`, formData, config);

//     dispatch(addCourseSuccess(response.data.message));
//     dispatch(getAllKelas());
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || "Add data kelas failed";
//     dispatch(addCourseFailure(errorMessage));
//   }
// };
export const addDataKelas = (requestData) => async (dispatch) => {
  dispatch(addCourseRequest());

  try {
    // Get token from cookies
    const token = getCookie("token");

    // Log requestData to see what it contains
    console.log("Request Data:", requestData);

    // Create FormData and manually format each field
    const formData = new FormData();

    // Parse and append each field
    const categoryId = parseInt(requestData.categoryId, 10);
    const courseLevelId = parseInt(requestData.courseLevelId, 10);
    const typeCourseId = parseInt(requestData.typeCourseId, 10);

    // Log parsed values to debug
    console.log("Parsed Values:", { categoryId, courseLevelId, typeCourseId });

    formData.append("categoryId", !isNaN(categoryId) ? categoryId : null);
    formData.append("courseLevelId", !isNaN(courseLevelId) ? courseLevelId : null);
    formData.append("typeCourseId", !isNaN(typeCourseId) ? typeCourseId : null);
    formData.append("courseName", requestData.courseName || "");
    formData.append("aboutCourse", requestData.aboutCourse || "");
    formData.append("intendedFor", requestData.intendedFor || "");
    formData.append("coursePrice", parseFloat(requestData.coursePrice) || 0);
    formData.append("courseDiscountPercent", parseFloat(requestData.courseDiscountPercent) || 0);
    formData.append("totalDuration", parseFloat(requestData.totalDuration) || 0);
    formData.append("certificateStatus", Boolean(requestData.certificateStatus));
    formData.append("publish", Boolean(requestData.publish));

    // If there is an image, append it to FormData
    if (requestData.image) {
      formData.append("image", requestData.image);
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
    console.log(formData);
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || error.message || "Add data kelas failed";
    dispatch(addCourseFailure(errorMessage));
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
