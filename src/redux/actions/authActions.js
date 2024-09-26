import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // , getAuth
} from "firebase/auth";
import { setToken, setUser } from "../slices/authSlice";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Login Fix
export const login = (email, password, navigate) => async (dispatch) => {
  if (!email || !password) {
    toast.error("Email dan password tidak boleh kosong.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    // Dispatch token dan data user ke Redux
    dispatch(setToken(token));
    dispatch(setUser({ email: userCredential.user.email, uid: userCredential.user.uid })); // Pastikan uid di sini

    toast.success("Login berhasil");
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Terjadi kesalahan saat login.");
  }
};

// Register Fix
export const register =
  (email, password, fullName, phoneNumber, country, city, tanggalLahir, navigate) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      // Dispatch token dan data user ke Redux
      dispatch(setToken(token));
      dispatch(setUser({ email: userCredential.user.email, uid: userCredential.user.uid }));
      toast.success("Registrasi berhasil");
      navigate("/login"); // Pastikan navigate berfungsi
    } catch (error) {
      console.error("Register error:", error.message);
      toast.error("Terjadi kesalahan saat registrasi.");
    }
  };

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, user } = getState().auth;
      console.error("User is not logged in.");
      // Ganti URL ini sesuai dengan endpoint backend Anda
      const response = await axios.get(`${api_url}api/users/me?uid=${user.uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mengembalikan data user yang didapat dari response
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Something went wrong");
    }
  }
);
