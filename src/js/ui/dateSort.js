import { draggable } from './draggable.js';
import { retrieveFromLocalStorage } from '../utils/localStorage.js';
import { saveTodoOrder } from './saveTodoOrder.js';
import { updateDOM } from './updateDOM.js';

/**
 * Provides functionality to sort todos by date.
 * Allows toggling the sort direction and integrates with the DOM and localStorage.
 *
 * @namespace dateSort
 */
export const dateSort = (function () {
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
     * Sorts the todos by date and updates the DOM.
     * Toggles the sort direction on each call.
     *
     * @method sort
     * @returns {void}
     */
    sort() {
      // Initialize `toSort` with todos from localStorage if not already set
      toSort = toSort ?? Object.entries(retrieveFromLocalStorage());

      try {
        if (toSort.length === 0) {
          return; // Exit if there are no todos to sort
        }

        // Sort the todos by date
        toSort.sort((x, y) => {
          const a = x[1].date;
          const b = y[1].date;
          return flipSort(a, b);
        });

        // Toggle the sort direction
        flip *= -1;
      } catch (error) {
        console.error(error); // Log any errors that occur during sorting
      }

      // Save the sorted order, update the DOM, and enable drag-and-drop functionality
      saveTodoOrder(toSort);
      updateDOM();
      draggable();
    },

    /**
     * Retrieves the sorted entries and resets the `toSort` variable.
     *
     * @method getEntries
     * @returns {Array} The sorted entries.
     */
    getEntries() {
      const sorted = toSort;
      toSort = null; // Reset `toSort` for future use
      return sorted;
    },

    /**
     * Sets the list of todos to sort.
     *
     * @method setSort
     * @param {Array} arr - The array of todos to sort.
     * @returns {void}
     */
    setSort(arr) {
      toSort = arr;
    },
  };
})();
