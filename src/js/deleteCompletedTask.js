import { updateDOM } from './updateDOM.js';
import { deleteOneFromLocalStorage } from './localStorage.js';

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
