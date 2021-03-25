import { addToLocalStorage } from './localStorage.js';
import { processTodo } from './processTodo.js';
import { updateDOM } from './updateDOM.js';

export function updateTodoFromSpan(messageNode) {
  const { id } = messageNode.closest('li').dataset;
  const currentMessage = messageNode.innerText;
  const updatedTodo = processTodo(currentMessage);
  // keep same ID for todo
  updatedTodo.id = id;
  // replace updated todo with old todo
  addToLocalStorage(updatedTodo);
  updateDOM();
}
