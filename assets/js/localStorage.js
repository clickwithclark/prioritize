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
  const currentStored = { ...state?.todos };
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
  const currentStored = { ...state?.todos };
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
  const currentStored = { ...state?.todos };
  Object.assign(currentStored, { [givenTodo.id]: givenTodo });
  state.todos = currentStored;
  saveState(state);
}

export function deleteOneFromLocalStorage(todoID) {
  const state = { ...getState() };
  let order = [...getState()?.order];
  const currentStored = { ...state?.todos };
  order = order.filter((id) => id !== todoID);
  delete currentStored[todoID];
  state.todos = currentStored;
  console.log(order);
  state.order = order;
  saveState(state);
}

export function updateOneInLocalStorage(partialTodo) {
  // get current stored todos first then modify new todo properties
  const state = { ...getState() };
  const currentStored = { ...state?.todos };

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

export function saveSortedTodos(sortedTodos) {
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
export function saveUpdateConfig(config) {
  const state = getState();
  state.updateConfig = config;
  saveState(state);
}
export function clearUpdateConfig() {
  const state = getState();
  state.updateConfig = null;
  saveState(state);
}
