import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transaction: {},
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
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

export const {
    setTransaction,
    transactionRequest,
    transactionSuccess,
    transactionFail,
} = transactionSlice.actions;

export default transactionSlice.reducer;
