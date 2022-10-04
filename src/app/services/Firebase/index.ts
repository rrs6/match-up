import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZmIqPOM6PZgyzcCvZEPODjLGlvclsTE4",
  authDomain: "fir-auth-1af08.firebaseapp.com",
  projectId: "fir-auth-1af08",
  storageBucket: "fir-auth-1af08.appspot.com",
  messagingSenderId: "593691391447",
  appId: "1:593691391447:web:5f05fee99f1ed94faac792"
};

export const app = initializeApp(firebaseConfig);