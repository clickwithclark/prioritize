import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { feedbackMessageNormal } from "./feedbackMessage.js";
import { app } from "./firebase.js";
import { getState } from "./localStorage.js";

export function writeToDatabase() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      feedbackMessageNormal("Saving...");
      const database = getDatabase(app);
      return set(ref(database, `users/${user.uid}`), {
        tasks: JSON.stringify(getState()),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
