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
import { transactionReducer } from "./transactionReducers";
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer";
import typeCourseReducer from "./typeCourseReducers";
import instrukturDashboardReducers from "./instrukturDashboardReducers"; 
import mulaiKelasReducers from "./mulaiKelasReducers";
import levelCourseReducer from "./levelCourseReducers";
import { paymentHistoryReducer } from "./transactionReducers";

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
  levelCourse: levelCourseReducer,

  // Transaction
  transaction: transactionReducer,
  
  // Payment History
  paymentHistory: paymentHistoryReducer,

  // Instruktur
  instrukturDashboard: instrukturDashboardReducers,

  // Mulai Kelas
  mulaikelas: mulaiKelasReducers,

});
