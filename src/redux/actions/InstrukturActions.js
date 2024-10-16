import axios from "axios";
import { setTotalFreeClasses, setTotalInstructors, setTotalPremiumClasses, setTotalUsers } from "../reducers/InstrukturReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchTotalUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/auth/count-by-role`);
    dispatch(setTotalUsers(response.data.data.userCount)); // Sesuaikan dengan struktur respons API
  } catch (error) {
    console.error("Error fetching total users:", error.message);
  }
};

export const fetchTotalInstructors = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/auth/count-by-role`);
    dispatch(setTotalInstructors(response.data.data.instrukturCount)); // Sesuaikan dengan struktur respons API
  } catch (error) {
    console.error("Error fetching total instructors:", error.message);
  }
};

export const fetchTotalFreeClasses = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/course/free`);
    dispatch(setTotalFreeClasses(response.data.length)); // Sesuaikan dengan struktur respons API
  } catch (error) {
    console.error("Error fetching total free classes:", error.message);
  }
};

export const fetchTotalPremiumClasses = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api_url}/course/premium`);
    dispatch(setTotalPremiumClasses(response.data.length)); // Sesuaikan dengan struktur respons API
  } catch (error) {
    console.error("Error fetching total premium classes:", error.message);
  }
};
