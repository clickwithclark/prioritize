import { feedbackMessage, feedbackMessageNormal } from '../utils/feedbackMessage.js';
import { getState, saveState } from '../utils/localStorage.js';
import { saveTodoOrder } from '../ui/saveTodoOrder.js';
import { updateDOM } from '../ui/updateDOM.js';

/**
 * Deletes all completed tasks from the application state and updates the DOM.
 * If no tasks exist or no tasks are marked as completed, displays an error message.
 *
 * @function deleteSelected
 * @returns {void}
 */
export function deleteSelected() {
  const state = { ...getState() }; // Retrieve the current application state
  const todos = state?.todos; // Get the todos from the state

  try {
    // Check if there are any tasks to delete
    if (!todos) {
      throw new Error(
        `You don't have any tasks to delete yet. That's just a demonstration.`
      );
    }

    // Filter completed tasks
    const completedTodos = Object.entries(todos).filter(
      (todo) => todo[1].completed === true
    );

    // If no tasks are completed, display an error message
    if (completedTodos.length === 0) {
      throw new Error(`No tasks are completed yet. . .
To mark a task as complete,
click on the task name.`);
    }

    // Filter tasks to keep (not completed)
    const todosToKeep = Object.entries(todos).filter(
      (todo) => todo[1].completed === false
    );

    // Update the state with tasks to keep
    state.todos = Object.fromEntries(todosToKeep);
    saveState(state); // Save the updated state to localStorage
    saveTodoOrder(todosToKeep); // Save the updated task order
    updateDOM(); // Refresh the DOM to reflect the changes
    feedbackMessageNormal('Done! . . .'); // Display a success message
  } catch (error) {
    console.error(error); // Log the error
    feedbackMessage(error.message, 3); // Display an error message to the user
  }
}
