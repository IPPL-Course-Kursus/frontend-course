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
import { data } from "autoprefixer";

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

    // const response = await axios.post(`${api_url}course/createCourse`, formData, config);
    // dispatch(addCourseSuccess(response.data.message));
    // dispatch(getAllKelas());
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


// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addDataKonten,} from "../../../redux/actions/instruktorActions";

// const DataKontenModule = ({ show, onClose, chapterId }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     sort: "",
//     contentTitle: "",
//     teks: "",
//     contentUrl: "",
//     duration: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "sort" || name === "duration" ? Number(value) : value,
//     }));
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { sort, contentTitle, teks, contentUrl, duration } = formData;
//     if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
//       alert("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     const requestData = {
//       sort: Number(sort),
//       contentTitle,
//       teks,
//       contentUrl,
//       duration: Number(duration),
//     };

//     dispatch(addDataKonten(requestData, chapterId))
//       .then(() => {
//         setLoading(false);
//         onClose();
//         // Reload window after successful addition
//         window.location.reload();
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError(err.response?.data?.message || "Error adding content");
//         console.error("Error detail:", err);
//       });
//   };

//   if (!show) return null;

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-50"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//     >
//       <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
//         <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Kategori</h2>

//         {/* Display loading indicator */}
//         {/* {loading && <div className="mb-4 text-center text-blue-600">Loading...</div>} */}

//         {/* Display error message */}
//         {error && <div className="mb-4 text-center text-red-600">{error}</div>}

//         <form onSubmit={handleAdd}>
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Urutan</label>
//             <input
//               type="number"
//               name="sort"
//               value={formData.sort}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="ex 1"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Judul Materi</label>
//             <input
//               type="text"
//               name="contentTitle"
//               value={formData.contentTitle}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan judul kelas"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Teks</label>
//             <input
//               type="text"
//               name="teks"
//               value={formData.teks}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan teks"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Video URL</label>
//             <input
//               type="text"
//               name="contentUrl"
//               value={formData.contentUrl}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan Video URL"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Durasi</label>
//             <input
//               type="number"
//               name="duration"
//               value={formData.duration}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan durasi video"
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 px-4 py-2 rounded-md font-semibold"
//             >
//               Batal
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
//             >
//               Tambah
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// DataKontenModule.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   chapterId: PropTypes.string.isRequired,
// };

// export default DataKontenModule;

// // const handleAdd = (e) => {
// //   e.preventDefault();
// //   setLoading(true);

// //   const { sort, contentTitle, teks, contentUrl, duration } = formData;
// //   if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
// //     alert("Please fill in all required fields.");
// //     setLoading(false);
// //     return;
// //   }

// //   const requestData = {
// //     sort: Number(sort),
// //     contentTitle,
// //     teks,
// //     contentUrl,
// //     duration: Number(duration),
// //   };

// //   dispatch(addDataKonten(requestData, chapterId))
// //     .then(() => {
// //       setLoading(false);
// //       onClose();
// //     })
// //     .catch((err) => {
// //       setLoading(false);
// //       setError(err.response?.data?.message || "Error adding content");
// //       console.error("Error detail:", err);
// //     });
// // };

// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addDataKonten } from "../../../redux/actions/instruktorActions";
// import CodeMirror from "@uiw/react-codemirror"; // Adjust import if necessary
// import { githubLight } from "@uiw/codemirror-theme-github";
// import { python } from "@codemirror/lang-python";
// import { runCode } from "../../../redux/actions/mulaiKelasActions";

// const DataKontenModule = ({ show, onClose, chapterId }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [language, setLanguage] = useState("");
//   const [sourceCode, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     sort: "",
//     contentTitle: "",
//     teks: "",
//     contentUrl: "",
//     duration: "",
//     interpreterId: "",
//     interpreterStatus: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear error when user starts typing
//     if (error) setError(null);
//   };

//   const handleAdd = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { sort, contentTitle, teks, contentUrl, duration, interpreterId, interpreterStatus } =
//       formData;

//     if (!sort || !contentTitle || !teks || !contentUrl || !duration) {
//       setError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     if (interpreterStatus && (!sourceCode || !language)) {
//       setError("Both source code and language must be filled in.");
//       setLoading(false);
//       return;
//     }

//     const requestData = {
//       sort: Number(sort),
//       contentTitle,
//       teks,
//       contentUrl,
//       duration: Number(duration),
//       interpreterId: interpreterStatus ? interpreterId || null : null,
//       interpreterStatus,
//       sourceCode: interpreterStatus ? sourceCode : null,
//       language: interpreterStatus ? language : null,
//     };

//     dispatch(addDataKonten(requestData, chapterId))
//       .then(() => {
//         setLoading(false);
//         onClose();
//         window.location.reload();
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError(err.response?.data?.message || "Error adding content");
//       });
//   };

//   const handleRunCode = () => {
//     if (!language || !sourceCode) {
//       setError("Language or source code is missing.");
//       return;
//     }

//     setLoading(true);
//     dispatch(runCode({ language, sourceCode }))
//       .then((response) => {
//         if (response.data) {
//           setOutput(response.data.output || "No output returned.");
//         } else {
//           setError("Error: Response data is undefined.");
//         }
//       })
//       .catch((error) => {
//         const errorMessage = error.response?.data?.message || error.message;
//         setError(`Error executing code: ${errorMessage}`);
//       })
//       .finally(() => setLoading(false));
//   };

//   const copyCode = () => {
//     navigator.clipboard.writeText(sourceCode);
//     alert("Code successfully copied!");
//   };

//   const resetCode = () => {
//     setCode("");
//   };

//   if (!show) return null;

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-50"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//     >
//       <div className="bg-white w-full max-w-lg h-[80vh] p-6 rounded-lg shadow-lg relative overflow-y-auto">
//         <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
//           &times;
//         </button>
//         <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">Tambah Konten</h2>

//         {/* Display error message */}
//         {error && <div className="mb-4 text-center text-red-600">{error}</div>}

//         <form onSubmit={handleAdd}>
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Urutan</label>
//             <input
//               type="number"
//               name="sort"
//               value={formData.sort}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="ex 1"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Judul Materi</label>
//             <input
//               type="text"
//               name="contentTitle"
//               value={formData.contentTitle}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan judul kelas"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Teks</label>
//             <input
//               type="text"
//               name="teks"
//               value={formData.teks}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan teks"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Video URL</label>
//             <input
//               type="text"
//               name="contentUrl"
//               value={formData.contentUrl}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan Video URL"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Durasi</label>
//             <input
//               type="number"
//               name="duration"
//               value={formData.duration}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan durasi video"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Interpreter ID</label>
//             <input
//               type="number" // Change input type to number
//               name="interpreterId"
//               value={formData.interpreterId}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-xl"
//               placeholder="Masukkan Interpreter ID"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Status Interpreter</label>
//             <input
//               type="checkbox"
//               name="interpreterStatus"
//               checked={formData.interpreterStatus}
//               onChange={handleInputChange}
//               className="mr-2"
//             />
//             <span>Aktif</span>
//           </div>

//           {/* Show CodeMirror when interpreterStatus is true */}
//           {formData.interpreterStatus && (
//             <section className="bg-white p-6 rounded-lg shadow-lg mb-10">
//               <h3 className="text-gray-700 text-2xl font-semibold mb-4">Editor Kode</h3>
//               <CodeMirror
//                 id="code"
//                 value={sourceCode}
//                 theme={githubLight}
//                 height="400px"
//                 extensions={[python()]}
//                 onChange={(value) => setCode(value)}
//                 className="w-full p-3 border border-gray-600 rounded-lg mb-4"
//               ></CodeMirror>
//               <div className="flex space-x-4">
//                 <button
//                   className="bg-blue-600 text-white py-2 px-4 rounded-lg"
//                   onClick={handleRunCode}
//                   disabled={loading}
//                 >
//                   {loading ? "Running..." : "Run Code"}
//                 </button>

//                 <button
//                   className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
//                   onClick={copyCode}
//                 >
//                   Copy Code
//                 </button>
//                 <button className="bg-red-600 text-white py-2 px-4 rounded-lg" onClick={resetCode}>
//                   Reset Code
//                 </button>
//               </div>

//               <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//                 <h4 className="text-gray-700 font-semibold">Output:</h4>
//                 <p className="text-gray-600 mt-2">{output}</p>
//               </div>
//             </section>
//           )}

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 px-4 py-2 rounded-md font-semibold"
//             >
//               Batal
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
//             >
//               Tambah
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// DataKontenModule.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   chapterId: PropTypes.string.isRequired,
// };

// export default DataKontenModule;
