import { addTodoToDOM } from './addTodoToDOM.js';
import { draggable } from './draggable.js';
import { retrieveFromLocalStorage, saveSortedTodos } from './localStorage.js';

export const dateSort = (function (event) {
  let toSort = [];
  let flip = 1;
  /** Change the direction of the sort on each function call
   * @function flipSort
   * @param  {Element} a first element for comparison
   * @param  {Element} b second  element for comparison
   * @return {Number} Decision on whether [1] or not [-1] the element is correctly sorted
   */
  function flipSort(a, b) {
    // flip bool value for different sort on same button click
    return (b > a ? 1 : -1) * flip;
  }

  return {
    sort() {
      toSort = Object.entries(retrieveFromLocalStorage());
      try {
        if (toSort.length === 0) {
          return;
        }
        toSort.sort((x, y) => {
          const a = x[1].date;
          const b = y[1].date;
          return flipSort(a, b);
        });
        // toggle sort direction
        flip *= -1;

        // const rebuiltStorage =
      } catch (error) {
        console.error(error);
      }

      // after sort
      const list = document.querySelector('#todoList');
      list.innerHTML = '';
      toSort.forEach((element) => {
        addTodoToDOM({ ...element[1] });
      });
      saveSortedTodos(toSort);
      draggable();
    },
  };
})();
