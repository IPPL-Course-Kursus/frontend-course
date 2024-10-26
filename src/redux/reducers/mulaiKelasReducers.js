import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
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
    },
    mulaiKelasFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  mulaiKelasRequest,
  mulaiKelasSuccess,
  mulaiKelasFailure,
} = mulaiKelasSlice.actions;

export default mulaiKelasSlice.reducer;
