export function showLogin() {
  document
    .querySelector('#login-form')
    .style.setProperty('display', 'block', 'important');
  document
    .getElementById('logout-form')
    .style.setProperty('display', 'none', 'important');
}
