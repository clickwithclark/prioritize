export function addGrabbingCursor(event) {
  event.target.style.cursor = 'grabbing';
  const todoList = document.querySelector('#todoList');
  todoList.style.cursor = 'grabbing';
}
