const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchStats = () => async (dispatch) => {
  dispatch({ type: "FETCH_STATS_REQUEST" });
  try {
    const response = await fetch(`${apiUrl}transaction/`); // Menggunakan apiUrl untuk mendapatkan stats
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch({ type: "FETCH_STATS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_STATS_FAILURE", payload: error.message });
  }
};


export const fetchuser = () => async (dispatch) => {
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
  

  export const fetchkategori = () => async (dispatch) => {
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

export const fetchPayments = () => async (dispatch) => {
  dispatch({ type: "FETCH_PAYMENTS_REQUEST" });
  try {
    const response = await fetch(`${apiUrl}transaction/`); // Menggunakan apiUrl untuk mendapatkan payment status
    if (!response.ok) {
      throw new Error("Network response was not ok");
      
    }
    const data = await response.json();

    dispatch({ type: "FETCH_PAYMENTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_PAYMENTS_FAILURE", payload: error.message });
  }
};




