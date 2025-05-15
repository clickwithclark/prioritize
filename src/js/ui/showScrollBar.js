/**
 * Enables the vertical scrollbar for the todo list.
 * Sets the `overflowY` style property to `scroll` to allow vertical scrolling.
 *
 * @function showScrollBar
 * @returns {void}
 */
export function showScrollBar() {
  document.querySelector('#todoList').style.overflowY = 'scroll'; // Enable vertical scrolling
}
