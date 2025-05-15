import { updateDOM } from './updateDOM.js';
import { clearUpdateConfig } from '../utils/localStorage.js';
import { endUpdate } from '../todos/endUpdate.js';

/**
 * Handles the focus-out event for the todo input field.
 * Ends the update process, clears the update configuration, and refreshes the DOM.
 *
 * @function focusOut
 * @param {FocusEvent} event - The focus-out event triggered by the input field losing focus.
 * @returns {void}
 */
export function focusOut(event) {
  endUpdate(event.target); // End the update process for the input field
  clearUpdateConfig(); // Clear the update configuration
  updateDOM(); // Refresh the DOM to reflect any changes
}
