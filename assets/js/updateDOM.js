import { addTodoToDOM } from './addTodoToDOM.js';
import { retrieveFromLocalStorage } from './localStorage.js';

export function updateDOM() {
  const list = document.querySelector('#todoList');
  list.innerHTML = '';
  const storedTodos = retrieveFromLocalStorage();
  Object.keys(storedTodos).forEach((oneTodo) => {
    addTodoToDOM(storedTodos[oneTodo]);
  });
}
