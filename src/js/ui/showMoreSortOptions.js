/**
 * Toggles the visibility of the sort options menu.
 * Activates or deactivates the `btn-collection--active` class to show or hide the menu.
 *
 * @function showMoreSortOptions
 * @param {Event} event - The event object triggered by the sort button click.
 * @returns {void}
 */
export function showMoreSortOptions(event) {
  const sortToggle = document.querySelector(".sort-main-btn"); // The sort button
  const sortMenu = document.querySelector(
    ".button-type-sort > .btn-collection"
  ); // The sort options menu

  // Toggle the active class to show or hide the menu
  sortMenu.classList.toggle("btn-collection--active");
}
