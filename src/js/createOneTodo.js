import { addToLocalStorage } from './localStorage.js';
import { processTodo } from './processTodo.js';
import { feedbackMessage } from './feedbackMessage.js';
import { updateDOM } from './updateDOM.js';

export function createOneTodo(message) {
  const TODO = processTodo(message);
  try {
    if (TODO) {
      addToLocalStorage(TODO);
      return updateDOM();
    }
  } catch (error) {
    console.error(error);
    feedbackMessage(error.message);
  }
}
