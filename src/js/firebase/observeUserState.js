import { getAuth, onAuthStateChanged } from "firebase/auth";
import { showLogOut } from "../ui/showLogOut.js";
import { showLogin } from "../ui/showLogin.js";

/**
 * Observes the authentication state of the user.
 * If the user is logged in, their username is displayed, and the logout UI is shown.
 * If the user is logged out, the login UI is displayed.
 *
 * @function observeUserState
 * @returns {void}
 */
export function observeUserState() {
  // Listen for changes in the user's authentication state
  onAuthStateChanged(getAuth(), (user) => {
    if (!user) {
      // If no user is logged in, show the login UI
      return showLogin();
    }

    // Extract the username from the user's email
    const username = user.email.split("@")[0];

    // Display the username in the UI
    document.querySelector("#username").textContent = username;

    // Show the logout UI
    showLogOut();
  });
}
