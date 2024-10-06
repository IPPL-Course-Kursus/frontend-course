import { configureStore } from "@reduxjs/toolkit";
import {
  emailReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
} from "./reducers/authReducers";
import courseReducers from "./reducers/courseReducers";

const store = configureStore({
  reducer: {
    // Auth
    login: loginReducer,
    register: registerReducer,
    email: emailReducer,
    resetPassword: resetPasswordReducer,
    verifyEmail: verifyEmailReducer,

    // Course
    course: courseReducers,
  },
});

export default store;
