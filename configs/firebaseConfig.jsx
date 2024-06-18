// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6rCL9kFEWyiqFHS88hulem_4YA8Cv828",
  authDomain: "business-directory-app-91bda.firebaseapp.com",
  projectId: "business-directory-app-91bda",
  storageBucket: "business-directory-app-91bda.appspot.com",
  messagingSenderId: "566274564672",
  appId: "1:566274564672:web:2c5414a7472de6e486b5a5",
  measurementId: "G-562GBE5C84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);