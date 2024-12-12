import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  category: [],
  courseLevel: [],
  data : [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setLevel: (state, action) => {
      state.courseLevel = action.payload;
    },
    setType: (state, action) => {
      state.data = action.payload;
    },
  },
});


export const { setCategory, setLevel, setType } = categorySlice.actions;

export default categorySlice.reducer;
