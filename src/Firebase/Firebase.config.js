// src/Firebase/Firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6uX6r0...your-real-key...",
  authDomain: "myapp-12345.firebaseapp.com",
  projectId: "myapp-12345",
  storageBucket: "myapp-12345.appspot.com",
  messagingSenderId: "720123456789",
  appId: "1:720123456789:web:abcdef12345678",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
