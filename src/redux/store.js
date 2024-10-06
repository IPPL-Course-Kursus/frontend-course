import { configureStore } from "@reduxjs/toolkit";
import {
  emailReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
} from "./reducers/authReducers";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    email: emailReducer,
    resetPassword: resetPasswordReducer,
    verifyEmail: verifyEmailReducer,
  },
});

export default store;
