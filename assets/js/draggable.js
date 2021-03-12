/**
 * set containers with data attribute data-draggable-container
 * and set draggable items the attribute draggable="true"
 * example: 
 *  <div class="container" data-draggable-container>
    <p  draggable="true">1</p>
    <p  draggable="true">2</p>
  </div>
 */
   
  export const draggable =(function () {
    const draggables = [...document.querySelectorAll('[draggable]')];
    const containers = [...document.querySelectorAll('[data-draggable-container]')];
    console.log({draggables});
    console.log({containers});
    function styleElement(element, stylesObj) {
      console.log(element);
      Object.assign(element.style, stylesObj);
    }
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
    draggables.forEach((draggable) => {
      styleElement(draggable, {
        cursor: `move`,
      });
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
  
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
  
    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const selectedElement = document.querySelector('.dragging');
        styleElement(selectedElement, {
          opacity: '.5',
        });
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
          container.appendChild(draggable);
          return;
        }
        container.insertBefore(draggable, afterElement);
      });
    });
  })();
  