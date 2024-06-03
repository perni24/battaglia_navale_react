// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase , ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmXAsOrvJjTB4xFc4wlp6zmVaOAabGZmQ",
  authDomain: "battaglia-navale-e7827.firebaseapp.com",
  databaseURL: "https://battaglia-navale-e7827-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "battaglia-navale-e7827",
  storageBucket: "battaglia-navale-e7827.appspot.com",
  messagingSenderId: "659357691717",
  appId: "1:659357691717:web:84412ca86c2804c51b982c",
  measurementId: "G-BC426K9TQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();