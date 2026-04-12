import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwnPWnfM-MUKVEiEkBpK53iAjuziSuL5U",
  authDomain: "e-commerce-dbc5f.firebaseapp.com",
  projectId: "e-commerce-dbc5f",
  storageBucket: "e-commerce-dbc5f.firebasestorage.app",
  messagingSenderId: "397172089164",
  appId: "1:397172089164:web:02541326863e74d7ce6fe9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



