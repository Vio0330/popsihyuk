// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC9Y9bRYZls-CWqrAo1E97waOV6mI697WY",
  authDomain: "hanni-d605b.firebaseapp.com",
  projectId: "hanni-d605b",
  storageBucket: "hanni-d605b.appspot.com",
  messagingSenderId: "935775796789",
  appId: "1:935775796789:web:150dfd0e97ebcc93483b7c",
  measurementId: "G-Q1YEW3HKPR",
  databaseURL: "https://hanni-d605b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};
export const storage = getStorage(app);