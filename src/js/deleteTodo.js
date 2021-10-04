import { deleteOneFromLocalStorage } from './localStorage.js';
import { updateDOM } from './updateDOM.js';

// Remove todo by ID
export function removeTodo(e) {
  const { id } = e.target.dataset;
  deleteOneFromLocalStorage(id);

  updateDOM();
}
