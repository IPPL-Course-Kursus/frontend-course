// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: localStorage.getItem("token") || null,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action) => {
//       if (action.payload) {
//         localStorage.setItem("token", action.payload);
//       } else {
//         localStorage.removeItem("token");
//       }
//       state.token = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload; // Set user data
//     },
//     logout: (state) => {
//       state.token = null; // Clear token
//       state.user = null; // Clear user data
//       localStorage.removeItem("token"); // Remove token from localStorage
//     },
//   },
// });

import { createSlice } from "@reduxjs/toolkit";

// Inisialisasi state awal
const initialState = {
  token: null,
  user: null,
};

// Membuat slice untuk auth
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

// Export actions untuk digunakan di komponen lain
export const { setToken, setUser, logout } = authSlice.actions;

// Export reducer untuk digunakan di store
export default authSlice.reducer;
