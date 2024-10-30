import axios from 'axios';
import { getCookie } from 'cookies-next';
import { certificateRequest, certificateSuccess, certificateFailure } from '../reducers/certificateReducers';

const apiUrl = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchCertificate = (courseUserId) => async (dispatch) => {
  try {
    dispatch(certificateRequest());
    const token = getCookie('token');
    const response = await axios.get(`${apiUrl}certificate/${courseUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Dispatch success with response data
    dispatch(certificateSuccess(response.data));
  } catch (error) {
    dispatch(certificateFailure(error.message));
  }
};

