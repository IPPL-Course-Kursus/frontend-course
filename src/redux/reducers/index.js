import { combineReducers } from "redux";
import {
  authReducer, // Ganti ke authReducer
  emailReducer,
  resetPasswordReducer,
  verifyEmailReducer,
  getMeReducer,
  updateProfileReducer,
  changePasswordReducer,
} from "./authReducers"; // Sesuaikan dengan ekspor dari authReducers
import courseReducer from "./courseReducers"; // Ganti dari courseReducers ke courseReducer untuk konsistensi
// import popularReducer from "./popularReducers";
import categoryReducer from "./categoryReducers";
import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi
import chapterReducer from "./chapterReducers";
import contentReducer from "./contentReducers";

export default combineReducers({
  // Auth
  auth: authReducer, // Gunakan authReducer yang benar
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

  // Transaction
  transaction: transactionReducer,

  //chapter
  chapter: chapterReducer,

  //content
  content: contentReducer,
});
