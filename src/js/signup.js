import { getAuth, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { feedbackMessage } from './feedbackMessage.js';
import { welcomeUser } from './welcomeUser';
import { isOnline } from './checkIfOnline.js';

export function signup(event) {
  event.preventDefault();
  if (!isOnline()) {
    return feedbackMessage('You are not currently online, please try again later', 6);
  }

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential;
      // hide form and greet user
      welcomeUser({ user, email });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error('An error occurred during sign up: ', errorMessage, 'Error Code: ', error.code);
      feedbackMessage('An error occurred siging up\n please make sure your password is at least 6 characters long', 6);
      // ..
    });
}
