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

export function updateOneInLocalStorage(partialTodo) {
  // get current stored todos first then append new todo
  const currentStored = retrieveFromLocalStorage();
  let updatedTodo = currentStored[partialTodo.id];
  updatedTodo = { ...updatedTodo, ...partialTodo };
  Object.assign(currentStored, { [updatedTodo.id]: updatedTodo });

  localStorage.setItem('todos', JSON.stringify(currentStored));
}
