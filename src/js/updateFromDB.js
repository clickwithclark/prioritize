import { getDatabase, ref, onValue } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { saveState } from './localStorage.js';
import { app } from './firebase.js';
import { updateDOM } from './updateDOM.js';
import { feedbackMessageNormal } from './feedbackMessage.js';

export function updateFromDB() {
  const database = getDatabase(app);
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      const stateRef = ref(database, `tasks/${user.uid}`);

      onValue(stateRef, async (snapshot) => {
        const newState = await snapshot.val();
        saveState(JSON.parse(newState));
        updateDOM();
      });
    }
  });
}
