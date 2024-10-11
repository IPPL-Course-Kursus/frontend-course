// import { configureStore } from "@reduxjs/toolkit";
// import {
//   authReducer,
//   emailReducer,
//   resetPasswordReducer,
//   verifyEmailReducer,
// } from "./reducers/authReducers";
// import courseReducer from "./reducers/courseReducers"; // Sesuaikan dengan singular courseReducer

// const store = configureStore({
//   reducer: {
//     // Auth
//     auth: authReducer,
//     email: emailReducer,
//     resetPassword: resetPasswordReducer,
//     verifyEmail: verifyEmailReducer,

//     // Course
//     course: courseReducer, // Sesuaikan menjadi courseReducer
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";

import rootReducers from "./reducers";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducers,
  devTools: import.meta.env.MODE === "development",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
