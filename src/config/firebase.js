import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

// Inisialisasi Firebase app
const app = initializeApp(firebaseConfig);

// Inisialisasi services Firebase
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Ekspor services Firebase
export { db, auth, functions };


// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // Konfigurasi Firebase menggunakan environment variables dari Vite
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FB_API_KEY,
//   authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FB_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FB_APP_ID,
//   measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
// };

// // Inisialisasi Firebase
// const app = initializeApp(firebaseConfig);

// // Inisialisasi Firestore dan Auth
// const db = getFirestore(app);
// const auth = getAuth(app);

// // Ekspor db dan auth agar bisa digunakan di bagian lain project
// export { db, auth };
