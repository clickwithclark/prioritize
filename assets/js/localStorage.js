import { getDefaultTodos } from './defaultTodos.js';

export function getState() {
  return JSON.parse(localStorage.getItem('state'));
}
export function saveState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}
export function retrieveFromLocalStorage() {
  const state = { ...getState() };
  // wrapped in object incase state is null or undefined
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  const defaultTodos = getDefaultTodos();

  if (Object.keys(currentStored).length === 0) {
    // if no todos exist show demo todos
    document.querySelector('#todoList').style.opacity = '0.5';
    return defaultTodos;
  }
  return currentStored;
}

export function addToLocalStorage(givenTodo) {
  // get current stored todos first then append new todo
  const state = { ...getState() };
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  if (Object.keys(currentStored).length === 0) {
    document.querySelector('#todoList').style.opacity = '1';
  }
  Object.assign(currentStored, { [givenTodo.id]: givenTodo });
  // latest todo gets first index to be top of list
  state.order = state?.order ?? [];
  state.order = [givenTodo.id, ...state.order];
  state.todos = currentStored;
  saveState(state);
}
export function updateTodo(givenTodo) {
  // get current stored todos first then append new todo
  const state = { ...getState() };
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  Object.assign(currentStored, { [givenTodo.id]: givenTodo });
  state.todos = currentStored;
  saveState(state);
}

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

export function updateOneInLocalStorage(partialTodo) {
  // get current stored todos first then modify new todo properties
  const state = { ...getState() };

  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  // if no todos are stored then assume demo mode and DO NOT save;
  if (Object.keys(currentStored).length === 0) {
    return;
  }

  let todoToUpdate = currentStored[partialTodo.id];
  todoToUpdate = { ...todoToUpdate, ...partialTodo };
  Object.assign(currentStored, { [todoToUpdate.id]: todoToUpdate });
  state.todos = currentStored;
  saveState(state);
}

export function saveTodoOrder(sortedTodos) {
  const state = { ...getState() };
  const order = [];
  sortedTodos.forEach((element) => {
    order.push(+element[0]);
  });
  state.order = order;
  saveState(state);
}

export function saveDOMOrder() {
  const listOfTodos = [...document.querySelectorAll('li')];
  const listOfIds = [];
  listOfTodos.forEach((item) => {
    listOfIds.push(+item.dataset.id);
  });

  const state = getState();
  if (listOfIds.length > 0) {
    state.order = listOfIds;
    saveState(state);
  }
}
export function clearUpdateConfig() {
  let state = getState();
  state = state ?? {};
  state.updateConfig = null;
  saveState(state);
}

export function saveUpdateConfig(config) {
  const state = getState();
  /*
   * It is possible the user may want to try editing one of the demo tasks
   * so if the user is trying to update a todo that does not exists
   * create a new one from the contents of user input
   *
   * since the input eventlistener checks for the presence of a config file to
   * distinguish an update from a create, nullify the config file passed.
   */

  if (state?.todos?.[config.updatedTodo.id] ?? false) {
    state.updateConfig = config;
    return saveState(state);
  }
  clearUpdateConfig();
}
