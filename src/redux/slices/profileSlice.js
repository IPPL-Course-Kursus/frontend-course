import { createSlice } from "@reduxjs/toolkit";
import { setUser, logout } from "../slices/authSlice"; // Sesuaikan dengan lokasi yang tepat

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(logout, (state) => {
        state.profileData = null; // Atau reset data sesuai kebutuhan
      });
  },
});

// Pastikan Anda melakukan ekspor default di sini
export default profileSlice.reducer;
