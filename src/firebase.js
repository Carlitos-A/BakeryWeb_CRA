import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADjAidzjjaOTWm0rleWQGBBkURPEJf2JU",
  authDomain: "bakeryweb-4145f.firebaseapp.com",
  projectId: "bakeryweb-4145f",
  storageBucket: "bakeryweb-4145f.firebasestorage.app",
  messagingSenderId: "544317875435",
  appId: "1:544317875435:web:86923b84d41ab9e1c30aae"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
