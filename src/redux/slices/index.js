import { combineReducers } from "redux";
import {AuthReducer, emailReducer, resetPasswordReducer} from "./authSlice";
  

export default combineReducers({
  
  auth: AuthReducer,
  email: emailReducer,
  resetPassword: resetPasswordReducer
});
