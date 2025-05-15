import { addToLocalStorage } from '../utils/localStorage.js';
import { processTodo } from './processTodo.js';
import { feedbackMessage } from '../utils/feedbackMessage.js';
import { updateDOM } from '../ui/updateDOM.js';

/**
 * Creates a single todo item from the provided message.
 * Processes the message into a todo object, saves it to localStorage,
 * and updates the DOM. Displays an error message if the process fails.
 *
 * @function createOneTodo
 * @param {String} message - The message to create a todo from.
 * @returns {void}
 */
export function createOneTodo(message) {
  const TODO = processTodo(message); // Process the message into a todo object

  try {
    if (TODO) {
      addToLocalStorage(TODO); // Save the todo to localStorage
      return updateDOM(); // Update the DOM with the new todo
    }
  } catch (error) {
    // Log the error and display an error message to the user
    console.error(error);
    feedbackMessage(error.message);
  }
}
