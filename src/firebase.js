import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJAmC81kWuVeuTDfCFSilEhzA7jQarI7w",
  authDomain: "bakerymobile-5a946.firebaseapp.com",
  projectId: "bakerymobile-5a946",
  storageBucket: "bakerymobile-5a946.firebasestorage.app",
  messagingSenderId: "441395771401",
  appId: "1:441395771401:web:91474231f670722d1b60d8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
