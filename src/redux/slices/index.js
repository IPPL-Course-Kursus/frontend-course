import { combineReducers } from "redux";
import {AuthReducer, emailReducer, resetPasswordReducer, verifyEmailReducer} from "./authSlice";
  

export default combineReducers({
  
  auth: AuthReducer,
  email: emailReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer
});