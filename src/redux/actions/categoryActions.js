import axios from "axios";
import { setCategory } from "../reducers/categoryReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}category/`);

    const data = response.data;
    console.log("ini kategori : ", response.data);

    dispatch(setCategory(data));
  } catch (error) {
    alert(error.message);
  }
};
