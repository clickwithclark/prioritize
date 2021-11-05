export function dropDownToggle() {
  const input = document.querySelector('#todoInput');
  const ul = document.querySelector('.list-group');
  input.classList.toggle('pop-out-fade-out');
  ul.classList.toggle('input-ready');
}
