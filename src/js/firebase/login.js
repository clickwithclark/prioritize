import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { isOnline } from "../utils/checkIfOnline.js";
import { feedbackMessage, feedbackMessageNormal } from "../utils/feedbackMessage.js";
import { readFromDatabase } from "./readFromDatabase.js";

/**
 * Handles user login functionality.
 * Validates the user's online status, retrieves credentials from the login form,
 * and authenticates the user with Firebase Authentication.
 * Displays appropriate feedback messages based on the success or failure of the login attempt.
 *
 * @function login
 * @param {Event} event - The event object triggered by the login form submission.
 * @returns {Promise<void>} Resolves when the login process is complete.
 */
export async function login(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Check if the user is online before attempting to log in
  if (!isOnline()) {
    return feedbackMessage(
      "You are not currently online, please try again later",
      6
    );
  }

  // Retrieve email and password from the login form
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const auth = getAuth(); // Get the Firebase Authentication instance

  try {
    // Set persistence to browser local storage for session management
    await setPersistence(auth, browserLocalPersistence);

    // Authenticate the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Update the database after successful login
    await readFromDatabase();

    // Display a success message to the user
    feedbackMessageNormal(`Welcome ${user.email.split("@")[0]}`);
  } catch (error) {
    const errorCode = error.code; // Firebase error code
    const errorMessage = error.message; // Firebase error message

    // Log the error details (optional, commented out for production)
    // console.error(
    //   'An error occurred during log in: ',
    //   errorMessage,
    //   'Error Code: ',
    //   error.code
    // );

    // Display an error message to the user
    return feedbackMessage(
      "An error occurred Logging in\n incorrect username or password",
      6
    );
  }
}
