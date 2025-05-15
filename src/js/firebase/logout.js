import { getAuth, signOut } from 'firebase/auth';
import { feedbackMessage, feedbackMessageNormal } from '../utils/feedbackMessage.js';
import { showLogin } from '../ui/showLogin.js';

/**
 * Handles user logout functionality.
 * Signs the user out of Firebase Authentication, displays a success message,
 * and redirects the user to the login screen. If an error occurs, an error message is displayed.
 *
 * @function logout
 * @param {Event} event - The event object triggered by the logout action.
 * @returns {void}
 */
export function logout(event) {
  event.preventDefault(); // Prevent the default behavior of the logout action

  const auth = getAuth(); // Get the Firebase Authentication instance

  // Attempt to sign the user out
  signOut(auth)
    .then(() => {
      // Sign-out successful
      showLogin(); // Redirect the user to the login screen
      feedbackMessageNormal('Logged out successfully'); // Display a success message
    })
    .catch((error) => {
      // Handle any errors that occur during sign-out
      feedbackMessage('An error occurred logging out'); // Display an error message
    });
}
