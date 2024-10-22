import axios from "axios";
import {
  setInstructors,
  setLoading,
  setError,
  clearError,
} from "../reducers/datainstructorReducer"; // Pastikan jalur ini benar
import { getCookie } from "cookies-next";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS; // pastikan sudah di .env

export const getAllInstructors = () => async (dispatch) => {
  dispatch(setLoading(true));   // Mengatur state loading menjadi true
  dispatch(clearError());       // Menghapus error jika ada error sebelumnya

  const token = getCookie("token");  // Mengambil token dari cookie
  if (!token) {
    dispatch(setError("User not authenticated"));  // Jika token tidak ada, set error
    dispatch(setLoading(false));                   // Set loading menjadi false
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
    dispatch(setInstructors(instructors));  // Set data instruktur ke store
  } catch (error) {
    // Set error ke state jika terjadi error
    dispatch(setError(error.message || "Error fetching instructors"));
  } finally {
    // Mengubah loading menjadi false setelah selesai
    dispatch(setLoading(false));
  }
};


// Tambah instruktur
export const addInstructor = (newInstructor) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");
    const response = await axios.post(`${api_url}auth/register-instruktur`, newInstructor, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const addedInstructor = response.data.data;
    dispatch({
      type: "ADD_INSTRUCTOR",
      payload: addedInstructor,
    });
  } catch (error) {
    dispatch(setError(error.message || "Error adding instructor"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Ubah instruktur
export const updateInstructor = (id, updatedInstructor) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");
    const response = await axios.put(`${api_url}auth/update-instruktur/${id}`, updatedInstructor, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const newInstructorData = response.data.data;
    dispatch({
      type: "UPDATE_INSTRUCTOR",
      payload: newInstructorData,
    });
  } catch (error) {
    dispatch(setError(error.message || "Error updating instructor"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Hapus instruktur
export const deleteInstructor = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getCookie("token");
    await axios.delete(`${api_url}auth/delete-instruktur/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: "DELETE_INSTRUCTOR",
      payload: id,
    });
  } catch (error) {
    dispatch(setError(error.message || "Error deleting instructor"));
  } finally {
    dispatch(setLoading(false));
  }
};
