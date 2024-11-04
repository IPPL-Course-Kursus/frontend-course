import axios from 'axios';
import { getCookie } from 'cookies-next';
import { mulaiKelasRequest, mulaiKelasSuccess, mulaiKelasFailure, runCodeSuccess } from '../reducers/mulaiKelasReducers';


const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchMulaiKelas = (courseId) => async (dispatch) => {
  try {
    dispatch(mulaiKelasRequest());
    const token = getCookie('token');
    const response = await axios.get(`${api_url}course-user/detail/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for courseStatus and contentFinish in response data
    const { courseStatus, contentFinish } = response.data;

    // Dispatch success with updated data
    dispatch(mulaiKelasSuccess({ ...response.data, courseStatus, contentFinish }));
  } catch (error) {
    dispatch(mulaiKelasFailure(error.message));
  }
};

export const updateContentProgress = (courseUserId, contentId) => async (dispatch) => {
  try {
    dispatch(mulaiKelasRequest());
    const token = getCookie('token');
    await axios.put(`${api_url}course-user/${courseUserId}/progress/content/${contentId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Fetch updated course data after progress update
    dispatch(fetchMulaiKelas(courseUserId));
  } catch (error) {
    dispatch(mulaiKelasFailure(error.message));
  }
};

export const runCode = (language, sourceCode) => async (dispatch) => {
  try {
      dispatch(mulaiKelasRequest());
      const response = await axios.post(`${api_url}compiler/compile`, {
          language,
          sourceCode,
      });
      console.log("Respons dari server:", response.data);  // untuk debug
      dispatch(runCodeSuccess({ output: response.data.run.stdout }));

      // // Tambahkan delay sebelum mereset output (misalnya 5 detik)
      // setTimeout(() => {
      //     dispatch(resetOutput());
      // }, 5000); // Durasi delay dapat diubah sesuai kebutuhan
  } catch (error) {
      console.log("Error response:", error.response?.data || error.message);
      dispatch(mulaiKelasFailure(error.message));
  }
};

