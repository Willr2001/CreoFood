import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpgs-KD5W2YqNK_T9i-UFZSZ0U5xK1x9k',
  authDomain: 'creofood-a4545.firebaseapp.com',
  projectId: 'creofood-a4545',
  storageBucket: 'creofood-a4545.appspot.com',
  messagingSenderId: '906083590809',
  appId: '1:906083590809:web:10c9680afa499dd9c98e08',
  measurementId: 'G-9WHGE6NKRZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const analytics = getAnalytics(app);
export default app;
