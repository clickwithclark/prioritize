import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { feedbackMessage, feedbackMessageNormal } from "./feedbackMessage.js";
import { app } from "./firebase.js";
import { getState } from "./localStorage.js";

export function writeToDatabase() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return feedbackMessage(
      "PSSSST!\nRegister or Sign in to sync your tasks across devices!",
      6
    );
  }
  try {
    const database = getDatabase(app);
    set(ref(database, `users/${user.uid}`), {
      tasks: JSON.stringify(getState()),
    });
    return feedbackMessageNormal("Saved....");
  } catch (error) {
    console.log(error);
    feedbackMessage("Database Error: Task Not Saved");
  }
}
