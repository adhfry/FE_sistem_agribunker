import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_ni-BK4ngpymdYtSYDIKrDlgmwKqr_o4",
  authDomain: "agribunker.firebaseapp.com",
  databaseURL:
    "https://agribunker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "agribunker",
  storageBucket: "agribunker.firebasestorage.app",
  messagingSenderId: "660478011247",
  appId: "1:660478011247:web:a057e8d540aa34524c6a9a",
  measurementId: "G-TY98YEV4CY",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, onValue };
