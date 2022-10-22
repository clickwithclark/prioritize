export function hideNetworkBtns() {
  const saveBtn = document.querySelector('.save-btn');
  const downloadBtn = document.querySelector('.download-btn');
  const login = document.querySelector('#login-form');
  const logout = document.querySelector('#logout-form');
  // mobile view
  const menuToggler = document.querySelector('.navbar-toggler');

  saveBtn.style.visibility = 'hidden';
  downloadBtn.style.visibility = 'hidden';
  login.style.visibility = 'hidden';
  logout.style.visibility = 'hidden';
  menuToggler.style.visibility = 'hidden';
}
