import axios from "axios";
import { setTotalFreeClasses, setTotalInstructors, setTotalPremiumClasses, setTotalUsers } from "../reducers/InstrukturReducers";

const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchTotalUsers = () => async (dispatch) => {
    try {
      const response = await axios.get(`${api_url}/auth/count-by-role`, {
        headers: { Authorization: `Bearer ${"token"}` },
      });
      dispatch(setTotalUsers(response.data.data.userCount));
    } catch (error) {
      console.error("Error fetching total users:", error.message);
    }
  };
  
  // Ulangi untuk action lainnya
  export const fetchTotalInstructors = () => async (dispatch) => {
    try {
      const response = await axios.get(`${api_url}/auth/count-by-role`, {
        headers: { Authorization: `Bearer ${"token"}` },
      });
      dispatch(setTotalInstructors(response.data.data.instrukturCount));
    } catch (error) {
      console.error("Error fetching total instructors:", error.message);
    }
  };
  
  export const fetchTotalFreeClasses = () => async (dispatch) => {
    try {
      const response = await axios.get(`${api_url}/course/free`, {
        headers: { Authorization: `Bearer ${"token"}` },
      });
      dispatch(setTotalFreeClasses(response.data.length));
    } catch (error) {
      console.error("Error fetching total free classes:", error.message);
    }
  };
  
  export const fetchTotalPremiumClasses = () => async (dispatch) => {
    try {
      const response = await axios.get(`${api_url}/course/premium`, {
        headers: { Authorization: `Bearer ${"token"}` },
      });
      dispatch(setTotalPremiumClasses(response.data.length));
    } catch (error) {
      console.error("Error fetching total premium classes:", error.message);
    }
  };
