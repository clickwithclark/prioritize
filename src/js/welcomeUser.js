import { feedbackMessageNormal } from "./feedbackMessage.js";
import { showLogin } from "./showLogin.js";
import { showLogOut } from "./showLogOut";

/* -------------------------------------------------------------------*/
// #endregion [Firebase config]
/* -------------------------------------------------------------------*/
// #region [user Authentication]
/* -------------------------------------------------------------------*/
export async function welcomeUser(user, greet = true) {
  if (!user) {
    return showLogin();
  }
  const username = user.email.split("@")[0];
  document.querySelector("#username").textContent = username;
  showLogOut();
  if (greet) {
    return feedbackMessageNormal(`Welcome ${username}`);
  }
  return;
}
