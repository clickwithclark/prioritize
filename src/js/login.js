import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { isOnline } from './checkIfOnline.js';
import { feedbackMessage } from './feedbackMessage.js';
import { updateFromDB } from './updateFromDB.js';
import { welcomeUser } from './welcomeUser';

export function login(event) {
  event.preventDefault();
  if (!isOnline()) {
    return feedbackMessage(
      'You are not currently online, please try again later',
      6
    );
  }
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence)
    .then(() => signInWithEmailAndPassword(auth, email, password))

    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;

      // update the db
      updateFromDB();
      welcomeUser({ user, email });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        'An error occurred during log in: ',
        errorMessage,
        'Error Code: ',
        error.code
      );
      return feedbackMessage(
        'An error occurred Logging in\n incorrect username or password',
        6
      );
    });
}
