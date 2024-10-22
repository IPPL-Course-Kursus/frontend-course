import axios from "axios";
import { setInstructors, setLoading, setError, clearError } from "../reducers/datainstructorReducers";// Pastikan jalur ini benar
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
  
      // Buat FormData untuk mengirim file dan data
      const formData = new FormData();
      formData.append("name", newInstructor.name);
      
      // Hanya menambahkan foto jika ada file yang diunggah
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        formData.append("photo", fileInput.files[0]); // Pastikan nama field sesuai dengan backend
      }
  
      const response = await axios.post(`${api_url}auth/register-instruktur`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Tetap perlu jika menggunakan FormData
        },
      });
  
      const addedInstructor = response.data.data;
      dispatch({
        type: "ADD_INSTRUCTOR",
        payload: addedInstructor,
      });
    } catch (error) {
      console.error("Error response:", error.response?.data); // Log error dari server
      if (error.response?.data.errors) {
        const errorMessages = error.response.data.errors.map((err) => err.message).join(", ");
        dispatch(setError(`Error adding instructor: ${errorMessages}`));
      } else {
        dispatch(setError(error.message || "Error adding instructor"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  

// Ubah instruktur
export const updateInstructor = (id, updatedInstructor) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const token = getCookie("token");
  
      // Buat FormData untuk mengirim file dan data
      const formData = new FormData();
      formData.append("name", updatedInstructor.name);
      
      // Hanya tambahkan foto jika ada file yang baru
      if (updatedInstructor.photoUrl) {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files[0]) {
          formData.append("photo", fileInput.files[0]); // Ubah nama field jika perlu
        }
      }
  
      const response = await axios.put(`${api_url}auth/update-instruktur/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Tambahkan header ini
        },
      });
  
      const newInstructorData = response.data.data;
      dispatch({
        type: "UPDATE_INSTRUCTOR",
        payload: newInstructorData,
      });
    } catch (error) {
      console.error("Error response:", error.response?.data); // Log error dari server
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
    console.error("Error response:", error.response?.data); // Log error dari server
    dispatch(setError(error.message || "Error deleting instructor"));
  } finally {
    dispatch(setLoading(false));
  }
};
