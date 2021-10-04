/**
 * set containers with data attribute data-draggable-container
 * and set draggable items the attribute draggable="true"
 * example: 
 *  <div class="container" data-draggable-container>
    <p  draggable="true">1</p>
    <p  draggable="true">2</p>
  </div>
 */

import { saveDOMOrder } from "./saveDOMOrder";

export const draggable = function () {
  const draggables = [...document.querySelectorAll('li')];
  const containers = [...document.querySelectorAll('[data-draggable-container]')];

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('[draggable="true"]:not(.dragging)')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
  draggables.forEach((item) => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
      document.querySelector('#todoList').style.cursor = 'default';

      item.classList.remove('dragging');
      saveDOMOrder();
    });
  });

  containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const selectedElement = document.querySelector('.dragging');
      selectedElement.opacity = '0.5';

      if (afterElement == null) {
        container.appendChild(selectedElement);
        return;
      }
      container.insertBefore(selectedElement, afterElement);
    });
  });
};
