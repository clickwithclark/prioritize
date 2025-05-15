/**
 * Displays the login form and hides the logout form.
 * Adjusts the visibility of the login and logout forms in the UI.
 *
 * @function showLogin
 * @returns {void}
 */
export function showLogin() {
  // Show the login form
  document
    .querySelector('#login-form')
    .style.setProperty('display', 'block', 'important');

  // Hide the logout form
  document
    .getElementById('logout-form')
    .style.setProperty('display', 'none', 'important');
}
