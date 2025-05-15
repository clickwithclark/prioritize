/**
 * Enables drag-and-drop functionality for elements within containers.
 * Containers must have the `data-draggable-container` attribute, and draggable items must have the `draggable="true"` attribute.
 * Example:
 * <div class="container" data-draggable-container>
 *   <p draggable="true">1</p>
 *   <p draggable="true">2</p>
 * </div>
 *
 * @function draggable
 * @returns {void}
 */

import { saveDOMOrder } from "../ui/saveDOMOrder.js";

export const draggable = function () {
  const draggables = [...document.querySelectorAll('li')]; // Select all draggable items
  const containers = [...document.querySelectorAll('[data-draggable-container]')]; // Select all draggable containers

  /**
   * Determines the element after which the dragged item should be placed.
   *
   * @function getDragAfterElement
   * @param {HTMLElement} container - The container being dragged over.
   * @param {number} y - The vertical position of the mouse pointer.
   * @returns {HTMLElement|null} The element after which the dragged item should be placed, or null if none.
   */
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('[draggable="true"]:not(.dragging)')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect(); // Get the bounding box of the element
        const offset = y - box.top - box.height / 2; // Calculate the offset from the element's center
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child }; // Update the closest element
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  // Add drag event listeners to each draggable item
  draggables.forEach((item) => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging'); // Add the dragging class to the item
    });

    item.addEventListener('dragend', () => {
      document.querySelector('#todoList').style.cursor = 'default'; // Reset the cursor style
      item.classList.remove('dragging'); // Remove the dragging class
      saveDOMOrder(); // Save the updated order of items
    });
  });

  // Add dragover event listeners to each container
  containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault(); // Prevent the default behavior to allow dropping
      const afterElement = getDragAfterElement(container, e.clientY); // Get the element after which to place the dragged item
      const selectedElement = document.querySelector('.dragging'); // Get the currently dragged item
      selectedElement.opacity = '0.5'; // Set the opacity of the dragged item

      if (afterElement == null) {
        container.appendChild(selectedElement); // Append the dragged item to the end of the container
        return;
      }
      container.insertBefore(selectedElement, afterElement); // Insert the dragged item before the determined element
    });
  });
};
