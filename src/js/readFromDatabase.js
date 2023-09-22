import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { saveState } from "./localStorage.js";
import { app } from "./firebaseConfig.js";
import { updateDOM } from "./updateDOM.js";

export async function readFromDatabase() {
  const database = getDatabase(app);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const userRef = ref(database, `users/${user.uid}/tasks`);

    onValue(userRef, async (snapshot) => {
      const newState = await snapshot.val();
      await saveState(JSON.parse(newState));
      await updateDOM();
    });
  }
}
