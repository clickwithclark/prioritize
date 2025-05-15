/**
 * Toggles the visibility of the delete options menu.
 * Activates or deactivates the `btn-collection--active` class to show or hide the menu.
 *
 * @function showMoreDeleteOptions
 * @param {Event} event - The event object triggered by the delete button click.
 * @returns {void}
 */
export function showMoreDeleteOptions(event) {
  const deleteToggle = document.querySelector(".remove-main-btn"); // The delete button
  const deleteMenu = document.querySelector(
    ".button-type-delete > .btn-collection"
  ); // The delete options menu

  // Toggle the active class to show or hide the menu
  deleteMenu.classList.toggle("btn-collection--active");
}
