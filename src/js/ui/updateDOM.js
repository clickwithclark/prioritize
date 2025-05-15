import { addTodoToDOM } from './addTodoToDOM.js';
import { draggable } from './draggable.js';
import { retrieveFromLocalStorage, getState } from '../utils/localStorage.js';
import { feedbackMessage, resetLogo } from '../utils/feedbackMessage.js';
import { loadGroups } from './loadGroups.js';
import { showScrollBar } from './showScrollBar.js';
import { hideScrollBar } from './hideScrollBar.js';

/**
 * Updates the DOM to reflect the current state of todos.
 * Clears the todo list, retrieves todos from localStorage, and re-renders them in the DOM.
 * Handles demo todos, task ordering, and UI adjustments like scrollbars and draggable functionality.
 *
 * @function updateDOM
 * @returns {void}
 */
export function updateDOM() {
  const list = document.querySelector('#todoList'); // The todo list container

  // Clear the todo list
  list.innerHTML = '';

  // Retrieve todos and their order from localStorage
  const storedTodos = retrieveFromLocalStorage();
  const storedOrder = getState()?.order ?? [];

  try {
    // If no order exists, display demo todos
    if (storedOrder.length === 0) {
      Object.keys(storedTodos).forEach((oneTodo) => {
        addTodoToDOM(storedTodos[oneTodo]); // Add each demo todo to the DOM
      });
      draggable(); // Enable draggable functionality
      return;
    }

    // Render todos based on their stored order
    storedOrder.forEach((id) => {
      addTodoToDOM(storedTodos[+id]); // Add each todo to the DOM in the correct order
    });

    list.style.opacity = '1'; // Ensure the todo list is fully visible
    draggable(); // Enable draggable functionality
    resetLogo(); // Reset the logo to its default state
    loadGroups(); // Load grouped todos if applicable
  } catch (error) {
    console.error(error); // Log any errors that occur during the update process
  }

  // Adjust the scrollbar visibility based on the number of tasks
  storedOrder.length >= 4 ? showScrollBar() : hideScrollBar();
}
