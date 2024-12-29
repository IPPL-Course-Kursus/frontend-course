import axios from "axios";
import {
  setInstructors,
  setLoading,
  setError,
  clearError,
} from "../reducers/datainstructorReducers"; // Pastikan jalur ini benar
import { getCookie } from "cookies-next";
import { Form } from "react-router-dom";
import toast from "react-hot-toast";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS; // pastikan sudah di .env

export const getAllInstructors = () => async (dispatch) => {
  dispatch(setLoading(true)); // Mengatur state loading menjadi true
  dispatch(clearError()); // Menghapus error jika ada error sebelumnya

  const token = getCookie("token"); // Mengambil token dari cookie
  if (!token) {
    dispatch(setError("User not authenticated")); // Jika token tidak ada, set error
    dispatch(setLoading(false)); // Set loading menjadi false
    return;
  }

  try {
    // Request data instruktur dari API
    const response = await axios.get(`${api_url}auth/all-instruktur`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const instructors = response.data.data; // Ambil data instruktur dari respons
    dispatch(setInstructors(instructors)); // Set data instruktur ke store
  } catch (error) {
    // Set error ke state jika terjadi error
    dispatch(setError(error.message || "Error fetching instructors"));
  } finally {
    // Mengubah loading menjadi false setelah selesai
    dispatch(setLoading(false));
  }
};

export const addInstructor = (newInstructor) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");

    // Data yang akan dikirim dalam format JSON
    const requestData = {
      fullName: newInstructor.fullName,
      city: newInstructor.city,
      phoneNumber: newInstructor.phoneNumber,
      tanggalLahir: newInstructor.tanggalLahir,
      email: newInstructor.email,
      password: newInstructor.password,
    };

    const response = await axios.post(
      `${api_url}auth/register-instruktur/`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Mengirim data sebagai JSON
        },
      }
    );

    const addedInstructor = response.data.data;
    toast.success("Instruktur berhasil ditambahkan", {
                    style: {
                      borderRadius: "8px",
                      background: "#4CAF50",
                      color: "#fff",
                    },
                  });
    dispatch({
      type: "ADD_INSTRUCTOR",
      payload: addedInstructor,
    });
    
    
  } catch (error) {
    console.error("Error response:", error.response?.data); // Log error dari server
    let errorMessage = error.response.data && error.response.data.message;
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;

      // Cari error email secara eksplisit
      const emailError = errors.find(
        (err) =>
          err.param === "email" || err.message.toLowerCase().includes("email")
      );

      // Jika error email ditemukan, pakai pesan custom
      if (emailError) {
        errorMessage = "Gagal menambahkan instruktur. Email telah digunakan.";
      } else {
        errorMessage = errors.map((err) => err.message).join(", ");
      }
    }

    // Paksa tampilkan pesan custom tanpa backend override
    toast.dismiss(); // Hapus toast lain yang mungkin aktif
    toast.error(errorMessage, {
      style: {
        borderRadius: "8px",
        background: "#FF3333",
        color: "#fff",
      },
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteInstructor = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");

    const response = await axios.delete(
      `${api_url}auth/delete-instruktur/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Jika berhasil
    dispatch({
      type: "DELETE_INSTRUCTOR",
      payload: id,
    });

    // Tampilkan toast sukses
    toast.dismiss();
    toast.success("Instruktur berhasil dihapus", {
      style: {
        borderRadius: "8px",
        background: "#4BB543",
        color: "#fff",
      },
    });
  } catch (error) {
    // Tangkap pesan error dari backend
    const errorMessage =
      error.response?.data?.message ||
      "Gagal menghapus instruktur. Silakan coba lagi.";

    // Tampilkan pesan error melalui toast
    toast.dismiss();
    toast.error(errorMessage, {
      style: {
        borderRadius: "8px",
        background: "#FF3333",
        color: "#fff",
      },
    });

    // Dispatch error untuk debugging atau logging di reducer
    dispatch(setError(errorMessage));
    console.error("Error deleting instructor:", errorMessage);
  } finally {
    // Set loading menjadi false
    dispatch(setLoading(false));
  }
};

