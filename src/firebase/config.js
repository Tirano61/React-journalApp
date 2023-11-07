

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
    VITE_MEASUREMENTID,
  } = getEnvironments()
  //console.log(env)
// Produccion
/* const firebaseConfig = {
  apiKey: "AIzaSyAH3ixh4UvPHqMu0GWtfznBhEIoQHKrrbM",
  authDomain: "react-journalapp-5044f.firebaseapp.com",
  projectId: "react-journalapp-5044f",
  storageBucket: "react-journalapp-5044f.appspot.com",
  messagingSenderId: "349823138605",
  appId: "1:349823138605:web:726a67a356c779d36db1a4",
  measurementId: "G-NFK7G1993N"
}; */
// Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyCXN-VKG502gYcWeDRmIZ-GfDMKA5mVOo4",
  authDomain: "test-pruebas-254a5.firebaseapp.com",
  projectId: "test-pruebas-254a5",
  storageBucket: "test-pruebas-254a5.appspot.com",
  messagingSenderId: "592989616548",
  appId: "1:592989616548:web:eed447cb7741735eaf2931"
}; */
const firebaseConfig = {
  apiKey:VITE_APIKEY,
  authDomain:VITE_AUTHDOMAIN,
  projectId:VITE_PROJECTID,
  storageBucket:VITE_STORAGEBUCKET,
  messagingSenderId:VITE_MESSAGINGSENDERID,
  appId:VITE_APPID,
  measurementId:VITE_MEASUREMENTID,
};
console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth =  getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp ); 
//const analytics = getAnalytics(FirebaseApp);