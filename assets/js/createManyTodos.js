import { createOneTodo } from './createOneTodo.js';

export function createManyTodos(note) {
  const list = note.split(',');
  list.forEach((listItem) => {
    createOneTodo(listItem);
  });
}
