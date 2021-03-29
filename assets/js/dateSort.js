import { addTodoToDOM } from './addTodoToDOM.js';
import { retrieveFromLocalStorage } from './localStorage.js';

const dateSortBtn = document.querySelector('.date-sort');

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
      const pop = {};
      const sortedTodos = new Map();
      console.log('tosort', toSort);
      console.log('new obj', pop);
      try {
        if (toSort.length === 0) {
          return;
        }
        toSort.sort((x, y) => {
          const a = x.date;
          const b = y.date;
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
        console.log({ [element[0]]: element[1] });
        console.log(sortedTodos.set([element[0]], element[1]));
        addTodoToDOM({ ...element[1] });
      });
      localst
    },
  };
})();
