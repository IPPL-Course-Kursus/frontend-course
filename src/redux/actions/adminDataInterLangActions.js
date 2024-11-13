import axios from "axios";
import { getCookie } from "cookies-next";
import {
  fetchLanguagesRequest,
  fetchLanguagesSuccess,
  fetchLanguagesFailure,
  fetchLanguageByIdRequest,
  fetchLanguageByIdSuccess,
  fetchLanguageByIdFailure,
  createLanguageRequest,
  createLanguageSuccess,
  createLanguageFailure,
  updateLanguageRequest,
  updateLanguageSuccess,
  updateLanguageFailure,
  deleteLanguageRequest,
  deleteLanguageSuccess,
  deleteLanguageFailure,
} from "../reducers/adminDataInterLangReducers";

const api_url =
  import.meta.env.VITE_REACT_API_ADDRESS ||
  "https://backend-course-production-9a7a.up.railway.app/";

// Fetch all interpreter languages with token authorization
export const fetchLanguages = () => async (dispatch) => {
  dispatch(fetchLanguagesRequest());
  try {
    const token = getCookie("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${api_url}interpreter-language/`, config);
    const data = response.data.success ? response.data.data : [];
    dispatch(fetchLanguagesSuccess(data));
  } catch (error) {
    dispatch(
      fetchLanguagesFailure(error.response?.data?.message || error.message)
    );
  }
};

// Fetch language by ID with token authorization
export const fetchLanguageById = (id) => async (dispatch) => {
  dispatch(fetchLanguageByIdRequest());
  try {
    const token = getCookie("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${api_url}interpreter-language/${id}`,
      config
    );
    const data = response.data.success ? response.data.data : {};
    dispatch(fetchLanguageByIdSuccess(data));
  } catch (error) {
    dispatch(
      fetchLanguageByIdFailure(error.response?.data?.message || error.message)
    );
  }
};

// Create new interpreter language
export const createLanguage = (languageData) => async (dispatch) => {
  dispatch(createLanguageRequest());
  try {
    const token = getCookie("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${api_url}interpreter-language/create-language`,
      languageData,
      config
    );

    if (response.data.message === "Language created successfully") {
      dispatch(createLanguageSuccess(response.data.data));
      // Optionally fetch updated list
      dispatch(fetchLanguages());
    } else {
      dispatch(createLanguageFailure("Failed to create language"));
    }
  } catch (error) {
    dispatch(
      createLanguageFailure(error.response?.data?.message || error.message)
    );
  }
};

// // Update interpreter language by ID
// export const updateLanguage = (id, languageData) => async (dispatch) => {
//   dispatch(updateLanguageRequest());
//   try {
//     const token = getCookie("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await axios.put(
//       `${api_url}interpreter-language/update-language/${id}`,
//       languageData,
//       config
//     );

//     if (response.data.message === "Language updated successfully") {
//       dispatch(updateLanguageSuccess(response.data.data));
//       // Optionally fetch updated list
//       dispatch(fetchLanguages());
//     } else {
//       dispatch(updateLanguageFailure("Failed to update language"));
//     }
//   } catch (error) {
//     dispatch(
//       updateLanguageFailure(error.response?.data?.message || error.message)
//     );
//   }
// };

export const updateLanguage = (id, languageData) => async (dispatch) => {
    dispatch(updateLanguageRequest());
    try {
      const token = getCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
  
      const response = await axios.put(
        `${api_url}interpreter-language/update-language/${id}`,
        languageData,
        config
      );
  
      if (response.data.message === "Language updated successfully") {
        const updatedLanguage = { id, ...languageData };
        dispatch(updateLanguageSuccess(updatedLanguage));
      } else {
        dispatch(updateLanguageFailure("Failed to update language"));
      }
    } catch (error) {
      dispatch(
        updateLanguageFailure(error.response?.data?.message || error.message)
      );
    }
  };

// Delete interpreter language by ID
export const deleteLanguage = (id) => async (dispatch) => {
  dispatch(deleteLanguageRequest());
  try {
    const token = getCookie("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${api_url}interpreter-language/delete-language/${id}`,
      config
    );

    if (response.data.message === "Language deleted successfully") {
      dispatch(deleteLanguageSuccess(id));
      // Optionally fetch updated list
      dispatch(fetchLanguages());
    } else {
      dispatch(deleteLanguageFailure("Failed to delete language"));
    }
  } catch (error) {
    dispatch(
      deleteLanguageFailure(error.response?.data?.message || error.message)
    );
  }
};
