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

import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer";
import typeCourseReducer from "./typeCourseReducers"

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
  adminDashboard: adminDashboardReducer,
  typeCourse: typeCourseReducer,

  // Transaction
  transaction: transactionReducer,
});
