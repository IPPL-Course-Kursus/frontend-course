import { createSlice } from "@reduxjs/toolkit";

// Initial state untuk instruktur
const initialState = {
  instruktur: [],
  loading: false,
  error: null,
};

// Slice untuk instruktur
const instrukturSlice = createSlice({
  name: "instruktur",
  initialState,
  reducers: {
    setInstruktur: (state, action) => {
      state.instruktur = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { setInstruktur, setLoading, setError } = instrukturSlice.actions;

// Export reducer
export default instrukturSlice.reducer;
