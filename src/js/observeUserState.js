import { getAuth, onAuthStateChanged } from "firebase/auth";
import { showLogOut } from "./showLogOut.js";
import { showLogin } from "./showLogin.js";

export function observeUserState() {
  onAuthStateChanged(getAuth(), (user) => {
 if (!user) {
   return showLogin();
 }
 const username = user.email.split("@")[0];
 document.querySelector("#username").textContent = username;
 showLogOut();
  });
}
