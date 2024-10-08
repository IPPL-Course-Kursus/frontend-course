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
} from "./authReducers"; // Sesuaikan dengan ekspor dari authReducers
import courseReducer from "./courseReducers"; // Ganti dari courseReducers ke courseReducer untuk konsistensi
import categoryReducer from "./categoryReducers";

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
});
