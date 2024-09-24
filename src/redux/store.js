// import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import rootReducers from "./slices";

// export default configureStore({
//   reducer: rootReducers,
//   devTools: import.meta.env.MODE === "development",
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Pastikan authReducer sudah dihubungkan
  },
});

export default store;
