// import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import rootReducers from "./slices";

// export default configureStore({
//   reducer: rootReducers,
//   devTools: import.meta.env.MODE === "development",
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  emailReducer,
  resetPasswordReducer,
  setProfileData,
  verifyEmailReducer,
} from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    resetPassword: resetPasswordReducer,
    verifyEmail: verifyEmailReducer,
    profile: setProfileData,
  },
});

export default store;
