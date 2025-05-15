import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { feedbackMessage, feedbackMessageNormal } from "../utils/feedbackMessage.js";
import { app } from "./firebase.js";
import { getState } from "../utils/localStorage.js";

/**
 * Writes the current user's tasks to the Firebase Realtime Database.
 * Validates the user's authentication state before saving.
 * Displays appropriate feedback messages based on the success or failure of the operation.
 *
 * @function writeToDatabase
 * @returns {void}
 */
export function writeToDatabase() {
  const auth = getAuth(); // Get the Firebase Authentication instance
  const user = auth.currentUser; // Get the currently authenticated user

  if (!user) {
    // If no user is authenticated, display a message and exit
    return feedbackMessage(
      "PSSSST!\nRegister or Sign in to sync your tasks across devices!",
      6
    );
  }

  try {
    const database = getDatabase(app); // Get the Firebase Realtime Database instance

    // Save the current state (tasks) to the database under the user's UID
    set(ref(database, `users/${user.uid}`), {
      tasks: JSON.stringify(getState()), // Convert the state to a JSON string
    });

    // Display a success message
    return feedbackMessageNormal("Saved....");
  } catch (error) {
    // Log the error and display an error message
    console.error("Database Error:", error);
    feedbackMessage("Database Error: Task Not Saved");
  }
}
