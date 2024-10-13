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
import categoryReducer from "./categoryReducers";
import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi

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

  category: categoryReducer,

  verifyEmail: verifyEmailReducer,
  getMe: getMeReducer,
  updateProfile: updateProfileReducer,
  changePassword: changePasswordReducer,

  // Transaction
  transaction: transactionReducer,
});
