// import { combineReducers } from "redux";
// import {
//   authReducer,
//   emailReducer,
//   loginReducer,
//   registerReducer,
//   resetPasswordReducer,
//   verifyEmailReducer,
// } from "./authReducers";
// import courseReducers from "./courseReducers";

// export default combineReducers({
//   // Auth
//   // auth: authReducer,
//   auth: authReducers,
//   email: emailReducer,
//   resetPassword: resetPasswordReducer,
//   verifyEmail: verifyEmailReducer,

//   // Course
//   course: courseReducers,
// });

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
import adminDataKategoriReducer from "./adminDataKategoriReducers";

export default combineReducers({
  // Auth
  auth: authReducer, // Gunakan authReducer yang benar
  email: emailReducer,
  resetPassword: resetPasswordReducer,

  // verifyEmail: verifyEmailReducer,
  veryEmail: verifyEmailReducer,

  // Course
  // course: courseReducer, // Gunakan courseReducer yang benar
  course: courseReducer,
  // popular: popularReducer,

  category: categoryReducer,

  verifyEmail: verifyEmailReducer,
  getMe: getMeReducer,
  updateProfile: updateProfileReducer,
  changePassword: changePasswordReducer,

  // Admin
  adminDataKategori: adminDataKategoriReducer,

  // Transaction
  transaction: transactionReducer,
});
