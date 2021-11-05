import { getAuth, signOut } from 'firebase/auth';
import { feedbackMessage, feedbackMessageNormal } from './feedbackMessage.js';
import { showLogin } from './showLogin';

export function logout(event) {
  event.preventDefault();
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      showLogin();
      feedbackMessageNormal('logged out successfully');
    })
    .catch((error) => {
      // An error happened.
      feedbackMessage('An error occurred logging out');
    });
}
