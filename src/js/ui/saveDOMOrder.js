import { getState, saveState } from '../utils/localStorage';

/**
 * Saves the current order of todos in the DOM to the application state.
 * Extracts the IDs of the todos from the DOM and updates the `order` property in the state.
 *
 * @function saveDOMOrder
 * @returns {void}
 */
export function saveDOMOrder() {
  const listOfTodos = [...document.querySelectorAll('li')]; // Get all <li> elements representing todos
  const listOfIds = []; // Initialize an array to store the IDs of the todos

  // Extract the IDs from the DOM elements and add them to the list
  listOfTodos.forEach((item) => {
    listOfIds.push(+item.dataset.id); // Convert the ID to a number and add it to the list
  });

  const state = getState(); // Retrieve the current application state

  // Update the state with the new order if there are any IDs
  if (listOfIds.length > 0) {
    state.order = listOfIds; // Update the `order` property in the state
    saveState(state); // Save the updated state to localStorage
  }
}
