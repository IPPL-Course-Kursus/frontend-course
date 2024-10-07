import { createSlice } from "@reduxjs/toolkit";

// Inisialisasi state awal
const initialLoginState = {
  user: null,
  uid: null, // Menyimpan UID
  token: null, // Menyimpan token
  role: null, // Menyimpan role
  loading: false,
  error: null,
};

const initialRegisterState = {
  loading: false,
  success: false,
  error: null,
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

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      // Simpan data user, uid, token, dan role
      state.user = action.payload.user; // Simpan data user
      state.uid = action.payload.uid; // Simpan UID
      state.token = action.payload.token; // Simpan token
      state.role = action.payload.role; // Simpan role
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Simpan error jika terjadi
    },
    setUser: (state, action) => {
      state.user = action.payload; // Simpan data user
    },
    logout: (state) => {
      // Reset semua nilai saat logout
      state.user = null;
      state.uid = null; // Reset UID saat logout
      state.token = null; // Reset token saat logout
      state.role = null; // Reset role saat logout
      state.loading = false;
      state.error = null;
    },
  },
});

// const loginSlice = createSlice({
//   name: "login",
//   initialState: initialLoginState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.uid = action.payload.uid; // Simpan UID
//       state.token = action.payload.token; // Simpan token
//       state.user = action.payload.user; // Simpan data user
//       state.role = action.payload.role; // Simpan role
//       state.loading = false;
//       state.error = null;
//     },

//     setUser: (state, action) => {
//       state.user = action.payload; // Simpan data user
//     },
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user; // Simpan data user
//       state.uid = action.payload.uid; // Simpan UID
//       state.token = action.payload.token; // Simpan token
//       state.role = action.payload.role; // Simpan role
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload; // Simpan error jika terjadi
//     },
//     logout: (state) => {
//       state.user = null;
//       state.uid = null; // Reset UID saat logout
//       state.token = null; // Reset token saat logout
//       state.role = null; // Reset role saat logout
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

const registerSlice = createSlice({
  name: "register",
  initialState: initialRegisterState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true; // Set berhasil setelah registrasi
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.success = false; // Reset status berhasil
      state.error = action.payload; // Simpan error jika terjadi
    },
    resetRegister: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null; // Reset state registrasi
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

// Auth Login
// export const { setCredentials, setUser, loginStart, loginSuccess, loginFailure, logout } =
//   loginSlice.actions;

export const { loginStart, loginSuccess, loginFailure, setUser, logout } = loginSlice.actions;
// Auth Register
export const { registerStart, registerSuccess, registerFailure, resetRegister } =
  registerSlice.actions;

// Reset Password
export const { resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } =
  resetPasswordSlice.actions;

// Email
export const { sendEmailStart, sendEmailSuccess, sendEmailFailure } = emailSlice.actions;

// Verify Email
export const { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure } =
  verifyEmailSlice.actions;

// Profile

// Export reducer untuk digunakan di store
export const loginReducer = loginSlice.reducer;

export const registerReducer = registerSlice.reducer;
export const emailReducer = emailSlice.reducer;
export const resetPasswordReducer = resetPasswordSlice.reducer;
export const verifyEmailReducer = verifyEmailSlice.reducer;

// // Selektor untuk mendapatkan UID, Token, dan Role
// export const selectUid = (state) => state.login.uid;
// export const selectToken = (state) => state.login.token;
// export const selectRole = (state) => state.login.role; // Selektor untuk role
export const selectUid = (state) => state.auth.uid;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
