import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { feedbackMessage } from './feedbackMessage.js';
import { saveToDatabase } from './saveToDatabase.js';
import { updateDOM } from './updateDOM.js';
import { updateFromDB } from './updateFromDB.js';
import { welcomeUser } from './welcomeUser';

export function login(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence)
    .then(() => signInWithEmailAndPassword(auth, email, password))

    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      welcomeUser({ user, email });
      // update the db
      const answer = window.confirm('Do you want to download remote tasks?');
      if (answer) {
        (async () => {
          updateFromDB();
        })();
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('An error occurred during sign up: ', errorMessage, 'Error Code: ', error.code);
      feedbackMessage('An error occurred siging up\n please make sure your password is at least 6 characters long', 6);
    });
}
