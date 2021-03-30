import { mapToObject } from './mapToObject.js';
import { objectToMap } from './objectToMap.js';

export function retrieveFromLocalStorage() {
  const localStorageMappedTodos = new Map(JSON.parse(localStorage.getItem('todos')));
  const localStorageTodos = mapToObject(localStorageMappedTodos);

  return localStorageTodos !== null ? localStorageTodos : {};
}

export function addToLocalStorage(givenTodo) {
  // get current stored todos first then append new todo
  const currentStored = retrieveFromLocalStorage();

  Object.assign(currentStored, { [givenTodo.id]: givenTodo });

  const storedAsMap = objectToMap(currentStored);

  localStorage.setItem('todos', JSON.stringify([...storedAsMap]));
}

export function deleteOneFromLocalStorage(todoID) {
  const storedTodos = retrieveFromLocalStorage();
  delete storedTodos[todoID];
  const storedAsMap = objectToMap(storedTodos);
  localStorage.setItem('todos', JSON.stringify([...storedAsMap]));
}

export function updateOneInLocalStorage(partialTodo) {
  // get current stored todos first then append new todo
  const currentStored = retrieveFromLocalStorage();
  let updatedTodo = currentStored[partialTodo.id];
  updatedTodo = { ...updatedTodo, ...partialTodo };
  Object.assign(currentStored, { [updatedTodo.id]: updatedTodo });

  const storedAsMap = objectToMap(currentStored);
  localStorage.setItem('todos', JSON.stringify([...storedAsMap]));
}

export function sortedTodosToLocalStorage(sortedTodos) {
  localStorage.setItem('todos', JSON.stringify([...sortedTodos]));
}
