import { updateOneInLocalStorage } from '../utils/localStorage.js';

/**
 * Updates the completion status of a todo item.
 * Toggles the `completed` property of the todo in localStorage based on its current state.
 *
 * @function updateCompletedStatus
 * @param {Event} event - The event object triggered by the status update action.
 * @returns {void}
 */
export function updateCompletedStatus(event) {
  const todo = event.target; // The element that triggered the event
  const listItem = event.target.closest('li'); // The closest <li> element containing the todo
  const { id } = listItem.dataset; // Extract the todo ID from the dataset

  // Update the completion status in localStorage
  if (todo.classList.contains('completed')) {
    return updateOneInLocalStorage({ id, completed: true }); // Mark the todo as completed
  }
  updateOneInLocalStorage({ id, completed: false }); // Mark the todo as not completed
}
