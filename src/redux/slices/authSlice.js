import { createSlice } from "@reduxjs/toolkit";

// Inisialisasi state awal
const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const initialEmailState = {
  sending: false,
  success: false,
  error: null,
};

const initialVerifyEmailState = {
  sending: false,
  success: false,
  error: null,
};

const initialStateProfile = {
  profileData: null,
  loading: false,
  error: null,
};

// Membuat slice untuk auth

// const authSlice = createSlice({
//   name: "auth",
//   initialState,

//   reducers: {
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//     },
//   },
// });
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
const emailSlice = createSlice({
  name: "email",
  initialState: initialEmailState,
  reducers: {
    sendEmailStart: (state) => {
      state.sending = true;
      state.success = false;
      state.error = null;
    },
    sendEmailSuccess: (state) => {
      state.sending = false;
      state.success = true;
      state.error = null;
    },
    sendEmailFailure: (state, action) => {
      state.sending = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

const initialResetPasswordState = {
  resetting: false,
  success: false,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: initialResetPasswordState,
  reducers: {
    resetPasswordStart: (state) => {
      state.resetting = true;
      state.success = false;
      state.error = null;
    },
    resetPasswordSuccess: (state) => {
      state.resetting = false;
      state.success = true;
      state.error = null;
    },
    resetPasswordFailure: (state, action) => {
      state.resetting = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

const verifyEmailSlice = createSlice({
  name: "email",
  initialState: initialVerifyEmailState,
  reducers: {
    verifyEmailStart: (state) => {
      state.sending = true;
      state.success = false;
      state.error = null;
    },
    verifyEmailSuccess: (state) => {
      state.sending = false;
      state.success = true;
      state.error = null;
    },
    verifyEmailFailure: (state, action) => {
      state.sending = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialStateProfile,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Reset Password
export const { resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } =
  resetPasswordSlice.actions;

// Auth
export const { setToken, setUser, logout } = authSlice.actions;

// Email
export const { sendEmailStart, sendEmailSuccess, sendEmailFailure } = emailSlice.actions;

// Verify Email
export const { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure } =
  verifyEmailSlice.actions;

// Profile
export const { setProfileData, setError, setLoading } = profileSlice.actions;

// Export reducer untuk digunakan di store
export const authReducer = authSlice.reducer;

export const emailReducer = emailSlice.reducer;
export const resetPasswordReducer = resetPasswordSlice.reducer;
export const verifyEmailReducer = verifyEmailSlice.reducer;
export default profileSlice.reducer;
