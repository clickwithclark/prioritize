import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { welcomeUser } from './welcomeUser';

export function observeUserState() {
  onAuthStateChanged(getAuth(), (user) => {
    welcomeUser(user, false);
  });
}
