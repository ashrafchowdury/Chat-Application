import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEGAZ84gWshJjDRSSMWrM77TfiXrPM0-U",
  authDomain: "creative-chat-v2.firebaseapp.com",
  projectId: "creative-chat-v2",
  storageBucket: "creative-chat-v2.appspot.com",
  messagingSenderId: "523352368824",
  appId: "1:523352368824:web:e868116ccb12298909364d",
  measurementId: "G-S322SH0QNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
