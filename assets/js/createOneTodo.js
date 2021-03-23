import { addToLocalStorage } from './localStorage.js';
import { processTodo } from './processTodo';

export function createOneTodo(message) {
  const TODO = processTodo(message);
  addToLocalStorage(TODO);
}
