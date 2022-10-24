import { getAuth } from 'firebase/auth';
import { isOnline } from './checkIfOnline.js';
import { feedbackMessage } from './feedbackMessage.js';
import { updateFromDB } from './updateFromDB.js';

export function userDownloadFromDatabase() {
  if (!isOnline()) {
    return feedbackMessage(
      'You are not connected to the internet\n, try again later...'
    );
  }
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      if (window.confirm('Are you sure you want to overwrite current tasks?')) {
        return updateFromDB();
      }
      return feedbackMessage('Few... !');
    } catch (error) {
      console.log(error);
    }
  }
  return feedbackMessage('Please sign in to download your tasks !');
}
