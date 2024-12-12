import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const certificateSlice = createSlice({
    name: 'certificate',
    initialState,
    reducers: {
        certificateRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        certificateSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        certificateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { certificateRequest, certificateSuccess, certificateFailure } = certificateSlice.actions;

export default certificateSlice.reducer;
