// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpgs-KD5W2YqNK_T9i-UFZSZ0U5xK1x9k",
  authDomain: "creofood-a4545.firebaseapp.com",
  projectId: "creofood-a4545",
  storageBucket: "creofood-a4545.appspot.com",
  messagingSenderId: "906083590809",
  appId: "1:906083590809:web:10c9680afa499dd9c98e08",
  measurementId: "G-9WHGE6NKRZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = firebase.firestore();

export default firebase;
