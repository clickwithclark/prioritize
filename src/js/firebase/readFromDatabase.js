import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { saveState } from "../utils/localStorage.js"; // Adjusted path to match the correct location
import { updateDOM } from "../ui/updateDOM.js";
import { app } from "./firebase.js";

export async function readFromDatabase() {
  const database = getDatabase(app);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // If there's no authenticated user, return a resolved Promise
    return Promise.resolve();
  }

  const userRef = ref(database, `users/${user.uid}/tasks`);

  return new Promise((resolve, reject) => {
    onValue(userRef, async (snapshot) => {
      try {
        const newState = await snapshot.val();
        await saveState(JSON.parse(newState));
        await updateDOM();
        resolve(); // Resolve the Promise when all operations are complete
      } catch (error) {
        reject(error); // Reject the Promise if an error occurs
      }
    });
  });
}