import { combineReducers } from "redux";
import AuthReducers from "./authSlice";

export default combineReducers({
  // auth: authReducers,
  auth: AuthReducers
});
