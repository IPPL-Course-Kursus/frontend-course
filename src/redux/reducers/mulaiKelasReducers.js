import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    output:'',
    loading: false,
    error: null,
};

const mulaiKelasSlice = createSlice({
    name: "mulaikelas",
    initialState,
    reducers: {
        mulaiKelasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        mulaiKelasSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.courseStatus = action.payload.courseStatus;
            state.contentFinish = action.payload.contentFinish;
            state.totalContent = action.payload.totalContent;
        },
        mulaiKelasFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        runCodeSuccess: (state, action) => {
            state.loading = false;
            state.output = action.payload.output;  
        },
        resetOutput: (state) => {
            state.output = null;
        },
    },
});

export const { mulaiKelasRequest, mulaiKelasSuccess, mulaiKelasFailure, runCodeSuccess, resetOutput } =
    mulaiKelasSlice.actions;

export default mulaiKelasSlice.reducer;
