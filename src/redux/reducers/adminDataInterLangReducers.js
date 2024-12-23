import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languages: [],
  languageDetail: {},
  // Separate loading states
  loadingFetch: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  // Separate error states
  errorFetch: null,
  errorCreate: null,
  errorUpdate: null,
  errorDelete: null,
  token: null,
  successMessage: "",
};

const adminDataInterLangSlice = createSlice({
  name: "interpreterLanguages",
  initialState,
  reducers: {
    // Fetch all languages
    fetchLanguagesRequest: (state) => {
      state.loadingFetch = true;
      state.errorFetch = null;
    },
    fetchLanguagesSuccess: (state, action) => {
      console.log("Reducer - Fetch Languages Success:", action.payload); // Debugging
      state.languages = action.payload;
      state.loadingFetch = false;
      state.errorFetch = null;
    },
    fetchLanguagesFailure: (state, action) => {
      console.error("Reducer - Fetch Languages Failure:", action.payload); // Debugging
      state.loadingFetch = false;
      state.errorFetch = action.payload;
    },
    // Fetch language by ID
    fetchLanguageByIdRequest: (state) => {
      state.loadingFetch = true;
      state.errorFetch = null;
    },
    fetchLanguageByIdSuccess: (state, action) => {
      console.log("Reducer - Fetch Language By ID Success:", action.payload); // Debugging
      state.languageDetail = action.payload;
      state.loadingFetch = false;
      state.errorFetch = null;
    },
    fetchLanguageByIdFailure: (state, action) => {
      console.error("Reducer - Fetch Language By ID Failure:", action.payload); // Debugging
      state.loadingFetch = false;
      state.errorFetch = action.payload;
    },
    // Create language
    createLanguageRequest: (state) => {
      state.loadingCreate = true;
      state.errorCreate = null;
      state.successMessage = "";
    },
    createLanguageSuccess: (state, action) => {
      console.log("Reducer - Create Language Success:", action.payload); // Debugging
      state.languages.push(action.payload);
      state.loadingCreate = false;
      state.errorCreate = null;
      state.successMessage = "Language created successfully";
    },
    createLanguageFailure: (state, action) => {
      console.error("Reducer - Create Language Failure:", action.payload); // Debugging
      state.loadingCreate = false;
      state.errorCreate = action.payload;
    },
    // Update language
    updateLanguageRequest: (state) => {
      state.loadingUpdate = true;
      state.errorUpdate = null;
      state.successMessage = "";
    },
    // updateLanguageSuccess: (state, action) => {
    //   console.log("Reducer - Update Language Success:", action.payload); // Debugging
    //   const updatedLanguage = action.payload;
    //   state.languages = state.languages.map((lang) =>
    //     lang.id === updatedLanguage.id ? updatedLanguage : lang
    //   );
    //   state.loadingUpdate = false;
    //   state.errorUpdate = null;
    //   state.successMessage = "Language updated successfully";
    // },

    updateLanguageSuccess: (state, action) => {
      const updatedLanguage = action.payload;
      console.log("Reducer - Update Language Success Payload:", updatedLanguage);
      state.languages = state.languages.map((lang) =>
        lang.id === updatedLanguage.id ? updatedLanguage : lang
      );
      state.loadingUpdate = false;
      state.errorUpdate = null;
      state.successMessage = "Language updated successfully";
    },
    

    updateLanguageFailure: (state, action) => {
      console.error("Reducer - Update Language Failure:", action.payload); // Debugging
      state.loadingUpdate = false;
      state.errorUpdate = action.payload;
    },
    // Delete language
    deleteLanguageRequest: (state) => {
      state.loadingDelete = true;
      state.errorDelete = null;
      state.successMessage = "";
    },
    deleteLanguageSuccess: (state, action) => {
      console.log("Reducer - Delete Language Success:", action.payload); // Debugging
      state.languages = state.languages.filter(
        (lang) => lang.id !== action.payload
      );
      state.loadingDelete = false;
      state.errorDelete = null;
      state.successMessage = "Language deleted successfully";
    },
    deleteLanguageFailure: (state, action) => {
      console.error("Reducer - Delete Language Failure:", action.payload); // Debugging
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },
    // Clear messages
    clearMessages: (state) => {
      state.errorFetch = null;
      state.errorCreate = null;
      state.errorUpdate = null;
      state.errorDelete = null;
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
