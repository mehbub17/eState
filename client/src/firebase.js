// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-4c105.firebaseapp.com",
  projectId: "real-state-4c105",
  storageBucket: "real-state-4c105.firebasestorage.app",
  messagingSenderId: "825642959909",
  appId: "1:825642959909:web:cd1818777a417634152bcc",
  measurementId: "G-6C7T9M9GZ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);