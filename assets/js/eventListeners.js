import { editTodo } from './editTodo.js';
import { addTodo } from './addTodo.js';
import { updateDOM } from './updateDOM.js';
import { addGlobalEventListener } from './addGlobalEventListener.js';
import { updateCompletedStatus } from './updateTodoStatus.js';
import { deleteOneFromLocalStorage, getState, clearUpdateConfig, updateTodo } from './localStorage.js';
import { dateSort } from './dateSort.js';
import { categorySort } from './categorySort.js';
import { feedbackMessage } from './feedbackMessage.js';
import { processTodo } from './processTodo.js';
import { endUpdate } from './endUpdate.js';
import { deleteAllTodosDialog, confirmDelete, resetAppUI } from './deleteAllTodos.js';
import { deleteSelected } from './deleteSelected.js';
// global state management

// eslint-disable-next-line prefer-const
/* -------------------------------------------------------------------*/
// #region of TODO
/* -------------------------------------------------------------------*/

/**
  # TODO:[x]-completed [A]-priority-letter

  1. [x] [A] add category sort

  2. [x] [A] add date sort

  3. [] [A] make pwa

  4. [] [C] make a bundle with parcel

  5. [x] [A] make draggable

  6. [X] [X] no empty entry-logo saying noo

  
  

  8. [x] [x] sorted state  needs to persists

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
      if (event.target.classList.contains('editing-in-progress')) {
        const config = getState()?.updateConfig;
        if (config) {
          // user is trying to save updated todo
          const input = document.querySelector('#todoInput');
          try {
            const newTask = input.value.trim();
            // complain if invalid values
            if (newTask === '') {
              throw new Error('Woops, update cannot be blank! . . . try deleting it instead');
            }
            const updatedTodo = processTodo(newTask);
            updatedTodo.id = config.updatedTodo.id;
            updateTodo(updatedTodo);

            // reset input to pre-updating defaults

            endUpdate(input);
            clearUpdateConfig();

            // scroll back to original todo position in list

            window.scrollTo({ top: config.todoOffset, behavior: 'smooth' });

            updateDOM();
          } catch (error) {
            console.trace(error);
            feedbackMessage(error.message);
          }
        }
        // exit if no config exists, the user is probably editing
        return;
      }
      try {
        // complain if invalid values
        if (event.target.value.trim() === '') {
          throw new Error('Woops, you have to enter something first!');
        }
        // if this is first entry replace demo todos

        addTodo();
        event.target.value = '';
      } catch (error) {
        console.trace(error);
        feedbackMessage(error.message);
      }
    }
  });
  // cancel editing if focus lost
  // addGlobalEventListener('focusout', '#todoInput', (event) => {
  //   endUpdate(event.target);
  //   clearUpdateConfig();
  //   updateDOM();
  // });

  // edit existing todo
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
    // prevent todo state change if user is editing
    if (todo.classList.contains('editing-in-progress')) {
      return;
    }
    todo.classList.toggle('completed');
    const checkmarkIcon = todo.previousElementSibling;
    checkmarkIcon.classList.toggle('show-checkmark');
    updateCompletedStatus(event);
  });

  // delete todo & fade out
  addGlobalEventListener('pointerdown', '.checkmark', (event) => {
    const liToRemove = event.target.closest('li');
    const { id } = liToRemove.dataset;
    liToRemove.style.transition = '0.3s';
    liToRemove.style.opacity = 0;
    liToRemove.style.marginTop = '-40px';
    deleteOneFromLocalStorage(+id);
    setTimeout(() => {
      liToRemove.remove();
      updateDOM();
    }, 400);
  });

  // date sort

  addGlobalEventListener('pointerdown', '.date-sort', dateSort.sort);
  // category sort

  addGlobalEventListener('pointerdown', '.category-sort', categorySort.sort);
  // delete all
  // pointerup selected to allow user to move away on pointerdown
  // if pressed by accident
  addGlobalEventListener('pointerup', '.delete-all', deleteAllTodosDialog);
  addGlobalEventListener('pointerup', '.yes-btn', confirmDelete);
  addGlobalEventListener('pointerup', '.no-btn', resetAppUI);

  addGlobalEventListener('pointerup', '.delete-selected', deleteSelected);
  // addGlobalEventListener('pointerdown', '.tutorial', tutorial);
  // insert new one above this line
  updateDOM();
} // END initializeEventListeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
  initializeEventListeners();
}
