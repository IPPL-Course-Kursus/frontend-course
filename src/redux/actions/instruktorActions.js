import axios from "axios";
import { setCourse } from "../reducers/courseReducers";
import {
  fetchChaptersFailure,
  fetchChaptersStart,
  fetchChaptersSuccess,
  //   setchapter,
} from "../reducers/chapterReducers";
import { getCookie } from "cookies-next";
import {
  // addContent,
  // addContent,
  fetchContentFailure,
  fetchContentStart,
  fetchContentSuccess,
} from "../reducers/contentReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getAllKelas = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course`);

    const courses = response.data;
    console.log("ini kelas :", response.data);

    dispatch(setCourse(courses));
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
  }
};
// actions.js
// actions.js
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
      dispatch(fetchChaptersSuccess(response.data.data)); // Ambil data chapters
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } catch (error) {
    console.error("Fetch error:", error.response ? error.response.data : error.message);
    dispatch(fetchChaptersFailure(error.message));
  }
};

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

    // console.log(response.data); // Debug log
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

// export const addDataKonten = (id, contentData) => async (dispatch) => {
//   console.log("Received contentData:", contentData); // Tambahkan logging ini

//   if (
//     !contentData.contentTitle ||
//     !contentData.teks ||
//     !contentData.contentUrl ||
//     !contentData.duration ||
//     !contentData.sort
//   ) {
//     console.error("There is an empty column that must be filled in");
//     return; // Hentikan jika ada field kosong
//   }

//   dispatch(fetchContentStart());
//   try {
//     const token = getCookie("token");

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json", // If not using FormData
//       },
//     };

//     const response = await axios.post(
//       `${api_url}content/create-content/${id}`,
//       contentData, // Send validated data
//       config
//     );

//     dispatch(fetchContentSuccess(response.data.data));
//     dispatch(addContent(response.data.data));
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || "Add content failed";
//     dispatch(fetchContentFailure(errorMessage));
//     console.error(errorMessage);
//     throw error;
//   }
// };

export const addDataKonten = (requestData, chapterId) => async (dispatch) => {
  dispatch(fetchContentStart());
  try {
    if (!chapterId) {
      const errorMessage = "Chapter ID is required";
      dispatch(fetchContentFailure(errorMessage));
      console.error(errorMessage);
      throw new Error(errorMessage); // Throw error jika chapterId tidak valid
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
    console.error(errorMessage); // Log error untuk debugging
    throw error; // Re-throw error jika diperlukan untuk penanganan lebih lanjut
  }
};

// export const addDataKonten = (formData, chapterId, contentData) => async (dispatch) => {
//   console.log("Received contentData:", contentData); // Check the received contentData

//   try {
//     // Check if contentData is defined and has the necessary fields
//     if (
//       !contentData ||
//       !contentData.contentTitle ||
//       !contentData.teks ||
//       !contentData.contentUrl ||
//       !contentData.duration ||
//       !contentData.sort
//     ) {
//       console.error("There is an empty column that must be filled in");
//       return; // Stop if there are empty fields
//     }

//     const token = getCookie("token");

//     // Combine formData and contentData into one object
//     const requestData = { ...formData, ...contentData }; // Merge the two objects

//     const response = await axios.post(
//       `${api_url}/content/create-content/${chapterId}`,
//       requestData, // Use the merged requestData
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch({ type: "ADD_DATA_KONTEN_SUCCESS", payload: response.data.data });
//   } catch (error) {
//     console.error("Error adding content:", error);
//     dispatch({ type: "ADD_DATA_KONTEN_FAIL", payload: error.message });
//   }
// };
// export const addDataKonten = (formData, chapterId, contentData) => async (dispatch) => {
//   dispatch(fetchContentStart()); // Mengindikasikan permintaan dimulai
//   try {
//     const token = getCookie("token");

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json", // Pastikan untuk mengatur Content-Type jika mengirimkan JSON
//       },
//     };

//     const formData = new FormData();
//     formData.append("contentTitle", contentData.contentTitle);
//     formData.append("contentUrl", contentData.contentUrl);
//     formData.append("duration", contentData.duration);
//     formData.append("sort", contentData.sort);

//     const response = await axios.post(
//       `${api_url}content/create-content/${chapterId}`,
//       formData, // Kirimkan FormData
//       config
//     );

//     console.log("Data yang dikirim:", formData);

//     // Dispatch action untuk sukses dengan data yang diterima
//     dispatch(fetchContentSuccess(response.data.data));
//     dispatch(addContent(response.data.data)); // Pastikan menambahkan payload yang tepat
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || "Add content failed";
//     dispatch(fetchContentFailure(errorMessage));
//     console.error(errorMessage); // Log error untuk debugging
//     throw error; // Re-throw error jika diperlukan untuk penanganan lebih lanjut
//   }
// };
