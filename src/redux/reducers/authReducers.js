// import { createSlice } from "@reduxjs/toolkit";

// // Inisialisasi state awal
// const initialAuthState = {
//   user: null,
//   uid: null, // Menyimpan UID
//   token: null, // Menyimpan token
//   role: null, // Menyimpan role
//   loading: false,
//   error: null,
//   success: false, // Menyimpan status registrasi
// };

// const initialEmailState = {
//   sending: false,
//   success: false,
//   error: null,
// };

// const initialVerifyEmailState = {
//   sending: false,
//   success: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuthState,
//   reducers: {
//     // Reducers untuk login
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
//     setUser: (state, action) => {
//       state.user = action.payload; // Simpan data user
//     },
//     logout: (state) => {
//       state.user = null;
//       state.uid = null; // Reset UID
//       state.token = null; // Reset token
//       state.role = null; // Reset role
//       state.loading = false;
//       state.error = null;
//       state.success = false; // Reset status registrasi saat logout
//     },

//     // Reducers untuk register
//     registerStart: (state) => {
//       state.loading = true;
//       state.success = false;
//       state.error = null;
//     },
//     registerSuccess: (state) => {
//       state.loading = false;
//       state.success = true; // Set berhasil setelah registrasi
//       state.error = null;
//     },
//     registerFailure: (state, action) => {
//       state.loading = false;
//       state.success = false; // Reset status berhasil
//       state.error = action.payload; // Simpan error jika terjadi
//     },
//     resetRegister: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null; // Reset state registrasi
//     },
//   },
// });

// // const loginSlice = createSlice({
// //   name: "login",
// //   initialState: initialLoginState,
// //   reducers: {
// //     setCredentials: (state, action) => {
// //       state.uid = action.payload.uid; // Simpan UID
// //       state.token = action.payload.token; // Simpan token
// //       state.user = action.payload.user; // Simpan data user
// //       state.role = action.payload.role; // Simpan role
// //       state.loading = false;
// //       state.error = null;
// //     },

// //     setUser: (state, action) => {
// //       state.user = action.payload; // Simpan data user
// //     },
// //     loginStart: (state) => {
// //       state.loading = true;
// //       state.error = null;
// //     },
// //     loginSuccess: (state, action) => {
// //       state.loading = false;
// //       state.user = action.payload.user; // Simpan data user
// //       state.uid = action.payload.uid; // Simpan UID
// //       state.token = action.payload.token; // Simpan token
// //       state.role = action.payload.role; // Simpan role
// //       state.error = null;
// //     },
// //     loginFailure: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload; // Simpan error jika terjadi
// //     },
// //     logout: (state) => {
// //       state.user = null;
// //       state.uid = null; // Reset UID saat logout
// //       state.token = null; // Reset token saat logout
// //       state.role = null; // Reset role saat logout
// //       state.loading = false;
// //       state.error = null;
// //     },
// //   },
// // });

// const emailSlice = createSlice({
//   name: "email",
//   initialState: initialEmailState,
//   reducers: {
//     sendEmailStart: (state) => {
//       state.sending = true;
//       state.success = false;
//       state.error = null;
//     },
//     sendEmailSuccess: (state) => {
//       state.sending = false;
//       state.success = true;
//       state.error = null;
//     },
//     sendEmailFailure: (state, action) => {
//       state.sending = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//   },
// });

// const initialResetPasswordState = {
//   resetting: false,
//   success: false,
//   error: null,
// };

// const resetPasswordSlice = createSlice({
//   name: "resetPassword",
//   initialState: initialResetPasswordState,
//   reducers: {
//     resetPasswordStart: (state) => {
//       state.resetting = true;
//       state.success = false;
//       state.error = null;
//     },
//     resetPasswordSuccess: (state) => {
//       state.resetting = false;
//       state.success = true;
//       state.error = null;
//     },
//     resetPasswordFailure: (state, action) => {
//       state.resetting = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//   },
// });

// const verifyEmailSlice = createSlice({
//   name: "email",
//   initialState: initialVerifyEmailState,
//   reducers: {
//     verifyEmailStart: (state) => {
//       state.sending = true;
//       state.success = false;
//       state.error = null;
//     },
//     verifyEmailSuccess: (state) => {
//       state.sending = false;
//       state.success = true;
//       state.error = null;
//     },
//     verifyEmailFailure: (state, action) => {
//       state.sending = false;
//       state.success = false;
//       state.error = action.payload;
//     },
//   },
// });

// // Auth Login
// // export const { setCredentials, setUser, loginStart, loginSuccess, loginFailure, logout } =
// //   loginSlice.actions;
// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   setUser,
//   logout,
//   registerStart,
//   registerSuccess,
//   registerFailure,
//   resetRegister,
// } = authSlice.actions;

// // Reset Password
// export const { resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } =
//   resetPasswordSlice.actions;

// // Email
// export const { sendEmailStart, sendEmailSuccess, sendEmailFailure } = emailSlice.actions;

// // Verify Email
// export const { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure } =
//   verifyEmailSlice.actions;

// // Profile

// // Export reducer untuk digunakan di store
// export const authReducers = authSlice.reducer;
// export const emailReducer = emailSlice.reducer;
// export const resetPasswordReducer = resetPasswordSlice.reducer;
// export const verifyEmailReducer = verifyEmailSlice.reducer;

// // // Selektor untuk mendapatkan UID, Token, dan Role
// // export const selectUid = (state) => state.login.uid;
// // export const selectToken = (state) => state.login.token;
// // export const selectRole = (state) => state.login.role; // Selektor untuk role
// export const selectUid = (state) => state.auth.uid;
// export const selectToken = (state) => state.auth.token;
// export const selectRole = (state) => state.auth.role;

import { createSlice } from "@reduxjs/toolkit";

// Inisialisasi state awal
const initialAuthState = {
  user: null,
  uid: null, // Menyimpan UID
  token: null, // Menyimpan token
  role: null, // Menyimpan role
  loading: false,
  error: null,
  success: false, // Menyimpan status registrasi
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

// Slice untuk auth
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
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
      state.user = null;
      state.uid = null; // Reset UID
      state.token = null; // Reset token
      state.role = null; // Reset role
      state.loading = false;
      state.error = null;
      state.success = false; // Reset status registrasi saat logout
    },

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

// Slice untuk email
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

// Slice untuk reset password
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

// Slice untuk verifikasi email
const verifyEmailSlice = createSlice({
  name: "verifyEmail", // Mengubah nama slice untuk menghindari konflik
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

// Ekspor actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  setUser,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  resetRegister,
} = authSlice.actions;

export const { resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } =
  resetPasswordSlice.actions;

export const { sendEmailStart, sendEmailSuccess, sendEmailFailure } = emailSlice.actions;

export const { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure } =
  verifyEmailSlice.actions;

// Ekspor reducer untuk digunakan di store
export const authReducer = authSlice.reducer;
export const emailReducer = emailSlice.reducer;
export const resetPasswordReducer = resetPasswordSlice.reducer;
export const verifyEmailReducer = verifyEmailSlice.reducer;

// Selektor untuk UID, Token, dan Role
export const selectUid = (state) => state.auth.uid;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
