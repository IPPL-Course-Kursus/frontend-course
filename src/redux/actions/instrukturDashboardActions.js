const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

import { getCookie } from "cookies-next";

export const instfetchstats = () => async (dispatch) => {
  dispatch({ type: "FETCH_stats_REQUEST" });
  try {
    const response = await fetch(`${apiUrl}transaction/`); // Menggunakan apiUrl untuk mendapatkan stats
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch({ type: "FETCH_stats_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_stats_FAILURE", payload: error.message });
  }
};

export const instfetchuser = () => async (dispatch) => {
  dispatch({ type: "FETCH_user_REQUEST" });
  try {
    const response = await fetch(`${apiUrl}auth/count-by-role/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // Tambahkan ini untuk melihat data dari API
    dispatch({ type: "FETCH_user_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_user_FAILURE", payload: error.message });
  }
};

export const instfetchkategori = () => async (dispatch) => {
  dispatch({ type: "FETCH_kategori_REQUEST" });
  try {
    const response = await fetch(`${apiUrl}category/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // Tambahkan ini untuk melihat data dari API
    dispatch({ type: "FETCH_kategori_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_kategori_FAILURE", payload: error.message });
  }
};

export const instfetchPayments = () => async (dispatch) => {
  dispatch({ type: "FETCH_payments_REQUEST" });
  try {
    const token = getCookie("token");
    if (!token) {
      throw new Error("Token tidak ditemukan di cookies");
    }
    const response = await fetch(
      `${apiUrl}transaction/instructor-transaction`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ); // Menggunakan apiUrl untuk mendapatkan payment status
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    console.log(response.json);
    

    dispatch({ type: "FETCH_payments_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_payments_FAILURE", payload: error.message });
  }
};
