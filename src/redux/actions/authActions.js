import axios from "axios";
import {
  sendEmailStart,
  sendEmailSuccess,
  sendEmailFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  setUser,
  setToken,

  // logout,
  // setUser,
  // setCredentials,
} from "../reducers/authReducers";
import { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure } from "../reducers/authReducers";
import {
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../reducers/authReducers";
import {
  getMeStart,
  getMeSuccess,
  getMeFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} from "../reducers/authReducers";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
// import { setToken } from "../reducers/LoginReducer";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    if (!email || !password) {
      toast.error("Email dan Password harus diisi.");
      return;
    }

    const response = await axios.post(`${api_url}auth/login`, {
      email,
      password,
    });

    // Mengakses data dari respons
    const { success, data } = response.data;
    const { token, role } = data;

    if (success) {
      // Menyimpan token di Redux
      dispatch(setToken(token));

      toast.success("Login Berhasil");

      // Navigasi berdasarkan role
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "User") {
        navigate("/");
      } else if (role === "Instruktur") {
        navigate("/inst/dashboard");
      } else {
        console.error("Role tidak dikenali:", role);
      }
    } else {
      toast.error("Login gagal. Silakan coba lagi nanti.");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        toast.error("Email atau Password Anda salah. Silahkan coba lagi.");
      } else if (error.response.status === 404) {
        toast.error("Email tidak terdaftar. Silakan cek kembali email Anda.");
      } else {
        toast.error("Login gagal. Silakan coba lagi nanti.");
      }
    } else {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
    }
  }
};

// Register action
export const register =
  (email, password, fullName, phoneNumber, city, tanggalLahir, navigate) => async (dispatch) => {
    dispatch(registerStart()); // Memulai proses registrasi

    try {
      const response = await axios.post(`${api_url}auth/register`, {
        email,
        password,
        fullName,
        phoneNumber,
        city,
        tanggalLahir,
      });

      if (response.status === 201) {
        dispatch(registerSuccess()); // Dispatch jika registrasi berhasil
        toast.success("Pendaftaran Berhasil, silahkan check email untuk melakukan verified!"); // Notifikasi berhasil
        navigate("/login"); // Navigasi ke halaman login
      } else {
        throw new Error("Registrasi gagal.");
      }
    } catch (error) {
      dispatch(
        registerFailure(error.response?.data?.message || "Terjadi kesalahan saat registrasi.")
      ); // Dispatch error
      toast.error(error.message || "Terjadi kesalahan saat registrasi."); // Notifikasi gagal
    }
  };

export const getMe = () => async (dispatch) => {
  try {
    dispatch(getMeStart());

    // Ambil token dari cookie
    const token = Cookies.get("token");

    // Jika token tidak ada, jangan lakukan request dan akhiri fungsi
    if (!token) {
      // console.log("Token tidak ditemukan. Pengguna belum login.");
      // Kamu bisa memutuskan apa yang dilakukan di sini, misalnya redirect ke login
      return;
    }

    // Lakukan permintaan untuk mendapatkan data pengguna dari API
    const response = await axios.get(`${api_url}auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = response.data;
    console.log("ini data profile:", response.data);

    // Dispatch hasil success dengan data pengguna
    dispatch(getMeSuccess(data));
  } catch (error) {
    dispatch(getMeFailure(error.response?.data?.message || "Gagal mengambil data pengguna."));
    // toast.error(error.message || "Terjadi kesalahan saat mengambil data pengguna.");
  }
};

export const logout = () => (dispatch) => {
  Cookies.remove("token"); // Menghapus cookie token
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const sendEmail = (email) => async (dispatch) => {
  try {
    dispatch(sendEmailStart());

    const response = await axios.post(`${api_url}auth/forgot-password`, { email });

    if (response.status === 200) {
      dispatch(sendEmailSuccess());
    } else {
      throw new Error("Gagal mengirim email");
    }
  } catch (error) {
    // Cek apakah error memiliki status response 404
    const errorMessage =
      error.response && error.response.status === 404
        ? { status: 404, message: "Email tidak ditemukan" }
        : { message: error.message };
    dispatch(sendEmailFailure(errorMessage));
  }
};

export const resetPassword = (oobCode, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());

    const response = await axios.post(
      `${api_url}auth/reset-password`,

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

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileStart()); // Mulai proses update

    // Ambil token dari cookie
    const token = Cookies.get("token");

    const response = await axios.put(`${api_url}auth/update-profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = response.data;

    // Dispatch hasil success dengan data pengguna yang diperbarui
    dispatch(updateProfileSuccess(data));
    toast.success("Profil berhasil diperbarui!"); // Notifikasi berhasil

    // Navigasi ke halaman profil atau halaman lain jika diperlukan
    // navigate("/profile");
  } catch (error) {
    dispatch(updateProfileFailure(error.response?.data?.message || "Gagal memperbarui profil."));
    toast.error(error.message || "Terjadi kesalahan saat memperbarui profil."); // Notifikasi gagal
  }
};

export const changePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(changePasswordStart());

      const token = Cookies.get("token");

      // Mengirim permintaan untuk mengubah password dengan token di header
      const response = await axios.post(
        `${api_url}auth/change-password`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
          },
        }
      );

      if (response.status === 200) {
        dispatch(changePasswordSuccess());
        toast.success("Password berhasil diubah!");
      }
    } catch (error) {
      dispatch(changePasswordFailure());

      // Handle specific error for old password mismatch (400 Bad Request)
      if (error.response && error.response.status === 400) {
        toast.error("Password lama salah.");
      } else {
        toast.error("Terjadi kesalahan saat mengubah password.");
      }
    }
  };
