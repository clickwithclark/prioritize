import { updateDOM } from '../ui/updateDOM.js';
import { deleteOneFromLocalStorage } from '../utils/localStorage.js';

/**
 * Deletes a completed task from the DOM and localStorage.
 * Animates the removal of the task, updates the localStorage, and refreshes the DOM.
 *
 * @function deleteCompletedTask
 * @param {Event} event - The event object triggered by the delete action.
 * @returns {void}
 */
export function deleteCompletedTask(event) {
  const liToRemove = event.target.closest('li'); // Find the closest <li> element to remove
  const { id } = liToRemove.dataset; // Extract the task ID from the dataset

  // Apply transition styles for a smooth removal animation
  liToRemove.style.transition = '0.3s';
  liToRemove.style.opacity = 0; // Fade out the task
  liToRemove.style.marginTop = '-40px'; // Slide the task upwards

  // Remove the task from localStorage
  deleteOneFromLocalStorage(+id);

  // Remove the task from the DOM after the animation completes
  setTimeout(() => {
    liToRemove.remove(); // Remove the <li> element from the DOM
    updateDOM(); // Refresh the DOM to reflect the changes
  }, 400); // Wait for the animation to complete (400ms)
}
