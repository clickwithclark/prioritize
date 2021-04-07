export function endUpdate(input) {
  input.value = '';
  input.placeholder = 'Add New Task...📄';
  input.classList.remove('editing-in-progress');
}
