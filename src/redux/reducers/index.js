import { combineReducers } from "redux";
import {
  emailReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
} from "./authReducers";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  email: emailReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,
});
