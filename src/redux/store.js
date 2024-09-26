// import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import rootReducers from "./slices";

// export default configureStore({
//   reducer: rootReducers,
//   devTools: import.meta.env.MODE === "development",
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice, // Pastikan authReducer sudah dihubungkan
    profile: profileSlice, //
  },
});

export default store;
