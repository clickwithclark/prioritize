import { addTodoToDOM } from './addTodoToDOM.js';
import { draggable } from './draggable.js';
import { retrieveFromLocalStorage, getState } from './localStorage.js';
import { tellUserAboutError } from './tellUserAboutError.js';

export function updateDOM() {
  const list = document.querySelector('#todoList');
  list.innerHTML = '';
  const storedTodos = retrieveFromLocalStorage();
  const state = getState()?.order;
  const storedOrder = state?.order ?? [];
  try {
    if (storedOrder.length === 0) {
      // show demo todos
      Object.keys(storedTodos).forEach((oneTodo) => {
        addTodoToDOM(storedTodos[oneTodo]);
      });
      draggable();
      return;
    }

    storedOrder.forEach((id) => {
      addTodoToDOM(storedTodos[+id]);
    });
    draggable();
  } catch (error) {
    tellUserAboutError(error);
  }
}
