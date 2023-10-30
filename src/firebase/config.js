

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH3ixh4UvPHqMu0GWtfznBhEIoQHKrrbM",
  authDomain: "react-journalapp-5044f.firebaseapp.com",
  projectId: "react-journalapp-5044f",
  storageBucket: "react-journalapp-5044f.appspot.com",
  messagingSenderId: "349823138605",
  appId: "1:349823138605:web:726a67a356c779d36db1a4",
  measurementId: "G-NFK7G1993N"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth =  getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp ); 
//const analytics = getAnalytics(FirebaseApp);