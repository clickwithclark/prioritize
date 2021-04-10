import { addToLocalStorage } from './localStorage.js';
import { processTodo } from './processTodo.js';
import { tellUserAboutError } from './tellUserAboutError.js';
import { updateDOM } from './updateDOM.js';

export function createOneTodo(message) {
  const TODO = processTodo(message);
  try {
    if (TODO) {
      addToLocalStorage(TODO);
      updateDOM();
      return;
    }
  } catch (error) {
    console.trace();
    tellUserAboutError(error);
  }
}
