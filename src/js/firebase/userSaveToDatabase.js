import { getDatabase, ref, set } from "firebase/database";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { feedbackMessage, feedbackMessageNormal } from "../feedbackMessage.js";
import { getState } from "../utils/localStorage.js";
import { isOnline } from "../checkIfOnline.js";
import { writeToDatabase } from "../writeToDatabase.js";

/**
 * Saves the current user's tasks to the Firebase Realtime Database.
 * Validates the user's online status and authentication state before saving.
 * Prompts the user for confirmation if tasks already exist in the database.
 * Displays appropriate feedback messages based on the success or failure of the operation.
 *
 * @function userSaveToDatabase
 * @returns {void}
 */
export function userSaveToDatabase() {
  // Check if the user is online before attempting to save
  if (!isOnline()) {
    return feedbackMessage(
      "You are not connected to the internet\n, try again later..."
    );
  }

  const auth = getAuth(); // Get the Firebase Authentication instance
  const user = auth.currentUser; // Get the currently authenticated user

  if (user) {
    // Prompt the user for confirmation before overwriting tasks
    const response = window.confirm(
      "Are you sure you want to overwrite previously saved tasks?"
    );

    try {
      if (response) {
        // Retrieve todos from the application state
        const todos = getState()?.todos;

        // If no todos exist, do not save
        if (!todos) {
          return;
        }

        // Save the tasks to the database
        return writeToDatabase();
      }
    } catch (error) {
      // Log any errors that occur during the save process
      console.error("An error occurred while saving tasks:", error);
    }
  }

  // Display a message if the user is not authenticated
  return feedbackMessage("Please register or sign in to save your tasks");
}
