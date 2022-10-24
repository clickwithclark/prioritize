import { getDatabase, ref, onValue } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { saveState } from './localStorage.js';
import { app } from './firebase.js';
import { updateDOM } from './updateDOM.js';

export async function updateFromDB() {
  const database = getDatabase(app);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const stateRef = ref(database, `tasks/${user.uid}`);

    onValue(stateRef, async (snapshot) => {
      const newState = await snapshot.val();
      await saveState(JSON.parse(newState));
      updateDOM();
    });
  }
}
