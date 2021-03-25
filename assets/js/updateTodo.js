import { updateTodoFromSpan } from './updateTodoFromSpan.js';

export function updateTodo(e) {
  const messageNode = e.target;
  updateTodoFromSpan(messageNode);
  messageNode.classList.remove('editing-in-progress');
}
