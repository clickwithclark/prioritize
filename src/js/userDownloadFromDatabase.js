import { getDatabase, ref, onValue } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { saveState } from './localStorage.js';
import { app } from './firebase.js';
import { updateDOM } from './updateDOM.js';
import { isOnline } from './checkIfOnline.js';
import { feedbackMessage } from './feedbackMessage.js';

export function userDownloadFromDatabase() {
  if (!isOnline()) {
    return feedbackMessage(
      'You are not connected to the internet\n, try again later...'
    );
  }

  const database = getDatabase(app);
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      const response = window.confirm(
        'Are you sure you want to Download/Overwrite current tasks?'
      );
      if (response) {
        const stateRef = ref(database, `tasks/${user.uid}`);

        onValue(stateRef, async (snapshot) => {
          const newState = await snapshot.val();
          saveState(JSON.parse(newState));
          updateDOM();
        });
        return;
      }
      return feedbackMessage('Few... !');
    }
    return feedbackMessage('Please sign in to download your tasks !');
  });
}
