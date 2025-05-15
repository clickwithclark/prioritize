/**
 * Adds a "grab" cursor style to all draggable elements within the todo list.
 * Ensures the cursor style is visually consistent for draggable items.
 *
 * @function addGrabCursor
 * @returns {void}
 */
export function addGrabCursor() {
  const todoList = document.querySelector('#todoList'); // The todo list container
  const allGrippableDescendents = [...todoList.querySelectorAll('.grip')]; // Select all elements with the "grip" class

  // Apply the "grab" cursor style to each grippable element
  allGrippableDescendents.forEach((element) => {
    element.style.setProperty('cursor', 'grab');
  });

  // Set the default cursor style for the todo list
  todoList.style.cursor = 'default';
}
