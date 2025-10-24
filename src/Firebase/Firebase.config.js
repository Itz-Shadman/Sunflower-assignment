import { getAuth,GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAKi7hLj80MyWvRp6bWadZjH5Z4_Phlvz0",
  authDomain: "sunflower-auth-99382.firebaseapp.com",
  projectId: "sunflower-auth-99382",
  storageBucket: "sunflower-auth-99382.firebasestorage.app",
  messagingSenderId: "758133018979",
  appId: "1:758133018979:web:f7bd9f95a0d486df8a0356"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
