// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP2VYoBuln68q4mrdQ1nGCJyIO8Sa9UdU",
  authDomain: "applyforajob-4b9d9.firebaseapp.com",
  projectId: "applyforajob-4b9d9",
  storageBucket: "applyforajob-4b9d9.appspot.com",
  messagingSenderId: "99500593777",
  appId: "1:99500593777:web:f890c8bc2a86c07c1c81d0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.app();
export const db = firebase.firestore();
export default firebase;
