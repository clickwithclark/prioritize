/**
 * Displays the logout form and hides the login form.
 * Adjusts the visibility and alignment of the logout form in the UI.
 *
 * @function showLogOut
 * @returns {void}
 */
export function showLogOut() {
  // Hide the login form
  document.querySelector('#login-form').style.setProperty('display', 'none', 'important');

  // Show the logout form
  document.getElementById('logout-form').style.setProperty('display', 'block', 'important');

  // Align the logout form to the right
  document.getElementById('logout-form').style.setProperty('text-align', 'right', 'important');
}
