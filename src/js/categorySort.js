import { addTodoToDOM } from './addTodoToDOM.js';
import { draggable } from './draggable.js';
import { retrieveFromLocalStorage } from './localStorage.js';
import { saveTodoOrder } from "./saveTodoOrder";
import { updateDOM } from './updateDOM.js';
import { dateSort } from './dateSort.js';

export const categorySort = (function (event) {
  let toSort = null;
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
      let unCategorized;
      let categorized;
      toSort = Object.entries(retrieveFromLocalStorage());
      try {
        if (toSort.length === 0) {
          return;
        }
        categorized = toSort.filter((item) => item[1].category !== null);
        unCategorized = toSort.filter((item) => item[1].category === null);
        dateSort.setSort(unCategorized);
        dateSort.sort();
        categorized.sort((x, y) => {
          const a = x[1].category;
          const b = y[1].category;
          return flipSort(a, b);
        });
        // toggle sort direction
        flip *= -1;
      } catch (error) {
        console.error(error);
      }

      // after all sorting merge sorted categories with date sorted non categorized tasks

      saveTodoOrder([...categorized, ...dateSort.getEtries()]);
      updateDOM();
      draggable();
    },
  };
})();
