// import axios from "axios";
// import { setToken, setUser } from "../reducers/AuthReducers";
// import { toast } from "react-toastify";

// const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// export const login = (email, password, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${api_url}auth/login`, {
//       email,
//       password,
//     });

//     const { success, message, data } = response.data;
//     console.log(response.data);

//     if (success) {
//       const { token, role } = data;
//       dispatch(setToken(token));
//       dispatch(setUser(role));

//       toast.success("Login berhasil");
//       navigate("/"); // Navigate to the home page or wherever after login
//     } else {
//       toast.error(message);
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     toast.error("Terjadi kesalahan saat login.");
//   }
// };

// export const register =
//   (email, password, fullName, phoneNumber, country, city, tanggalLahir, navigate) => async () => {
//     try {
//       const response = await axios.post(`${api_url}auth/register`, {
//         email,
//         password,
//         fullName,
//         phoneNumber,
//         country,
//         city,
//         tanggalLahir,
//       });
//       console.log("Response from register:", response);

//       if (response.status === 201) {
//         const { email } = response.data.user;
//         localStorage.setItem("email", email);
//         toast.success("Pendaftaran Berhasil");
//       }
//       //   setTimeout(() => {
//       navigate("/login");
//       //   }, 1000);
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Terjadi kesalahan saat login.");
//     }
//   };

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // , getAuth
} from "firebase/auth";
import { logout, setToken, setUser } from "../slices/authSlice";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;
// Fungsi login
// export const login = (email, password, navigate) => async (dispatch) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const token = await userCredential.user.getIdToken();

//     // Dispatch token dan data user ke Redux
//     dispatch(setToken(token));
//     dispatch(setUser({ email: userCredential.user.email, uid: userCredential.user.uid }));

//     toast.success("Login berhasil");
//     navigate("/");
//   } catch (error) {
//     console.error("Login error:", error.message);
//     toast.error("Terjadi kesalahan saat login.");
//   }
// };

// Login Fix
// export const login = (email, password, navigate) => async (dispatch) => {
//   if (!email || !password) {
//     toast.error("Email dan password tidak boleh kosong.");
//     return;
//   }

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const token = await userCredential.user.getIdToken();

//     // Dispatch token dan data user ke Redux
//     dispatch(setToken(token));
//     dispatch(setUser({ email: userCredential.user.email, uid: userCredential.user.uid }));

//     toast.success("Login berhasil");
//     navigate("/");
//   } catch (error) {
//     console.error("Login error:", error); // Cetak kesalahan lengkap untuk diagnosis
//     toast.error("Terjadi kesalahan saat login.");
//   }
// };

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

// export const getProfile =
//   (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
//     const { token, user } = getState().auth;

//     if (!user) {
//       console.error("User is not logged in.");
//       if (navigatePathError) navigate(navigatePathError);
//       return; // Hentikan eksekusi jika user null
//     }

//     try {
//       const response = await axios.get(`${api_url}api/users/me?uid=${user.uid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = response.data;

//       dispatch(setUser(data));
//       if (navigatePathSuccess) navigate(navigatePathSuccess);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response.status === 401) {
//           dispatch(logout());
//         }
//         if (navigatePathError) navigate(navigatePathError);
//         return;
//       }

//       alert(error?.message);
//     }
//   };

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
