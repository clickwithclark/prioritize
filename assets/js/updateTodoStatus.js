import { updateOneInLocalStorage } from './localStorage.js';

export function updateCompletedStatus(event) {
  const todo = event.target;
  const listItem = event.target.closest('li');
  const { id } = listItem.dataset;
  if (todo.classList.contains('completed')) {
    return updateOneInLocalStorage({ id, completed: true });
  }
  updateOneInLocalStorage({ id, completed: false });
}
