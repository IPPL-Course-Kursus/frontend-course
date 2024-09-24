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

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setToken, setUser } from "../slices/authSlice";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

// Fungsi login
export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    // Dispatch token dan data user ke Redux
    dispatch(setToken(token));
    dispatch(setUser({ email: userCredential.user.email, uid: userCredential.user.uid }));

    toast.success("Login berhasil");
    navigate("/");
  } catch (error) {
    console.error("Login error:", error.message);
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
