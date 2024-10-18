import { combineReducers } from "redux";
import {
  authReducer, 
  emailReducer,
  resetPasswordReducer,
  verifyEmailReducer,
  getMeReducer,
  updateProfileReducer,
  changePasswordReducer,
} from "./authReducers"; 
import courseReducer from "./courseReducers"; 
import categoryReducer from "./categoryReducers";
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducers from "./adminDashboardReducers"; // Pastikan ini sudah benar

export default combineReducers({
  // Auth
  auth: authReducer, 
  email: emailReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,
  getMe: getMeReducer,
  updateProfile: updateProfileReducer,
  changePassword: changePasswordReducer,

  // Course
  course: courseReducer,

  // Category
  category: categoryReducer,

  // Admin
  adminDataKategori: adminDataKategoriReducer,

  // Admin Dashboard
  adminDashboard: adminDashboardReducers, // Sesuaikan dengan nama
});