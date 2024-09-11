// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbfgCkPW4anzZzx17wMjFO9Vd3RfgfYOs",
  authDomain: "sutparttimeapp.firebaseapp.com",
  projectId: "sutparttimeapp",
  storageBucket: "sutparttimeapp.appspot.com",
  messagingSenderId: "91485154906",
  appId: "1:91485154906:web:09b9418634105dfb9a7263",
  measurementId: "G-6LGVJTH05E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
