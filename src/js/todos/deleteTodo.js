import { deleteOneFromLocalStorage } from '../utils/localStorage.js';
import { updateDOM } from '../ui/updateDOM.js';

/**
 * Removes a todo item by its ID.
 * Deletes the todo from localStorage and updates the DOM to reflect the changes.
 *
 * @function removeTodo
 * @param {Event} e - The event object triggered by the delete action.
 * @returns {void}
 */
export function removeTodo(e) {
  const { id } = e.target.dataset; // Extract the todo ID from the dataset

  // Delete the todo from localStorage
  deleteOneFromLocalStorage(id);

  // Refresh the DOM to reflect the changes
  updateDOM();
}
