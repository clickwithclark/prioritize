import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { isOnline } from "../utils/checkIfOnline.js";
import { feedbackMessage, feedbackMessageNormal } from "../utils/feedbackMessage.js";

/**
 * Handles user signup functionality.
 * Validates the user's online status, retrieves credentials from the signup form,
 * and creates a new user account using Firebase Authentication.
 * Displays appropriate feedback messages based on the success or failure of the signup attempt.
 *
 * @function signup
 * @param {Event} event - The event object triggered by the signup form submission.
 * @returns {void}
 */
export function signup(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Check if the user is online before attempting to sign up
  if (!isOnline()) {
    return feedbackMessage(
      "You are not currently online, please try again later",
      6
    );
  }

  // Retrieve email and password from the signup form
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const auth = getAuth(); // Get the Firebase Authentication instance

  // Set persistence to browser local storage for session management
  setPersistence(auth, browserLocalPersistence);

  // Create a new user account with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const { user } = userCredential;
      const username = user.email.split("@")[0]; // Extract username from email
      feedbackMessageNormal(`Welcome ${username}`); // Display a success message
    })
    .catch((error) => {
      const errorCode = error.code; // Firebase error code
      const errorMessage = error.message; // Firebase error message

      // Log the error details (optional, for debugging purposes)
      console.error(
        "An error occurred during sign up: ",
        errorMessage,
        "Error Code: ",
        error.code
      );

      // Display an error message to the user
      feedbackMessage(
        "An error occurred signing up\n please make sure your password is at least 6 characters long",
        6
      );
    });
}
