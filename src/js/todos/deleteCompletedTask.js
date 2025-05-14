import { updateDOM } from '../ui/updateDOM.js';
import { deleteOneFromLocalStorage } from '../utils/localStorage.js';

export function deleteCompletedTask(event) {
  const liToRemove = event.target.closest('li');
  const { id } = liToRemove.dataset;
  liToRemove.style.transition = '0.3s';
  liToRemove.style.opacity = 0;
  liToRemove.style.marginTop = '-40px';
  deleteOneFromLocalStorage(+id);
  setTimeout(() => {
    liToRemove.remove();
    updateDOM();
  }, 400);
}
