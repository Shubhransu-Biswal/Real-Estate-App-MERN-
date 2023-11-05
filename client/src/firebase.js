// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e3973.firebaseapp.com",
  projectId: "mern-estate-e3973",
  storageBucket: "mern-estate-e3973.appspot.com",
  messagingSenderId: "613364400013",
  appId: "1:613364400013:web:b3cc1b6cb7f97512ee47c4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
