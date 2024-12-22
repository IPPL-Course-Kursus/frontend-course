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

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

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
    console.log("Fetch Languages Response:", response.data); // Debugging
    const data = response.data.success ? response.data.data : [];
    dispatch(fetchLanguagesSuccess(data));
  } catch (error) {
    console.error("Fetch Languages Error:", error); // Debugging
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
    console.log("Fetch Language By ID Response:", response.data); // Debugging
    const data = response.data.success ? response.data.data : {};
    dispatch(fetchLanguageByIdSuccess(data));
  } catch (error) {
    console.error("Fetch Language By ID Error:", error); // Debugging
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

    console.log("Create Language Response:", response.data); // Debugging

    if (response.data.message === "Language created successfully") {
      const newLanguage = response.data.data; // Assuming API returns new language data
      dispatch(createLanguageSuccess(newLanguage));
      // Optionally fetch updated list
      dispatch(fetchLanguages());
    } else {
      const errorMsg = response.data.message || "Failed to create language";
      dispatch(createLanguageFailure(errorMsg));
      throw new Error(errorMsg); // Throw error to be caught in component
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to create language";
    console.error("Create Language Error:", error); // Debugging
    dispatch(createLanguageFailure(errorMsg));
    throw new Error(errorMsg); // Re-throw error to be caught in component
  }
};

// // Update interpreter language
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

//     console.log("Update Language Response:", response.data); // Debugging

//     if (response.data.message === "Language updated successfully") {
//       const updatedLanguage = response.data.data; // Assuming API returns updated language data
//       dispatch(updateLanguageSuccess(updatedLanguage));
//       // Optionally fetch updated list
//       dispatch(fetchLanguages());
//     } else {
//       const errorMsg = response.data.message || "Failed to update language";
//       dispatch(updateLanguageFailure(errorMsg));
//       throw new Error(errorMsg); // Throw error to be caught in component
//     }
//   } catch (error) {
//     const errorMsg =
//       error.response?.data?.message || error.message || "Failed to update language";
//     console.error("Update Language Error:", error); // Debugging
//     dispatch(updateLanguageFailure(errorMsg));
//     throw new Error(errorMsg); // Re-throw error to be caught in component
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

    console.log("Update Language Response:", response.data); // Debugging

    if (response.data.message === "Language updated successfully") {
      // Manually construct the updated language object since API doesn't return data
      const updatedLanguage = { id, ...languageData };
      dispatch(updateLanguageSuccess(updatedLanguage));
      // Optionally fetch updated list
      dispatch(fetchLanguages());
    } else {
      const errorMsg = response.data.message || "Failed to update language";
      dispatch(updateLanguageFailure(errorMsg));
      throw new Error(errorMsg); // Throw error to be caught in component
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to update language";
    console.error("Update Language Error:", error); // Debugging
    dispatch(updateLanguageFailure(errorMsg));
    throw new Error(errorMsg); // Re-throw error to be caught in component
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

    console.log("Delete Language Response:", response.data); // Debugging

    if (response.data.message === "Language deleted successfully") {
      dispatch(deleteLanguageSuccess(id));
      // Optionally fetch updated list
      dispatch(fetchLanguages());
    } else {
      const errorMsg = response.data.message || "Failed to delete language";
      dispatch(deleteLanguageFailure(errorMsg));
      throw new Error(errorMsg); // Throw error to be caught in component
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to delete language";
    console.error("Delete Language Error:", error); // Debugging
    dispatch(deleteLanguageFailure(errorMsg));
    throw new Error(errorMsg); // Re-throw error to be caught in component
  }
};
