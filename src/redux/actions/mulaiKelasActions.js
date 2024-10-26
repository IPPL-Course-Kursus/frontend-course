import axios from 'axios';
import { getCookie } from 'cookies-next';
import { mulaiKelasRequest, mulaiKelasSuccess, mulaiKelasFailure } from '../reducers/mulaiKelasReducers';


const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchMulaiKelas = (courseId) => async (dispatch) => {
  try {
    dispatch(mulaiKelasRequest()); 
    const token = getCookie('token'); 
    const response = await axios.get(`${apiUrl}course-user/detail/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(mulaiKelasSuccess(response.data)); 
  } catch (error) {
    dispatch(mulaiKelasFailure(error.message));
  }
};
