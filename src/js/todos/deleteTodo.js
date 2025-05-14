import { deleteOneFromLocalStorage } from '../utils/localStorage.js';
import { updateDOM } from '../ui/updateDOM.js';

// Remove todo by ID
export function removeTodo(e) {
  const { id } = e.target.dataset;
  deleteOneFromLocalStorage(id);

  updateDOM();
}
