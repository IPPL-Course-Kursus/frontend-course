import axios from "axios";
import {
  setInstructors,
  setLoading,
  setError,
  clearError,
} from "../reducers/datainstructorReducers"; // Pastikan jalur ini benar
import { getCookie } from "cookies-next";

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
    dispatch({
      type: "ADD_INSTRUCTOR",
      payload: addedInstructor,
    });
  } catch (error) {
    console.error("Error response:", error.response?.data); // Log error dari server
    if (error.response?.data.errors) {
      const errorMessages = error.response.data.errors
        .map((err) => err.message)
        .join(", ");
      dispatch(setError(`Error adding instructor: ${errorMessages}`));
    } else {
      dispatch(setError(error.message || "Error adding instructor"));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateInstructor = (id, updatedInstructor) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");

    // Data yang akan dikirim dalam format JSON
    const requestData = {
      fullName: updatedInstructor.fullName,
      image: updatedInstructor.photoUrl, // Menyimpan URL gambar yang di-upload
      phoneNumber: updatedInstructor.phoneNumber,
      role: "Instruktur", // Menetapkan role sebagai "Instruktur"
      tanggalLahir: updatedInstructor.tanggalLahir,
      city: updatedInstructor.city,
      country: updatedInstructor.country,
    };

    const response = await axios.put(
      `${api_url}auth/update-instruktur/${id}`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Mengirim data sebagai JSON
        },
      }
    );

    const updatedInstructorData = response.data.data.data; // Menyesuaikan dengan struktur respons
    dispatch({
      type: "UPDATE_INSTRUCTOR",
      payload: updatedInstructorData,
    });
  } catch (error) {
    console.error("Error response:", error.response?.data); // Log error dari server
    if (error.response?.data.errors) {
      const errorMessages = error.response.data.errors
        .map((err) => err.message)
        .join(", ");
      dispatch(setError(`Error updating instructor: ${errorMessages}`));
    } else {
      dispatch(setError(error.message || "Error updating instructor"));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteInstructor = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");
    console.log("Token:", token); // Log token untuk memeriksa

    const response = await axios.delete(
      `${api_url}auth/delete-instruktur/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({
      type: "DELETE_INSTRUCTOR",
      payload: id,
    });
  } catch (error) {
    // Log detail error untuk debugging
    console.error("Error response:", error.response?.data || error.message);
    dispatch(
      setError(error.response?.data?.message || "Error deleting instructor")
    );
  } finally {
    dispatch(setLoading(false));
  }
};
