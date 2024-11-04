import axios from 'axios';
import { getCookie } from 'cookies-next';
import { mulaiKelasRequest, mulaiKelasSuccess, mulaiKelasFailure, runCodeSuccess } from '../reducers/mulaiKelasReducers';


const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const fetchMulaiKelas = (courseId) => async (dispatch) => {
  try {
    dispatch(mulaiKelasRequest());
    const token = getCookie('token');
    const response = await axios.get(`${apiUrl}course-user/detail/${courseId}`, {
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
    await axios.put(`${apiUrl}course-user/${courseUserId}/progress/content/${contentId}`, {}, {
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
      const response = await axios.post(`${apiUrl}compiler/compile`, {
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

export const addInterpreter = (interpreterData) => async (dispatch) => {
  try {
    const response = await axios.post(`${api_url}api/interpreters`, interpreterData);
    console.log('Added interpreter:', response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error adding interpreter:', error.response ? error.response.data : error.message);
  }
};

export const updateInterpreter = (interpreterId, interpreterData) => async (dispatch) => {
  try {
    const response = await axios.put(`${api_url}api/interpreters/${interpreterId}`, interpreterData);
    console.log(`Updated interpreter with ID ${interpreterId}:`, response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error updating interpreter:', error.response ? error.response.data : error.message);
  }
};

export const deleteInterpreter = (interpreterId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${api_url}api/interpreters/${interpreterId}`);
    console.log(`Deleted interpreter with ID ${interpreterId}:`, response.data);
    // Dispatch to Redux state if needed
  } catch (error) {
    console.error('Error deleting interpreter:', error.response ? error.response.data : error.message);
  }
};

