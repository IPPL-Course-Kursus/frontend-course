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
<<<<<<< HEAD
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducers from "./adminDashboardReducers"; // Pastikan ini sudah benar
import instrukturDashboardReducers from "./instrukturDashboardReducers";
=======

import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer"; // Pastikan ini sudah benar
>>>>>>> bb3faf0cc1b399ece01b79e0a0a5cecfabc5017b

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

<<<<<<< HEAD
  // Admin Dashboard
  adminDashboard: adminDashboardReducers, // Sesuaikan dengan nama

  // Dashboard Instruktur
  instrukturDashboard: instrukturDashboardReducers,

});
=======
  // Transaction
  transaction: transactionReducer,
});
>>>>>>> bb3faf0cc1b399ece01b79e0a0a5cecfabc5017b
