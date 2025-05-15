import { createOneTodo } from './createOneTodo.js';
import { createManyTodos } from './createManyTodos.js';
import { processGroupedTodos } from './processGroupedTodos.js';
import { feedbackMessage } from '../utils/feedbackMessage.js';

/**
 * Adds a new todo or multiple todos based on the input format.
 * Handles single todos, multiple todos, and grouped todos.
 * Displays error messages if the input format is invalid.
 *
 * @function addTodo
 * @returns {void}
 */
export function addTodo() {
  const message = document.querySelector('#todoInput').value.trim(); // Get and trim the input value

  // Check if the input contains a single todo (no commas)
  if (message.indexOf(',') === -1) {
    return createOneTodo(message); // Create a single todo
  }

  // Check if the input contains a grouped multi-entry format
  const listGrouping = message.match(/^\(.*\):|^\(.*\)\s:/i); // Matches '(category):' format
  const multiEntry = message.split(/(\(([^)]*)\)[^)]*$)/); // Split input at the last pair of parentheses
  const regularTodos = multiEntry[0]; // Regular multi-entry todos
  const groupedTodos = multiEntry[1]; // Grouped multi-entry todos

  if (listGrouping) {
    /**
     * At this point, the user has chosen multi-entry with grouping.
     * Tasks after the grouping will belong to the specified group.
     * If assumptions about the input format are incorrect, an error is thrown.
     */

    try {
      // If no preceding entries exist, handle grouped tasks only
      if (regularTodos.length === 0) {
        const groupedTasks = processGroupedTodos(groupedTodos);
        return createManyTodos(groupedTasks); // Create grouped todos
      }

      // Handle both grouped and ungrouped tasks
      const grouped = processGroupedTodos(groupedTodos);
      const allTodos = `${regularTodos}${grouped}`;
      return createManyTodos(allTodos); // Create all todos
    } catch (error) {
      // Display an error message if processing fails
      feedbackMessage(`${error.message} inside`, 12);
    }
  }

  // Handle regular multi-entry todos
  return createManyTodos(message);
}
