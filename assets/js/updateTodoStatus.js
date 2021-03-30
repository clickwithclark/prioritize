import { updateOneInLocalStorage } from './localStorage.js';

export function updateCompletedStatus(event) {
  const todo = event.target;
  const listItem = event.target.closest('li');
  const { id } = listItem.dataset;
  const mappedTodos = new Map(JSON.parse(localStorage.getItem('todos')));
  if (todo.classList.contains('completed')) {
    console.log('before', mappedTodos.get(id));

    mappedTodos.set(id, Object.assign(mappedTodos.get(id), { id, completed: true }));
    return localStorage.setItem('todos', JSON.stringify([...mappedTodos]));
  }
  mappedTodos.set(id, Object.assign(mappedTodos.get(id), { id, completed: false }));
  localStorage.setItem('todos', JSON.stringify([...mappedTodos]));
}
