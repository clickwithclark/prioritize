import { editTodo } from './editTodo.js';
import { addTodo } from './addTodo.js';
import { updateDOM } from './updateDOM.js';
import { addGlobalEventListener } from './addGlobalEventListener.js';

export function initializeEventListeners() {
  // entering todo info
  addGlobalEventListener('keydown', '#todoInput', (event) => {
    // when enter is pressed
    if (event.key === 'Enter') {
      try {
        addTodo();
      } catch (error) {
        console.error(error);
      }
    }
  });

  // editing existing todo
  addGlobalEventListener('pointerup', '.edit', editTodo);

  // adding new todo
  addGlobalEventListener('pointerup', '.drop-down-entry', () => {
    const input = document.querySelector('#todoInput');
    input.classList.toggle('pop-out-fade-out');
    input.focus();
  });
  /* -------------------------------------------------------------------*/
  // #region of grip button
  /* -------------------------------------------------------------------*/

  addGlobalEventListener('pointerdown', '.grip', (event) => {
    event.target.style.cursor = 'grabbing';
    const todoList = document.querySelector('#todoList');
    todoList.style.cursor = 'grabbing';
  });
  addGlobalEventListener('pointerup', '#todoList', (event) => {
    const todoList = document.querySelector('#todoList');
    const allGrippableDescendents = [...todoList.querySelectorAll('.grip')];
    allGrippableDescendents.forEach((element) => {
      element.style.setProperty('cursor', 'grab');
    });
    todoList.style.cursor = 'default';
  });

  /* -------------------------------------------------------------------*/
  // #endregion of grip button

  // selecting completed todos
  addGlobalEventListener('pointerdown', '.main-message', (event) => {
    const todo = event.target;
    // prevent todo saving as completed if user is editing
    if (todo.classList.contains('editing-in-progress')) {
      return;
    }
    todo.classList.toggle('completed');
    const checkmarkIcon = todo.previousElementSibling;
    checkmarkIcon.classList.toggle('show-checkmark');
  });

  // new one above

  updateDOM();
} // END initializeEventListeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
  initializeEventListeners();
}
