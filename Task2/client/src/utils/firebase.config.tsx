// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUnK6PxUMdeaSZjsHONe7Ci_rHBOwMvUw",
  authDomain: "task2-30c09.firebaseapp.com",
  projectId: "task2-30c09",
  storageBucket: "task2-30c09.appspot.com",
  messagingSenderId: "23285240435",
  appId: "1:23285240435:web:4c54e29479a2514c87d006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);