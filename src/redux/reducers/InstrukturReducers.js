import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalUsers: 0,
  totalInstructors: 0,
  totalFreeClasses: 0,
  totalPremiumClasses: 0,
};

const instrukturSlice = createSlice({
  name: "instruktur",
  initialState,
  reducers: {
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
    setTotalInstructors: (state, action) => {
      state.totalInstructors = action.payload;
    },
    setTotalFreeClasses: (state, action) => {
      state.totalFreeClasses = action.payload;
    },
    setTotalPremiumClasses: (state, action) => {
      state.totalPremiumClasses = action.payload;
    },
  },
});

export const {
  setTotalUsers,
  setTotalInstructors,
  setTotalFreeClasses,
  setTotalPremiumClasses,
} = instrukturSlice.actions;

export default instrukturSlice.reducer;
