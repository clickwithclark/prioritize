import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { saveState } from "./localStorage.js";
import { app } from "./firebaseConfig.js";
import { updateDOM } from "./updateDOM.js";

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