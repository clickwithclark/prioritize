import { getDatabase, ref, set } from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { feedbackMessage, feedbackMessageNormal } from './feedbackMessage.js';
import { app } from './firebase';
import { getState } from './localStorage.js';
import { isOnline } from './checkIfOnline.js';

export function userSaveToDatabase() {
  if (!isOnline()) {
    return feedbackMessage('You are not connected to the internet\n, try again later...');
  }

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      const response = window.confirm('Are you sure you want to Upload/Overwrite current tasks?');
      try {
        if (response) {
          feedbackMessageNormal('Saving...');
          // if no todo exist DO NOT SAVE
          const todos = getState()?.todos;
          if (!todos) {
            return;
          }
          const database = getDatabase(app);
          set(ref(database, 'tasks/'), { [user.uid]: JSON.stringify(getState()) });
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
    return feedbackMessage('Please register or sign in to save your tasks');
  });
}
