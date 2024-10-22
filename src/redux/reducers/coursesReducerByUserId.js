// src/redux/reducers/coursesReducerByUserId.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mycourse: [],
    loading: false,
    error: null,
};

const coursesByUserIdSlice = createSlice({
    name: "coursesByUserId",
    initialState,
    reducers: {
        setMyCourses: (state, action) => {
            state.mycourse = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

// Ekspor aksi
export const { setMyCourses, setLoading, setError, clearError } = coursesByUserIdSlice.actions;

// Ekspor reducer
export default coursesByUserIdSlice.reducer;
