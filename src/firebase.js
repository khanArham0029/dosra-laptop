// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMs99Ow1Ec0fHRqPaJEEZVUYH2IFJ9rW0",
  authDomain: "blog-project-teresol.firebaseapp.com",
  projectId: "blog-project-teresol",
  storageBucket: "blog-project-teresol.appspot.com",
  messagingSenderId: "365045876010",
  appId: "1:365045876010:web:156d93e94c1d7ef4b44a53",
  measurementId: "G-B2F2E104LZ"
};

// init firebase
initializeApp(firebaseConfig)

// init & export firestore service
 const db = getFirestore()
 export default db
// generate & export auth object
export const auth = getAuth()