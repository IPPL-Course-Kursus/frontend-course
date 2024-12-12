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
import chapterReducers from "./chapterReducers";
import courseReducer from "./courseReducers";
import categoryReducer from "./categoryReducers";
import contentReducers from "./contentReducers";
import instructorReducer from "./datainstructorReducers";
import { transactionReducer } from "./transactionReducers";
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer";
import typeCourseReducer from "./typeCourseReducers";
import instrukturDashboardReducers from "./instrukturDashboardReducers";
import mulaiKelasReducers from "./mulaiKelasReducers";
import levelCourseReducer from "./levelCourseReducers";
import { paymentHistoryReducer } from "./transactionReducers";
import instrukturReducer from "./instrukturReducer";
import LoginReducer from "./LoginReducer";
import certificateReducers from "./certificateReducers";
import adminDataInterLangReducer from "./adminDataInterLangReducers";

export default combineReducers({

  //Login
  login: LoginReducer,
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
  mulaiKelas: mulaiKelasReducers,

  // Category
  category: categoryReducer,

  // Chapter
  chapter: chapterReducers,

  //konten
  content: contentReducers,

  // Admin
  adminDataKategori: adminDataKategoriReducer,
  adminDashboard: adminDashboardReducer,
  instructors: instructorReducer,
  typeCourse: typeCourseReducer,
  levelCourse: levelCourseReducer,
  interpreterLanguages: adminDataInterLangReducer,

  // Transaction
  transaction: transactionReducer,
  
  // Payment History
  paymentHistory: paymentHistoryReducer,

  // Instruktur
  instrukturDashboard: instrukturDashboardReducers,

  // Mulai Kelas
  mulaikelas: mulaiKelasReducers,
  certificate: certificateReducers,

  // Instruktur
  instruktur: instrukturReducer,
  
});