import { createSlice } from "@reduxjs/toolkit";

const initialtransactionState = {
    transaction: {},
    loading: false,
    error: null,
};

const initialpaymentHistoryState = {
    paymentHistory: [],
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState: initialtransactionState,
    reducers: {
        setTransaction: (state, action) => {
            state.transaction = action.payload;
        },
        transactionRequest: (state) => {
            state.loading = true;
        },
        transactionSuccess: (state, action) => {
            state.loading = false;
            state.transaction = action.payload;
        },
        transactionFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const paymentHistorySlice = createSlice({
    name: "paymentHistory",
    initialState : initialpaymentHistoryState,
    reducers: {
        paymentHistoryRequest: (state) => {
            state.loading = true;
        },
        paymentHistorySuccess: (state, action) => {
            state.loading = false;
            state.paymentHistory = action.payload || [];
        },
        paymentHistoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // clearPaymentHistory: (state) => {
        //     state.paymentHistory = [];
        //     state.error = null;
        // },
    },
});

export const {
    setTransaction,
    transactionRequest,
    transactionSuccess,
    transactionFail,
} = transactionSlice.actions;

export const {
    paymentHistoryRequest,
    paymentHistorySuccess,
    paymentHistoryFail,
    // clearPaymentHistory,
} = paymentHistorySlice.actions;

export const transactionReducer = transactionSlice.reducer;
export const paymentHistoryReducer = paymentHistorySlice.reducer;