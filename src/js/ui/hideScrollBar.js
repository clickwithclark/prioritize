/**
 * Disables the vertical scrollbar for the todo list.
 * Sets the `overflowY` style property to `hidden` to prevent vertical scrolling.
 *
 * @function hideScrollBar
 * @returns {void}
 */
export function hideScrollBar() {
  document.querySelector('#todoList').style.overflowY = 'hidden'; // Disable vertical scrolling
}
