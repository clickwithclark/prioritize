/**
 * Ends the update process for a todo item.
 * Clears the input field, resets its placeholder, and removes the editing indicator.
 *
 * @function endUpdate
 * @param {HTMLInputElement} input - The input field used for editing the todo.
 * @returns {void}
 */
export function endUpdate(input) {
  input.value = ''; // Clear the input field
  input.placeholder = 'Add New Task...📄'; // Reset the placeholder text
  input.classList.remove('editing-in-progress'); // Remove the editing indicator class
}
