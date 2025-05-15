import { getState, saveState } from '../utils/localStorage';

/**
 * Saves the order of todos to the application state.
 * Extracts the IDs from the sorted todos and updates the `order` property in the state.
 *
 * @function saveTodoOrder
 * @param {Array} sortedTodos - An array of sorted todo elements, where each element contains a todo ID.
 * @returns {void}
 */
export function saveTodoOrder(sortedTodos) {
  const state = { ...getState() }; // Retrieve the current application state
  const order = []; // Initialize an array to store the sorted order of todo IDs

  // Extract the IDs from the sorted todos and add them to the order array
  sortedTodos.forEach((element) => {
    order.push(+element[0]); // Convert the ID to a number and add it to the order array
  });

  state.order = order; // Update the order property in the state
  saveState(state); // Save the updated state to localStorage
}
