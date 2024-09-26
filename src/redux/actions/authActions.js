import axios from "axios";
import { sendEmailStart, sendEmailSuccess, sendEmailFailure, logout } from "../slices/authSlice";
import { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure } from "../slices/authSlice";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../slices/authSlice";
import { setToken, setUser } from "../slices/authSlice";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
// import { createAsyncThunk } from "@reduxjs/toolkit";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// Login Fix

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    // Masuk dengan Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Dapatkan token
    const token = await userCredential.user.getIdToken();

    // Dispatch token dan data user ke Redux
    dispatch(setToken(token));
    dispatch(setUser({ email: userCredential.user.email, uid: userCredential.user.uid }));

    // Navigasi ke halaman utama
    navigate("/");

    // Notifikasi login berhasil
    toast.success("Login berhasil!");
  } catch (error) {
    console.error("Login error:", error.message);
    toast.error("Terjadi kesalahan saat login.");
  }
};
export const register =
  (email, password, fullName, phoneNumber, country, city, tanggalLahir, navigate) =>
  async (dispatch) => {
    try {
      // Daftarkan pengguna baru menggunakan Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Dapatkan token dari user yang baru terdaftar
      const token = await userCredential.user.getIdToken();

      // Dispatch token dan data user ke Redux
      dispatch(setToken(token));
      dispatch(
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          fullName: fullName, // Bisa menyimpan nama pengguna dari input form register
          phoneNumber,
          country,
          city,
          tanggalLahir,
        })
      );

      // Notifikasi registrasi berhasil
      toast.success("Registrasi berhasil! Silakan login.");

      // Arahkan ke halaman login setelah registrasi berhasil
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error.message);
      toast.error("Terjadi kesalahan saat registrasi.");
    }
  };

export const getMe =
  (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
    try {
      let { token, user } = getState().auth;
      console.log("Token berikut:", token);
      console.log("UID berikut:", user);

      // Cek apakah token valid
      if (!token || (user && user.uid)) {
        // Jika tidak ada token atau user sudah ada, tidak perlu mengambil data lagi
        return;
      }

      const response = await axios.get(`${user.uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      // const { user } = data;

      // Dispatch data pengguna yang diambil
      dispatch(setUser(data));

      // Jika sukses, arahkan ke halaman yang ditentukan
      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
        if (navigatePathError) navigate(navigatePathError);
      }
      console.error("Error fetching user data:", error);
      alert(error?.message);
    }
  };

export const sendEmail = (email) => async (dispatch) => {
  try {
    dispatch(sendEmailStart());

    const response = await axios.post(
      `${api_url}auth/forgot-password`,
      // "http://localhost:6969/auth/forgot-password"
      { email }
    );

    if (response.status === 200) {
      dispatch(sendEmailSuccess());
    } else {
      throw new Error("Gagal mengirim email");
    }
  } catch (error) {
    dispatch(sendEmailFailure(error.message));
  }
};

export const resetPassword = (oobCode, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());

    const response = await axios.post(
      `${api_url}auth/reset-password`,
      // "http://localhost:6969/auth/reset-password"
      {
        oobCode,
        newPassword: password,
        confirmPassword: confirmPassword,
      }
    );
    console.log(response);

    if (response.status === 200) {
      dispatch(resetPasswordSuccess());
      toast.success("Password berhasil diubah. Silakan login dengan password baru.");
    } else {
      throw new Error(response.data.message || "Gagal mereset password.");
    }
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
    toast.error(error.message || "Terjadi kesalahan saat mereset password.");
  }
};

export const verifyEmail = () => async (dispatch) => {
  try {
    dispatch(verifyEmailStart()); // Memulai proses verifikasi email

    // Ambil oobCode dari localStorage
    const oobCode = localStorage.getItem("oobCode");

    if (!oobCode) {
      throw new Error("oobCode tidak ditemukan.");
    }

    // Mengirim permintaan verifikasi email ke backend
    const response = await axios.post(
      `${api_url}auth/verify-email`,
      // "http://localhost:6969/auth/verify-email"
      { oobCode }
    );

    if (response.status === 200) {
      dispatch(verifyEmailSuccess()); // Dispatch jika verifikasi berhasil
    } else {
      throw new Error("Gagal memverifikasi email.");
    }
  } catch (error) {
    dispatch(verifyEmailFailure(error.message)); // Dispatch jika verifikasi gagal
  }
};