export function retrieveFromLocalStorage() {
  const localStorageTodos = JSON.parse(localStorage.getItem('todos'));

  return localStorageTodos !== null ? localStorageTodos : {};
}

export function addToLocalStorage(givenTodo) {
  // get current stored todos first then append new todo
  const currentStored = retrieveFromLocalStorage();

  Object.assign(currentStored, { [givenTodo.id]: givenTodo });

  localStorage.setItem('todos', JSON.stringify(currentStored));
}

export function deleteOneFromLocalStorage(todoID) {
  const storedTodos = retrieveFromLocalStorage();
  delete storedTodos[todoID];
  localStorage.setItem('todos', JSON.stringify(storedTodos));
}
