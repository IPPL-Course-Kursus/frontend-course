import { combineReducers } from "redux";
import {
  emailReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
  getMeReducer,
  updateProfileReducer,
  changePasswordReducer,
} from "./authReducers";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  email: emailReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,
  getMe: getMeReducer,
  updateProfile: updateProfileReducer,
  changePassword: changePasswordReducer,
});
