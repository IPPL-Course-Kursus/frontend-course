import { createSlice } from "@reduxjs/toolkit";

// Inisialisasi state awal untuk auth
// const initialAuthState = {
//   user: null,
//   uid: null, // Menyimpan UID
//   token: null, // Menyimpan token
//   role: null, // Menyimpan role
//   loading: false,
//   error: null,
//   success: false, // Menyimpan status registrasi
// };

const initialAuthState = {
  user: null,
  uid: null, // Menyimpan UID
  token: null, // Menyimpan token
  role: null, // Menyimpan role
  loading: false,
  error: null,
  success: false, // Menyimpan status registrasi
};

// Fungsi pembantu untuk mengatur loading dan error
const setLoadingAndError = (state, loading, error) => {
  state.loading = loading;
  state.error = error;
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

const initialResetPasswordState = {
  resetting: false,
  success: false,
  error: null,
};

const initialGetMeState = {
  profile: null,
  profileLoading: false,
  profileError: null,
};

const initialUpdateProfileState = {
  loading: false,
  success: false,
  error: null,
  user: null,
};

const initialChangePasswordState = {
  loading: false,
  success: false,
  error: null,
};

// Slice untuk auth
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginStart: (state) => setLoadingAndError(state, true, null),
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = null;
    },
    loginFailure: (state, action) => {
      setLoadingAndError(state, false, action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.uid = null;
      state.token = null;
      state.role = null;
      setLoadingAndError(state, false, null);
      state.success = false;
    },
    registerStart: (state) => setLoadingAndError(state, true, null),
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      setLoadingAndError(state, false, action.payload);
      state.success = false;
    },
    resetRegister: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null; // Reset state registrasi
    },
    setUser: (state, action) => {
      state.user = action.payload; // Simpan data user
    },
  },
});

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuthState,
//   reducers: {
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

// Slice untuk mendapatkan profil user
const getMeSlice = createSlice({
  name: "getMe",
  initialState: initialGetMeState,
  reducers: {
    getMeStart: (state) => {
      state.profileLoading = true;
      state.profileError = null;
    },
    getMeSuccess: (state, action) => {
      state.profileLoading = false;
      state.profile = action.payload; // Simpan data profile di state
      state.profileError = null;
    },
    getMeFailure: (state, action) => {
      state.profileLoading = false;
      state.profileError = action.payload;
    },
  },
});

// Slice untuk memperbarui profil user
const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: initialUpdateProfileState,
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.success = true; // Set status berhasil
      state.error = null;
      state.user = action.payload;
      // Anda bisa menyimpan data pengguna yang diperbarui di sini jika perlu
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload; // Simpan error jika terjadi
    },
  },
});

// Slice untuk mengganti password
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: initialChangePasswordState,
  reducers: {
    changePasswordStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    changePasswordFailure: (state, action) => {
      state.loading = false;
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

export const { getMeStart, getMeSuccess, getMeFailure } = getMeSlice.actions;

export const { updateProfileStart, updateProfileSuccess, updateProfileFailure } =
  updateProfileSlice.actions;

export const { changePasswordStart, changePasswordSuccess, changePasswordFailure } =
  changePasswordSlice.actions;

// Ekspor reducer untuk digunakan di store
export const authReducer = authSlice.reducer;
export const emailReducer = emailSlice.reducer;
export const resetPasswordReducer = resetPasswordSlice.reducer;
export const verifyEmailReducer = verifyEmailSlice.reducer;
export const getMeReducer = getMeSlice.reducer;
export const updateProfileReducer = updateProfileSlice.reducer;
export const changePasswordReducer = changePasswordSlice.reducer;

// Selektor untuk UID, Token, dan Role
export const selectUid = (state) => state.auth.uid;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectProfile = (state) => state.getMe.profile;
export const selectProfileLoading = (state) => state.getMe.profileLoading;
export const selectProfileError = (state) => state.getMe.profileError;
