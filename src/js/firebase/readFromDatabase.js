import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { saveState } from "../utils/localStorage.js"; // Adjusted path to match the correct location
import { updateDOM } from "../ui/updateDOM.js";
import { app } from "./firebase.js";

/**
 * Reads tasks from the Firebase Realtime Database for the authenticated user.
 * Updates the application state and DOM with the retrieved data.
 *
 * @function readFromDatabase
 * @returns {Promise<void>} Resolves when the data is successfully read and processed.
 */
export async function readFromDatabase() {
  const database = getDatabase(app); // Get the Firebase Realtime Database instance
  const auth = getAuth(); // Get the Firebase Authentication instance
  const user = auth.currentUser; // Get the currently authenticated user

  if (!user) {
    // If there's no authenticated user, return a resolved Promise
    return Promise.resolve();
  }

  // Reference to the user's tasks in the database
  const userRef = ref(database, `users/${user.uid}/tasks`);

  return new Promise((resolve, reject) => {
    // Listen for changes in the user's tasks
    onValue(userRef, async (snapshot) => {
      try {
        const newState = await snapshot.val(); // Retrieve the snapshot value
        await saveState(JSON.parse(newState)); // Save the new state to localStorage
        await updateDOM(); // Update the DOM with the new state
        resolve(); // Resolve the Promise when all operations are complete
      } catch (error) {
        reject(error); // Reject the Promise if an error occurs
      }
    });
  });
}