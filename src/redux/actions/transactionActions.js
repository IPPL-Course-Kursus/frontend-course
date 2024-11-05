import axios from "axios";
import { getCookie } from "cookies-next";
import {
    transactionRequest,
    transactionSuccess,
    transactionFail,
    paymentHistoryRequest,
    paymentHistorySuccess,
    paymentHistoryFail
} from "../reducers/transactionReducers";


const api_url = import.meta.env.VITE_REACT_API_ADDRESS;

export const createTransaction = (courseId) => async (dispatch) => {
    try {
        dispatch(transactionRequest());

        const token = getCookie("token"); // Now this should be defined
        const response = await axios.post(
            `${api_url}transaction/create-transaction/${courseId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch(transactionSuccess(response.data));
        return response.data;
    } catch (error) {
        dispatch(transactionFail(error.response.data));
        throw error;
    }
};

export const postSuccessPayment = (orderId) => async (dispatch) => {
    try {
        dispatch(transactionRequest());

        const token = getCookie("token"); // Ambil token dari cookies
        const response = await axios.post(
            `${api_url}transaction/success-payment`,
            { order_id: orderId }, // Body request
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch(transactionSuccess(response.data));
        return response.data;
    } catch (error) {
        dispatch(transactionFail(error.response.data));
        throw error;
    }
};

export const fetchPaymentHistory = () => async (dispatch) => {
    try {
        dispatch(paymentHistoryRequest());

        const token = getCookie("token");
        const response = await axios.get(`${api_url}transaction/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(paymentHistorySuccess(response.data.data || []));
        return response.data;
    } catch (error) {
        dispatch(paymentHistoryFail(error.response?.data || "Something went wrong"));
        throw error;
    }
};

export const resumeTransaction = (orderId) => async (dispatch) => {
    try {
        dispatch(transactionRequest());

        const token = getCookie("token");
        const response = await axios.get(
            `${api_url}transaction/resume/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data.success) {
            // Pastikan Anda mengembalikan response.data
            return response.data; // Mengembalikan data dari API
        }

        dispatch(transactionFail("Failed to resume transaction"));
    } catch (error) {
        dispatch(transactionFail(error.response?.data || "Failed to resume transaction"));
        throw error;
    }
};


