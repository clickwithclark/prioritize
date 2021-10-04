import { addTodoToDOM } from './addTodoToDOM.js';
import { draggable } from './draggable.js';
import { retrieveFromLocalStorage, getState } from './localStorage.js';
import { feedbackMessage, resetLogo } from './feedbackMessage.js';
import { loadGroups } from './loadGroups.js';

export function updateDOM() {
  const list = document.querySelector('#todoList');
  list.innerHTML = '';
  const storedTodos = retrieveFromLocalStorage();
  const storedOrder = getState()?.order ?? [];
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
    list.style.opacity = '1';
    draggable();
    resetLogo();
    loadGroups();
  } catch (error) {
    console.error(error);
  }
}
