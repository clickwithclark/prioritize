import { getDatabase, ref, onValue } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { saveState } from './localStorage.js';
import { app } from './firebase.js';
import { updateDOM } from './updateDOM.js';
import { isOnline } from './checkIfOnline.js';
import { feedbackMessage } from './feedbackMessage.js';
import { updateFromDB } from './updateFromDB.js';

export function userDownloadFromDatabase() {
  if (!isOnline()) {
    return feedbackMessage(
      'You are not connected to the internet\n, try again later...'
    );
  }

  const database = getDatabase(app);
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      try {
        if (
          window.confirm('Are you sure you want to overwrite current tasks?')
        ) {
          updateFromDB();

          return;
        }
        return feedbackMessage('Few... !');
      } catch (error) {
        console.log(error);
      }
    }
    return feedbackMessage('Please sign in to download your tasks !');
  });
}
