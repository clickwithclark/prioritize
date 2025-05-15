import { updateDOM } from '../ui/updateDOM.js';
import { getState, saveState } from '../utils/localStorage.js';
import {
  feedbackMessage,
  resetLogo,
  feedbackMessageNormal,
} from '../utils/feedbackMessage.js';

const appContainer = document.querySelector('.app-container'); // Main application container
const logo = document.querySelector('#logo'); // Logo element
const appName = document.querySelector('.app-name'); // Application name element
const popUp = document.querySelector('.confirmation-popup'); // Confirmation popup element
const logoContainer = document.querySelector('.logo-container'); // Logo container element

/**
 * Displays a confirmation dialog for deleting all todos.
 * Blurs the application UI and shows a confirmation popup.
 * If no tasks exist, displays an error message.
 *
 * @function deleteAllTodosDialog
 * @returns {void}
 */
export function deleteAllTodosDialog() {
  try {
    let todos = { ...getState()?.todos }; // Retrieve todos from the application state
    todos = todos ?? {}; // Ensure todos is an object
    if (Object.keys(todos).length === 0) {
      throw new Error(
        `You don't have any tasks to delete yet. That's just a demonstration.`
      );
    }

    // Blur the application UI and show the confirmation popup
    appContainer.classList.add('blur');
    logo.classList.add('negate-blur');
    logoContainer.classList.add('negate-blur');
    appName.classList.add('negate-blur');
    popUp.classList.add('active');
    popUp.classList.add('negate-blur');
    document.body.style.overflow = 'hidden'; // Disable scrolling
    feedbackMessage('Are you sure you want to delete all your Tasks?!', 300);
  } catch (error) {
    console.error(error); // Log the error
    feedbackMessage(error.message, 3); // Display an error message
  }
}

/**
 * Resets the modal UI to its default state.
 * Removes the blur effect and hides the confirmation popup.
 *
 * @function resetModalUI
 * @returns {void}
 */
export function resetModalUI() {
  document.body.style.overflow = ''; // Enable scrolling
  popUp.classList.remove('negate-blur');
  popUp.classList.remove('active');
  appName.classList.remove('negate-blur');
  logoContainer.classList.remove('negate-blur');
  logo.classList.remove('negate-blur');
  appContainer.classList.remove('blur');
}

/**
 * Resets the entire application UI to its default state.
 * Resets the logo, modal UI, and updates the DOM.
 *
 * @function resetAppUI
 * @returns {void}
 */
export function resetAppUI() {
  resetLogo(); // Reset the logo to its default state
  resetModalUI(); // Reset the modal UI
  updateDOM(); // Update the DOM
}

/**
 * Cancels the delete operation and resets the UI.
 * Displays a feedback message indicating the operation was canceled.
 *
 * @function cancelDelete
 * @returns {void}
 */
export function cancelDelete() {
  resetAppUI(); // Reset the application UI
  feedbackMessage('Phew! . . .that was close!', 2); // Display a cancellation message
}

/**
 * Confirms the delete operation and deletes all todos.
 * Clears the todos and order from the application state, updates the DOM,
 * and displays a success message.
 *
 * @function confirmDelete
 * @returns {void}
 */
export function confirmDelete() {
  const state = getState(); // Retrieve the application state
  state.todos = null; // Clear all todos
  state.order = null; // Clear the order
  saveState(state); // Save the updated state
  resetAppUI(); // Reset the application UI
  updateDOM(); // Update the DOM
  feedbackMessageNormal('Done! . . .'); // Display a success message
}
