import { editTodo } from './editTodo.js';
import { addTodo } from './addTodo.js';
import { updateDOM } from './updateDOM.js';
import { addGlobalEventListener } from './addGlobalEventListener.js';
import { updateTodoStatus } from './updateTodoStatus.js';
import { deleteOneFromLocalStorage } from './localStorage.js';
import { endUpdate } from './endUpdate.js';
import { dateSort } from './dateSort.js';

/* -------------------------------------------------------------------*/
// #region of TODO
/* -------------------------------------------------------------------*/

/**
  # TODO:[x]-completed [A]-priority-letter

  1. [] [A] add category sort

  2. [] [A] add date sort

  3. [] [A] make pwa

  4. [] [C] make a bundle with parcel

  5. [] [A] make draggable

  6. [] [] Sixth todo

  7. [] [] Seventh todo

  8. [] [] Eight todo

  9. [] [] Ninth todo

  10.[] [] Tenth todo

  {$@11. todo $@11}*5 //{$@16. todo $@16}*5


 */

/* -------------------------------------------------------------------*/
// #endregion of TODO

export function initializeEventListeners() {
  // entering todo info
  addGlobalEventListener('keydown', '#todoInput', (event) => {
    // when enter is pressed
    if (event.key === 'Enter') {
      try {
        addTodo();
        event.target.value = '';
      } catch (error) {
        console.error(error);
      }
    }
  });
  // cancel editing if focus lost
  addGlobalEventListener('focusout', '.main-message', (event) => {
    endUpdate(event.target);
    updateDOM();
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
    updateTodoStatus(event);
  });

  // delete todo & fade out
  addGlobalEventListener('pointerdown', '.checkmark', (event) => {
    const liToRemove = event.target.closest('li');
    console.log(liToRemove);
    const { id } = liToRemove.dataset;
    liToRemove.style.transition = '0.3s';
    liToRemove.style.opacity = 0;
    liToRemove.style.marginTop = '-40px';
    deleteOneFromLocalStorage(id);
    setTimeout(() => {
      liToRemove.remove();
      updateDOM();
    }, 400);
  });

  // date sort

  addGlobalEventListener('pointerdown', '.date-sort', dateSort.sort);

  // new one above

  updateDOM();
} // END initializeEventListeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
  initializeEventListeners();
}
