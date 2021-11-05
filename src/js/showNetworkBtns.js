export function showNetworkBtns() {
  const saveBtn = document.querySelector('.save-btn');
  const downloadBtn = document.querySelector('.download-btn');
  const login = document.querySelector('#login-form');
  const logout = document.querySelector('#logout-form');
  saveBtn.style.visibility = 'visible';
  downloadBtn.style.visibility = 'visible';
  login.style.visibility = 'visible';
  logout.style.visibility = 'visible';
}
