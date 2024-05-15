// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4A1Mk4PLS_lvASCirHYQVEpvWRCd9sPo",
  authDomain: "delivery-app-43eb5.firebaseapp.com",
  projectId: "delivery-app-43eb5",
  storageBucket: "delivery-app-43eb5.appspot.com",
  messagingSenderId: "1008023479142",
  appId: "1:1008023479142:web:0560fdbae5c155782f1ea7",
  measurementId: "G-3YV5EWLZWH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

const db = getFirestore(app);
const storage = getStorage(app);

export { db };
