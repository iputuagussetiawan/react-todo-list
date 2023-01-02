// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPwMcrkkUOyFKv9RIdjKiSQakI3n3wFlU",
  authDomain: "todo-app-45299.firebaseapp.com",
  projectId: "todo-app-45299",
  storageBucket: "todo-app-45299.appspot.com",
  messagingSenderId: "204377549656",
  appId: "1:204377549656:web:f9645ac14677892745932d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);