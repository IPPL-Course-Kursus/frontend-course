import { configureStore } from "@reduxjs/toolkit";
import {
  emailReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
  getMeReducer,
  updateProfileReducer,
  changePasswordReducer,
} from "./reducers/authReducers";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    email: emailReducer,
    resetPassword: resetPasswordReducer,
    verifyEmail: verifyEmailReducer,
    getMe: getMeReducer,
    updateProfile: updateProfileReducer,
    changePassword: changePasswordReducer,
  },
});

export default store;
