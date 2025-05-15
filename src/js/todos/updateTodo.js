import { getState, saveState } from '../utils/localStorage';

/**
 * Updates an existing todo in the application state.
 * Replaces the todo with the given ID with the updated todo object.
 *
 * @function updateTodo
 * @param {Object} givenTodo - The updated todo object.
 * @param {number} givenTodo.id - The unique ID of the todo to update.
 * @returns {void}
 */
export function updateTodo(givenTodo) {
  // Get the current application state
  const state = { ...getState() };

  // Retrieve the current stored todos or initialize an empty object
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};

  // Update the todo with the given ID
  Object.assign(currentStored, { [givenTodo.id]: givenTodo });

  // Save the updated todos back to the state
  state.todos = currentStored;
  saveState(state); // Persist the updated state to localStorage
}
