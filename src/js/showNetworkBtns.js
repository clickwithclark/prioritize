export function showNetworkBtns() {
  const saveBtn = document.querySelector('.save-btn');
  const login = document.querySelector('#login-form');
  const logout = document.querySelector('#logout-form');
  // mobile view
  const menuToggler = document.querySelector('.navbar-toggler');

  saveBtn.style.visibility = 'visible';
  login.style.visibility = 'visible';
  logout.style.visibility = 'visible';
  menuToggler.style.visibility = 'visible';
}
