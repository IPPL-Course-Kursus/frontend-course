import { combineReducers } from "redux";
import {
<<<<<<< HEAD
  authReducer, 
=======
  authReducer,
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
  emailReducer,
  resetPasswordReducer,
  verifyEmailReducer,
  getMeReducer,
  updateProfileReducer,
  changePasswordReducer,
<<<<<<< HEAD
} from "./authReducers"; 
import courseReducer from "./courseReducers"; 
import categoryReducer from "./categoryReducers";

import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer"; // Pastikan ini sudah benar
=======
} from "./authReducers";
import chapterReducers from "./chapterReducers";
import courseReducer from "./courseReducers";
import categoryReducer from "./categoryReducers";
import contentReducers from "./contentReducers";

import transactionReducer from "./transactionReducers"; // Menggunakan reducer transaksi
import adminDataKategoriReducer from "./adminDataKategoriReducers";
import adminDashboardReducer from "./admindashboardreducer";
import typeCourseReducer from "./typeCourseReducers";
import instrukturDashboardReducers from "./instrukturDashboardReducers";
import mulaiKelasReducers from "./mulaiKelasReducers";
import levelCourseReducer from "./levelCourseReducers";
import instrukturReducer from "./instrukturReducer";
import LoginReducer from "./LoginReducer"
>>>>>>> 763d08745509f424f8e6105e9259366b545875de

export default combineReducers({

  //Login
  login: LoginReducer,
  // Auth
<<<<<<< HEAD
  auth: authReducer, 
=======
  auth: authReducer,
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
  email: emailReducer,
  resetPassword: resetPasswordReducer,
  verifyEmail: verifyEmailReducer,
  getMe: getMeReducer,
  updateProfile: updateProfileReducer,
  changePassword: changePasswordReducer,

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
<<<<<<< HEAD

  // Transaction
  transaction: transactionReducer,
=======
  typeCourse: typeCourseReducer,
  levelCourse: levelCourseReducer,

  // Transaction
  transaction: transactionReducer,

  // Instruktur
  instrukturDashboard: instrukturDashboardReducers,

  // Mulai Kelas
  mulaikelas: mulaiKelasReducers,

  // Instruktur
  instruktur: instrukturReducer,
>>>>>>> 763d08745509f424f8e6105e9259366b545875de
});
