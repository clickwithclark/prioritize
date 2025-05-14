import { addTodoToDOM } from './addTodoToDOM.js';
import { draggable } from './draggable.js';
import { retrieveFromLocalStorage, getState } from '../utils/localStorage.js';
import { feedbackMessage, resetLogo } from '../utils/feedbackMessage.js';
import { loadGroups } from './loadGroups.js';
// import { isOnline } from './checkIfOnline.js';
// import { hideNetworkBtns } from './hideNetworkBtns';
// import { showNetworkBtns } from './showNetworkBtns';
import { showScrollBar } from './showScrollBar.js';
import { hideScrollBar } from './hideScrollBar.js';

export function updateDOM() {
  const list = document.querySelector('#todoList');

  // hide buttons if no internet available
  // eslint-disable-next-line no-unused-expressions
  // isOnline() ? showNetworkBtns() : hideNetworkBtns();

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

  // hide scrollbar for less than 4 tasks
  // eslint-disable-next-line no-unused-expressions
  storedOrder.length >= 4 ? showScrollBar() : hideScrollBar();
}
