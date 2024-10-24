import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Import js-cookie

const initialState = {
  token: Cookies.get("token") || null, // Ambil token dari cookies
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        Cookies.set("token", action.payload, { expires: 1 / 6 }); // Simpan token di cookies (4 jam)
      } else {
        Cookies.remove("token"); // Hapus token dari cookies
      }
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
