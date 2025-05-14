import { draggable } from './draggable.js';
import { retrieveFromLocalStorage } from '../utils/localStorage.js';
import { saveTodoOrder } from "./saveTodoOrder.js";
import { updateDOM } from './updateDOM.js';

export const dateSort = (function (event) {
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
      // this is so that toSort can be initialized with lists outside of localStorage
      toSort = toSort ?? Object.entries(retrieveFromLocalStorage());
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
      saveTodoOrder(toSort);
      updateDOM();
      draggable();
    },
    getEtries() {
      const sorted = toSort;
      toSort = null;
      return sorted;
    },
    setSort(arr) {
      toSort = arr;
    },
  };
})();
