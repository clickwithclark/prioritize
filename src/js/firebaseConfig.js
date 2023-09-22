/* -------------------------------------------------------------------*/
// #region [Firebase config]
/* -------------------------------------------------------------------*/
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBys1IRgmfn46iiD_jARVguGAXlDLIwcKI",
  authDomain: "prioritize-auth-development.firebaseapp.com",
  projectId: "prioritize-auth-development",
  storageBucket: "prioritize-auth-development.appspot.com",
  messagingSenderId: "703939708911",
  appId: "1:703939708911:web:92541d9f34366bc743981a",
  databaseURL:
    "https://prioritize-auth-development-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
