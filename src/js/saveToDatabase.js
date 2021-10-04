import { getDatabase, ref, set } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { feedbackMessage, feedbackMessageNormal } from './feedbackMessage.js';
import { app } from './firebase';
import { getState } from './localStorage.js';
import { debounce } from './debounce.js';
/* -------------------------------------------------------------------*/
// #region [save to Database]
/* -------------------------------------------------------------------*/
const remindUserToSave = debounce(() => feedbackMessage('PSSSST!\nSign in to sync your tasks across devices! ', 6));
export function saveToDatabase(message = 'Saving...') {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      try {
        feedbackMessageNormal(message);
        // if no todo exist DO NOT SAVE
        const todos = getState()?.todos;
        if (!todos) {
          return;
        }
        const database = getDatabase(app);
        set(ref(database, 'tasks/'), { [user.uid]: JSON.stringify(getState()) });
      } catch (error) {
        console.log(error);
      }
      return;
    }
    remindUserToSave();
  });
}
