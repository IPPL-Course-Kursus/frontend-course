import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languages: [],
  languageDetail: {},
  loading: false,
  error: null,
  token: null,
  successMessage: "",
};

const adminDataInterLangSlice = createSlice({
  name: "interpreterLanguages",
  initialState,
  reducers: {
    // Fetch all languages
    fetchLanguagesRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
    },
    fetchLanguagesSuccess: (state, action) => {
      state.languages = action.payload;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    fetchLanguagesFailure: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    // Fetch language by ID
    fetchLanguageByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
    },
    fetchLanguageByIdSuccess: (state, action) => {
      state.languageDetail = action.payload;
      state.loading = false;
      state.error = null;
      state.token = null;
    },
    fetchLanguageByIdFailure: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    // Create language
    createLanguageRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.successMessage = "";
    },
    createLanguageSuccess: (state, action) => {
      state.languages.push(action.payload);
      state.loading = false;
      state.error = null;
      state.token = null;
      state.successMessage = "Language created successfully";
    },
    createLanguageFailure: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    // Update language
    updateLanguageRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.successMessage = "";
    },
    // updateLanguageSuccess: (state, action) => {
    //   const index = state.languages.findIndex(
    //     (lang) => lang.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.languages[index] = action.payload;
    //   }
    //   state.loading = false;
    //   state.error = null;
    //   state.token = null;
    //   state.successMessage = "Language updated successfully";
    // },
    updateLanguageSuccess: (state, action) => {
        state.loading = false;
        const updatedLanguage = action.payload;
        state.languages = state.languages.map((lang) =>
          lang.id === updatedLanguage.id ? updatedLanguage : lang
        );
        state.successMessage = "Language updated successfully";
      },
    updateLanguageFailure: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    // Delete language
    deleteLanguageRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.successMessage = "";
    },
    deleteLanguageSuccess: (state, action) => {
      state.languages = state.languages.filter(
        (lang) => lang.id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.token = null;
      state.successMessage = "Language deleted successfully";
    },
    deleteLanguageFailure: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
    },
    // Clear messages
    clearMessages: (state) => {
      state.error = null;
      state.token = null;
      state.successMessage = "";
    },
  },
});

export const {
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
  clearMessages,
} = adminDataInterLangSlice.actions;

export default adminDataInterLangSlice.reducer;
