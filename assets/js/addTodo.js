import { createOneTodo } from './createOneTodo.js';
import { createManyTodos } from './createManyTodos.js';

export function addTodo() {
  const message = document.querySelector('#todoInput').value.trim();
  if (message.indexOf(',') === -1) {
    return createOneTodo(message);
  }
  return createManyTodos(message);

  // sanitize input and throw error if left blank

  // check if a category was included and save as such

  // build todo object

  // save to local storage

  // call on DOM to update
}
