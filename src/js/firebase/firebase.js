/* eslint-disable import/no-unresolved */
import { initializeApp } from "firebase/app";

/* -------------------------------------------------------------------*/
// Firebase Configuration
// This object contains the Firebase project settings.
// These settings are used to initialize the Firebase app.
/* -------------------------------------------------------------------*/
const firebaseConfig = {
  apiKey: "AIzaSyBys1IRgmfn46iiD_jARVguGAXlDLIwcKI",
  authDomain: "prioritize-auth-development.firebaseapp.com",
  projectId: "prioritize-auth-development",
  storageBucket: "prioritize-auth-development",
  messagingSenderId: "703939708911",
  appId: "1:703939708911:web:92541d9f34366bc743981a",
  databaseURL:
    "https://prioritize-auth-development-default-rtdb.firebaseio.com",
};

/* -------------------------------------------------------------------*/
// Initialize Firebase App
// This initializes the Firebase app with the provided configuration.
/* -------------------------------------------------------------------*/

/**
 * Initializes the Firebase application with the provided configuration.
 *
 * @constant {Object} app - The initialized Firebase app instance.
 */
export const app = initializeApp(firebaseConfig);


