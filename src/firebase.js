// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3Lomcmc34fyl0tOJjYnlN9xdRD3KDrEM",
  authDomain: "todos-a8075.firebaseapp.com",
  projectId: "todos-a8075",
  storageBucket: "todos-a8075.appspot.com",
  messagingSenderId: "636888986886",
  appId: "1:636888986886:web:b04607cb5a529f51035a87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)