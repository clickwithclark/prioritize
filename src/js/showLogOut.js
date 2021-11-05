export function showLogOut() {
  document.querySelector('#login-form').style.setProperty('display', 'none', 'important');
  document.getElementById('logout-form').style.setProperty('display', 'block', 'important');
  document.getElementById('logout-form').style.setProperty('text-align', 'right', 'important');
}
