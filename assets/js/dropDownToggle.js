export function dropDownToggle() {
  const input = document.querySelector('#todoInput');
  input.classList.toggle('pop-out-fade-out');
  input.focus();
}
