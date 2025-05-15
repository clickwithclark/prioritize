import { draggable } from './draggable.js';
import { retrieveFromLocalStorage } from '../utils/localStorage.js';
import { saveTodoOrder } from "./saveTodoOrder.js";
import { updateDOM } from './updateDOM.js';
import { dateSort } from '../ui/dateSort.js';

/**
 * Provides functionality to sort todos by category.
 * Categorized tasks are sorted alphabetically, while uncategorized tasks are sorted by date.
 * Allows toggling the sort direction and integrates with the DOM and localStorage.
 *
 * @namespace categorySort
 */
export const categorySort = (function () {
  let toSort = null; // Stores the list of todos to sort
  let flip = 1; // Determines the sort direction (1 for ascending, -1 for descending)

  /**
   * Changes the direction of the sort on each function call.
   *
   * @function flipSort
   * @param {string} a - The first element for comparison.
   * @param {string} b - The second element for comparison.
   * @returns {number} Returns 1 or -1 based on the comparison and sort direction.
   */
  function flipSort(a, b) {
    return (b > a ? 1 : -1) * flip; // Flip the sort direction on each call
  }

  return {
    /**
     * Sorts the todos by category and updates the DOM.
     * Categorized tasks are sorted alphabetically, while uncategorized tasks are sorted by date.
     *
     * @method sort
     * @returns {void}
     */
    sort() {
      let unCategorized; // Stores uncategorized tasks
      let categorized; // Stores categorized tasks

      // Retrieve todos from localStorage
      toSort = Object.entries(retrieveFromLocalStorage());

      try {
        if (toSort.length === 0) {
          return; // Exit if there are no todos to sort
        }

        // Separate categorized and uncategorized tasks
        categorized = toSort.filter((item) => item[1].category !== null);
        unCategorized = toSort.filter((item) => item[1].category === null);

        // Sort uncategorized tasks by date
        dateSort.setSort(unCategorized);
        dateSort.sort();

        // Sort categorized tasks alphabetically by category
        categorized.sort((x, y) => {
          const a = x[1].category;
          const b = y[1].category;
          return flipSort(a, b);
        });

        // Toggle the sort direction
        flip *= -1;
      } catch (error) {
        console.error(error); // Log any errors that occur during sorting
      }

      // Merge sorted categorized tasks with date-sorted uncategorized tasks
      saveTodoOrder([...categorized, ...dateSort.getEntries()]);
      updateDOM(); // Refresh the DOM to reflect the changes
      draggable(); // Enable drag-and-drop functionality
    },
  };
})();
