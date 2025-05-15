import { debounce } from "../utils/debounce.js";
import { writeToDatabase } from "../firebase/writeToDatabase.js";
import { updateCompletedStatus } from "../todos/updateTodoStatus.js";

/**
 * Marks a task as complete or incomplete.
 * Toggles the `completed` class on the task, updates its status in localStorage,
 * and saves the changes to the database.
 *
 * @function markTaskComplete
 * @param {Event} event - The event object triggered by the task completion action.
 * @returns {void}
 */
export function markTaskComplete(event) {
  const todo = event.target; // The task element that triggered the event

  // Prevent task state change if the user is editing
  if (todo.classList.contains("editing-in-progress")) {
    return;
  }

  // Toggle the `completed` class on the task
  todo.classList.toggle("completed");

  // Toggle the visibility of the checkmark icon
  const checkmarkIcon = todo.previousElementSibling;
  checkmarkIcon.classList.toggle("show-checkmark");

  // Update the task's completion status in localStorage
  updateCompletedStatus(event);

  // Save the changes to the database with a debounce to prevent excessive writes
  debouncedSaveToDatabase();
}

// Debounced function to save changes to the database
const debouncedSaveToDatabase = debounce(writeToDatabase, 5);
