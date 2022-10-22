/* eslint-disable import/no-extraneous-dependencies */
/** Creatinging s single entry point for all modules */

// bootswatch
import 'bootswatch/dist/sketchy/bootstrap.css';

// my scss
import '../scss/todoapp.scss';

export * from './firebase.js';
export * from './saveToDatabase.js';
export * from './addGlobalEventListener.js';
export * from './addGrabbingCursor.js';
export * from './addGrabCursor.js';
export * from './addTodo.js';
export * from './addTodoToDOM.js';
export * from './capitalizeFirstLetter.js';
export * from './categorySort.js';
export * from './createManyTodos.js';
export * from './createOneTodo.js';
export * from './dateSort.js';
export * from './defaultTodos.js';
export * from './deleteAllTodos.js';
export * from './deleteCompletedTask.js';
export * from './deleteSelected.js';
export * from './deleteTodo.js';
export * from './dropDownToggle.js';
export * from './editTodo.js';
export * from './endUpdate.js';
export * from './eventListeners.js';
export * from './exportTasks.js';
export * from './feedbackMessage.js';
export * from './focusOut.js';
export * from './generateID.js';
export * from './loadGroups.js';
export * from './localStorage.js';
export * from './markTaskComplete.js';
export * from './processGroupedTodos.js';
export * from './processInput.js';
export * from './processTodo.js';
export * from './tutorial.js';
export * from './updateDOM.js';
export * from './updateTodoStatus.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then((registration) => console.log(`Service Worker Registered!😁 \n ${registration.scope}`))
        .catch((error) => console.error(`service worker error:😭${error}`));
    });
  }