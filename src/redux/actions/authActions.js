import axios from "axios";
import {
  sendEmailStart,
  sendEmailSuccess,
  sendEmailFailure,
  // loginStart,
  loginSuccess,
  // loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
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

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

// export const login = (email, password, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${api_url}/auth/login`, {
//       email,
//       password,
//     });
//     const { data } = response.data;
//     const { token } = data;

//     dispatch(setToken(token));
//     toast.success("Login Berhasil");
//     setTimeout(() => {
//       navigate("/");
//     }, 1000); // Ganti nilai 1000 dengan durasi yang diinginkan (dalam milidetik)
//   } catch (error) {
//     if (error.response) {
//       if (error.response.status === 403) {
//         toast.error("Email atau Password Anda salah. Silahkan coba lagi.");
//       } else if (error.response.status === 404) {
//         toast.error("Email tidak terdaftar. Silakan cek kembali email Anda.");
//       } else {
//         toast.error("Login gagal. Silakan coba lagi nanti.");
//       }
//     } else {
//       toast.error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
//     }
//   }
// };

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    // Memvalidasi input
    if (!email || !password) {
      toast.error("Email dan Password harus diisi.");
      return;
    }

    // Melakukan permintaan login
    const response = await axios.post(`${api_url}auth/login`, {
      email,
      password,
    });

    const { data } = response.data;
    const { token, user, role } = data; // Hanya menyimpan token, user, dan role

    // Menyimpan token di cookies (4 jam)
    Cookies.set("token", token, { expires: 1 / 6 });

    // Dispatch tindakan untuk menyimpan token dan user di Redux
    dispatch(loginSuccess({ token, user, role }));

    toast.success("Login Berhasil");

    // Navigasi ke halaman utama dengan delay
    setTimeout(() => {
      navigate("/profile");
    }, 1000); // Durasi delay 1 detik
  } catch (error) {
    // Penanganan error yang lebih spesifik
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

// login Cookies
// export const login = (email, password, navigate) => async (dispatch) => {
//   dispatch(loginStart()); // Memulai proses login
//   console.log("Proses login dimulai..."); // Console log untuk proses login

//   // Memvalidasi input
//   if (!email || !password) {
//     console.log("Email atau Password tidak diisi."); // Console log untuk validasi
//     dispatch(loginFailure("Email dan Password harus diisi."));
//     return;
//   }

//   try {
//     // Melakukan permintaan login
//     const response = await axios.post(`${api_url}auth/login`, { email, password });
//     console.log("Respons dari server:", response.data); // Console log untuk respons

//     const { success, message, data } = response.data;
//     console.log("Respons dari server:", response.data); // Log respons

//     if (success) {
//       const { uid, token, user, role } = data; // Ambil data UID, token, user, dan role dari respons
//       console.log("Login berhasil, data pengguna:", { uid, token, user, role }); // Console log untuk data pengguna

//       // Menyimpan token di cookies
//       Cookies.set("token", token, { expires: 1 / 6 }); // Token berlaku selama 4 jam (1/6 hari)

//       dispatch(setCredentials({ uid, token, user, role })); // Menyimpan UID, token, user, dan role
//       dispatch(loginSuccess({ user, uid, token, role })); // Dispatch login success
//       navigate("/"); // Navigasi ke halaman utama
//     } else {
//       console.log("Login gagal:", message); // Console log untuk pesan kesalahan
//       dispatch(loginFailure(message || "Login gagal.")); // Dispatch jika login gagal
//     }
//   } catch (error) {
//     // Penanganan error lebih spesifik
//     const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat login.";
//     console.log("Error saat login:", errorMessage); // Console log untuk error
//     dispatch(loginFailure(errorMessage)); // Dispatch error
//   }
// };

// export const login = (email, password, navigate) => async (dispatch) => {
//   dispatch(loginStart()); // Memulai proses login
//   console.log("Proses login dimulai..."); // Console log untuk proses login

//   try {
//     // Memvalidasi input
//     if (!email || !password) {
//       console.log("Email atau Password tidak diisi."); // Console log untuk validasi
//       dispatch(loginFailure("Email dan Password harus diisi."));
//       return;
//     }

//     // Melakukan permintaan login
//     const response = await axios.post(`${api_url}auth/login`, { email, password });
//     console.log("Respons dari server:", response.data); // Console log untuk respons

//     const { success, message, data } = response.data;
//     console.log("Respons dari server:", response.data); // Log respons

//     if (success) {
//       const { uid, token, user, role } = data; // Ambil data UID, token, user, dan role dari respons
//       console.log("Login berhasil, data pengguna:", { uid, token, user, role }); // Console log untuk data pengguna

//       dispatch(setCredentials({ uid, token, user, role })); // Menyimpan UID, token, user, dan role
//       dispatch(loginSuccess({ user, uid, token, role })); // Dispatch login success
//       navigate("/"); // Navigasi ke halaman utama
//     } else {
//       console.log("Login gagal:", message); // Console log untuk pesan kesalahan
//       dispatch(loginFailure(message || "Login gagal.")); // Dispatch jika login gagal
//     }
//   } catch (error) {
//     // Penanganan error lebih spesifik
//     const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat login.";
//     console.log("Error saat login:", errorMessage); // Console log untuk error
//     dispatch(loginFailure(errorMessage)); // Dispatch error
//   }
// };

// Register action
export const register =
  (email, password, fullName, phoneNumber, country, city, tanggalLahir, navigate) =>
  async (dispatch) => {
    dispatch(registerStart()); // Memulai proses registrasi

    try {
      const response = await axios.post(`${api_url}auth/register`, {
        email,
        password,
        fullName,
        phoneNumber,
        country,
        city,
        tanggalLahir,
      });

      if (response.status === 201) {
        dispatch(registerSuccess()); // Dispatch jika registrasi berhasil
        toast.success("Pendaftaran Berhasil!"); // Notifikasi berhasil
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

// export const getMe = () => async (dispatch, getState) => {
//   const { auth } = getState(); // Pastikan ini mengakses state auth dengan benar
//   const { token } = auth || {}; // Pastikan token adalah null jika auth tidak ada

//   if (!token) {
//     // console.error("Token tidak tersedia");
//     return; // Hentikan jika token tidak ada
//   }
//   try {
//     const { token, uid } = getState().auth;

//     if (!token || !uid) {
//       throw new Error("Token atau UID tidak tersedia.");
//     }

//     const response = await axios.get(`${api_url}auth/profile/${uid}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const { success, data } = response.data;

//     if (success) {
//       dispatch(setUser(data)); // Dispatch untuk menyimpan data user
//     } else {
//       dispatch(logout()); // Logout jika tidak berhasil
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     dispatch(logout()); // Logout jika terjadi kesalahan
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

//
// export const getMe =
//   (navigate, navigatePathSuccess, navigatePathError) => async (dispatch, getState) => {
//     try {
//       let { token, user } = getState().auth;
//       console.log("Token berikut:", token);
//       console.log("UID berikut:", user);

//       // Cek apakah token valid
//       if (!token || (user && user.uid)) {
//         // Jika tidak ada token atau user sudah ada, tidak perlu mengambil data lagi
//         return;
//       }

//       const response = await axios.get(`${user.uid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const { data } = response.data;
//       // const { user } = data;

//       // Dispatch data pengguna yang diambil
//       dispatch(setUser(data));

//       // Jika sukses, arahkan ke halaman yang ditentukan
//       if (navigatePathSuccess) navigate(navigatePathSuccess);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.status === 401) {
//           dispatch(logout());
//         }
//         if (navigatePathError) navigate(navigatePathError);
//       }
//       console.error("Error fetching user data:", error);
//       alert(error?.message);
//     }
//   };

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
      // "http://localhost:6969/auth/verify-email",
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

export const getMe = () => async (dispatch) => {
  try {
    dispatch(getMeStart());

    // Ambil token dari cookie
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
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
    toast.error(error.message || "Terjadi kesalahan saat mengambil data pengguna.");
  }
};

export const updateProfile = (userData, navigate) => async (dispatch) => {
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
    navigate("/profile"); 
  } catch (error) {
    dispatch(updateProfileFailure(error.response?.data?.message || "Gagal memperbarui profil."));
    toast.error(error.message || "Terjadi kesalahan saat memperbarui profil."); // Notifikasi gagal
  }
};

export const changePassword = (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
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
          'Authorization': `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
      }
    );

    if (response.status === 200) {
      dispatch(changePasswordSuccess());
      toast.success("Password berhasil diubah!");
    } else {
      throw new Error(response.data.message || "Gagal mengubah password.");
    }
  } catch (error) {
    dispatch(changePasswordFailure(error.message || "Terjadi kesalahan saat mengubah password."));
    toast.error(error.message || "Terjadi kesalahan saat mengubah password.");
  }
};