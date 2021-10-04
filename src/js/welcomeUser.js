import { feedbackMessageNormal } from './feedbackMessage.js';
import { showLogin } from './showLogin.js';
import { showLogOut } from './showLogOut';

/* -------------------------------------------------------------------*/
// #endregion [Firebase config]
/* -------------------------------------------------------------------*/
// #region [user Authentication]
/* -------------------------------------------------------------------*/
export function welcomeUser(user, greet = true) {
  if (user) {
    const username = user.email.split('@')[0];
    document.querySelector('#username').textContent = username;
    showLogOut();
    if (greet) {
      feedbackMessageNormal(`Welcome ${username}`);
    }
    return;
  }
  showLogin();
}
