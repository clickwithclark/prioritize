import { saveUpdateConfig } from '../utils/localStorage.js';
import { updateDOM } from '../ui/updateDOM.js';

/**
 * Handles the editing of a todo item.
 * Prepares the input field for editing, scrolls to the editing area,
 * and saves the configuration for the update process.
 * The actual updating workflow is handled in `processInput`.
 *
 * @function editTodo
 * @param {Event} e - The event object triggered by the edit action.
 * @returns {void}
 */
export function editTodo(e) {
  const input = document.querySelector('#todoInput'); // Input field for editing
  const listItemToEdit = e.target.closest('li'); // The <li> element of the todo to edit
  const { id } = listItemToEdit.dataset; // Extract the todo ID from the dataset
  const todoOffset = listItemToEdit.offsetTop; // Offset position of the todo
  const editingAreaLocation = document.querySelector('h1').offsetTop; // Offset position of the editing area
  const messageNode = listItemToEdit.querySelector('.main-message'); // The message element of the todo
  const originalMessage = messageNode.innerText; // Original message of the todo

  // Prevent editing if the todo is completed (crossed off)
  if (messageNode.classList.contains('completed')) {
    return updateDOM(); // Refresh the DOM to reflect the current state
  }

  // Prepare the input field for editing
  const editValue = messageNode.innerText.replace('[', '(').replace(']', ')'); // Replace brackets with parentheses
  input.value = editValue; // Set the input value to the todo's message
  input.classList.add('editing-in-progress'); // Add a class to indicate editing is in progress
  input.classList.add('pop-out-fade-out'); // Add a fade-out animation class
  input.placeholder = `Updating: ${originalMessage.slice(0, 16)}...📑`; // Set a placeholder indicating the todo being updated
  window.scrollTo({ top: editingAreaLocation, behavior: 'smooth' }); // Scroll to the editing area smoothly

  // Capture the original ID for the todo
  const updatedTodo = {};
  updatedTodo.id = +id; // Convert the ID to a number

  /**
   * Configuration object for the update process.
   *
   * @config
   * @property {number} todoOffset - The offset top position of the todo.
   * @property {object} updatedTodo - A partial object of the todo being updated.
   * @property {number} updatedTodo.id - The ID of the todo being updated.
   */
  const config = { todoOffset, updatedTodo };
  saveUpdateConfig(config); // Save the configuration for the update process
}
