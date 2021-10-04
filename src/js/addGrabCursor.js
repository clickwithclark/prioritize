export function addGrabCursor() {
  const todoList = document.querySelector('#todoList');
  const allGrippableDescendents = [...todoList.querySelectorAll('.grip')];
  allGrippableDescendents.forEach((element) => {
    element.style.setProperty('cursor', 'grab');
  });
  todoList.style.cursor = 'default';
}
