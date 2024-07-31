import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTJ26Ma0pzm4G9zt8cfmjQz_ySaZKlrtE",
  authDomain: "journeypack-images.firebaseapp.com",
  projectId: "journeypack-images",
  storageBucket: "journeypack-images.appspot.com",
  messagingSenderId: "775215605190",
  appId: "1:775215605190:web:9074941e05510a3c5b3ec7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
