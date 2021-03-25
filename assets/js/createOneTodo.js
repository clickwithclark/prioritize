import { addToLocalStorage } from './localStorage.js';
import { processTodo } from './processTodo.js';
import { updateDOM } from './updateDOM.js';

export function createOneTodo(message) {
  const TODO = processTodo(message);
  addToLocalStorage(TODO);
  updateDOM();
}
