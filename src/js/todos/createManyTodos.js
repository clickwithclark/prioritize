import { createOneTodo } from './createOneTodo.js';
import { feedbackMessage } from '../utils/feedbackMessage.js';

/**
 * Creates multiple todos from a comma-separated string.
 * Splits the input string into individual tasks and creates each task.
 * Limits the number of tasks to prevent app freezing.
 * Displays an error message if the input exceeds the maximum allowed tasks.
 *
 * @function createManyTodos
 * @param {String} note - A comma-separated string of tasks to create.
 * @returns {void}
 */
export function createManyTodos(note) {
  const list = note.split(','); // Split the input string into individual tasks

  // Prevent app freezing by only accepting a maximum of 30 tasks at a time
  try {
    if (list.length > 30) {
      throw new Error(`Woah ! Woah !. . . that's too many at one time! I'll only accept <span class="good">30</span>, 
      you tried to enter <span class="bad">${list.length}</span> tasks!`);
    }

    // Create each task from the list
    list.forEach((listItem) => {
      createOneTodo(listItem.trim()); // Trim whitespace and create the task
    });
  } catch (error) {
    // Log the error and display an error message to the user
    console.error(error.message);
    feedbackMessage(error.message, 10);
  }
}
