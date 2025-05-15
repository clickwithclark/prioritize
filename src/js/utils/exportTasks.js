import { feedbackMessage, feedbackMessageNormal } from "./feedbackMessage.js";
import { getState } from "../utils/localStorage.js";

/**
 * Generates a string representation of all todos stored in the application state.
 * Each todo is formatted as a string, optionally including its category.
 *
 * @function todoExportString
 * @returns {String} A formatted string of todos, or an empty string if no todos exist.
 */
export function todoExportString() {
  const todos = getState()?.todos ?? {}; // Retrieve todos from the application state
  if (Object.keys(todos).length === 0) {
    return ""; // Return an empty string if no todos exist
  }

  let storedToExport; // String to store the formatted todos
  const hasCategory = {
    true: (todo) => (storedToExport += `, (${todo.category}) ${todo.message}`), // Format with category
    false: (todo) => (storedToExport += `, ${todo.message}`), // Format without category
  };

  // Iterate over todos and format them based on whether they have a category
  Object.keys(todos).forEach((key) => {
    hasCategory[!!todos[key].category]?.(todos[key]);
  });

  // Remove any accidental leading "undefined" from the string
  storedToExport = storedToExport.replace("undefined", "");

  // Remove the first leading comma and trim whitespace
  storedToExport = storedToExport.slice(1).trim();

  return storedToExport; // Return the formatted string
}

/**
 * Exports all tasks to the clipboard as a formatted string.
 * If no tasks exist, displays an error message to the user.
 *
 * @function exportTask
 * @param {Event} event - The event object triggered by the export action.
 * @returns {void}
 */
export function exportTask(event) {
  const exportedString = todoExportString() || ""; // Generate the export string
  navigator.clipboard.writeText(exportedString); // Copy the string to the clipboard

  // Provide feedback to the user based on whether tasks were exported
  return exportedString
    ? feedbackMessageNormal(`copied to your clipboard !`)
    : feedbackMessage("You have no tasks to export !");
}
