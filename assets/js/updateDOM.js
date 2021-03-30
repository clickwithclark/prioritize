import { addTodoToDOM } from './addTodoToDOM.js';
import { retrieveFromLocalStorage } from './localStorage.js';

export function updateDOM() {
  const list = document.querySelector('#todoList');
  list.innerHTML = '';
  const storedTodos = retrieveFromLocalStorage();
  const mappedTodos = new Map(JSON.parse(localStorage.getItem('todos')));
  if (mappedTodos.size === 0) {
    Object.keys(storedTodos).forEach((oneTodo) => {
      addTodoToDOM(storedTodos[oneTodo]);
    });
    return;
  }
  mappedTodos.forEach((value) => {
    addTodoToDOM(value);
  });
}
