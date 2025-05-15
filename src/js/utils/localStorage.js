import { getDefaultTodos } from '../todos/defaultTodos.js';

/**
 * Clears the update configuration from the state.
 * Sets `updateConfig` to null and saves the updated state.
 *
 * @function clearUpdateConfig
 */
export function clearUpdateConfig() {
  let state = getState();
  state = state ?? {};
  state.updateConfig = null;
  saveState(state);
}

/**
 * Retrieves the current application state from localStorage.
 *
 * @function getState
 * @returns {Object|null} The parsed state object or null if no state exists.
 */
export function getState() {
  return JSON.parse(localStorage.getItem('state'));
}

/**
 * Saves the provided state object to localStorage.
 *
 * @function saveState
 * @param {Object} state - The state object to save.
 */
export function saveState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Retrieves todos from localStorage or returns default todos if none exist.
 * If no todos are found, the demo todos are displayed with reduced opacity.
 *
 * @function retrieveFromLocalStorage
 * @returns {Object} The current todos or default todos.
 */
export function retrieveFromLocalStorage() {
  const state = { ...getState() };
  // Wrapped in object in case state is null or undefined
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  const defaultTodos = getDefaultTodos();

  if (Object.keys(currentStored).length === 0) {
    // If no todos exist, show demo todos
    document.querySelector('#todoList').style.opacity = '0.5';
    return defaultTodos;
  }
  return currentStored;
}

/**
 * Adds a new todo to localStorage.
 * Updates the order to place the new todo at the top of the list.
 *
 * @function addToLocalStorage
 * @param {Object} givenTodo - The todo object to add.
 */
export function addToLocalStorage(givenTodo) {
  // Get current stored todos first, then append new todo
  const state = { ...getState() };
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  if (Object.keys(currentStored).length === 0) {
    document.querySelector('#todoList').style.opacity = '1';
  }
  Object.assign(currentStored, { [givenTodo.id]: givenTodo });
  // Latest todo gets first index to be at the top of the list
  state.order = state?.order ?? [];
  state.order = [givenTodo.id, ...state.order];
  state.todos = currentStored;
  saveState(state);
}

/**
 * Deletes a specific todo from localStorage by its ID.
 * Updates the order and removes the todo from the stored list.
 *
 * @function deleteOneFromLocalStorage
 * @param {String} todoID - The ID of the todo to delete.
 */
export function deleteOneFromLocalStorage(todoID) {
  const state = { ...getState() };
  let order = [...getState()?.order];
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  order = order.filter((id) => id !== todoID);
  delete currentStored[todoID];
  state.todos = currentStored;
  state.order = order;
  saveState(state);
}

/**
 * Updates a specific todo in localStorage with new properties.
 * If no todos are stored, assumes demo mode and does not save.
 *
 * @function updateOneInLocalStorage
 * @param {Object} partialTodo - The todo object with updated properties.
 */
export function updateOneInLocalStorage(partialTodo) {
  // Get current stored todos first, then modify new todo properties
  const state = { ...getState() };

  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  // If no todos are stored, assume demo mode and DO NOT save
  if (Object.keys(currentStored).length === 0) {
    return;
  }

  let todoToUpdate = currentStored[partialTodo.id];
  todoToUpdate = { ...todoToUpdate, ...partialTodo };
  Object.assign(currentStored, { [todoToUpdate.id]: todoToUpdate });
  state.todos = currentStored;
  saveState(state);
}

/**
 * Saves the update configuration to the state.
 * If the todo being updated does not exist, clears the update configuration.
 *
 * @function saveUpdateConfig
 * @param {Object} config - The update configuration object.
 */
export function saveUpdateConfig(config) {
  const state = getState();
  /*
   * It is possible the user may want to try editing one of the demo tasks,
   * so if the user is trying to update a todo that does not exist,
   * create a new one from the contents of user input.
   *
   * Since the input event listener checks for the presence of a config file to
   * distinguish an update event from a create event, nullify the config file passed.
   */
  if (state?.todos?.[config.updatedTodo.id]) {
    state.updateConfig = config;
    return saveState(state);
  }
  clearUpdateConfig();
}
