import axios from "axios";
import { setCategory, setLevel, setType} from "../reducers/categoryReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}category/`);

    const data = response.data;
    // console.log("ini kategori : ", response.data);

    dispatch(setCategory(data));
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

export const getLevel = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}course-level/`);


    const data = response.data;
    // console.log("ini kategori : ", response.data);

    dispatch(setLevel(data));
  } catch (error) {
    alert(error.message);
  }
};
export const getType = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}type-course/`);
    const data = response.data;

    if (data.success) { // Pastikan respons sukses
      dispatch(setType(data.data)); // Ambil data dari objek
    } else {
      dispatch(setType([])); // Set ke array kosong jika sukses false
    }
  } catch (error) {
    console.error("Failed to fetch course types:", error);
    alert(error.message);
    dispatch(setType([])); // Set ke array kosong jika terjadi error
  }
};


