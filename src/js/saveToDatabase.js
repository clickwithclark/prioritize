import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { feedbackMessageNormal } from './feedbackMessage.js';
import { app } from './firebase';
import { getState } from './localStorage.js';

export function saveToDatabase() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      feedbackMessageNormal('Saving...');
      const database = getDatabase(app);
      return set(ref(database, 'tasks/'), {
        [user.uid]: JSON.stringify(getState()),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
