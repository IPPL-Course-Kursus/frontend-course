import { combineReducers } from "redux";
import {
  emailReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  verifyEmailReducer,
} from "./authReducers";
import courseReducers from "./courseReducers";

export default combineReducers({
  // Auth
  login: loginReducer,
  register: registerReducer,
  email: emailReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,

  // Course
  course: courseReducers,
});
