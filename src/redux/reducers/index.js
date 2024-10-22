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

import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer"; // Pastikan ini sudah benar

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

  // Chapter
  chapter: chapterReducers,

  //konten
  content: contentReducers,

  // Admin
  adminDataKategori: adminDataKategoriReducer,
  adminDashboard: adminDashboardReducer,

  // Transaction
  transaction: transactionReducer,
});
