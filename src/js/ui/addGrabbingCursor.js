/**
 * Adds a "grabbing" cursor style to the target element and the todo list.
 * Visually indicates that a draggable item is being dragged.
 *
 * @function addGrabbingCursor
 * @param {Event} event - The drag event triggered by the user.
 * @returns {void}
 */
export function addGrabbingCursor(event) {
  event.target.style.cursor = 'grabbing'; // Set the cursor style to "grabbing" for the dragged element
  const todoList = document.querySelector('#todoList'); // The todo list container
  todoList.style.cursor = 'grabbing'; // Set the cursor style to "grabbing" for the todo list
}
