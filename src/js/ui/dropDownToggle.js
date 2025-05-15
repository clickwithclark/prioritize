/**
 * Toggles the visibility and styling of the todo input field, list group, and tutorial button.
 * Adds or removes specific classes to create a dropdown effect and show/hide elements.
 *
 * @function dropDownToggle
 * @returns {void}
 */
export function dropDownToggle() {
  const input = document.querySelector('#todoInput'); // The todo input field
  const ul = document.querySelector('.list-group'); // The list group container
  const tutorialButton = document.querySelector('.tutorial-btn'); // The tutorial button

  // Toggle the dropdown effect for the input field
  input.classList.toggle('pop-out-fade-out');

  // Toggle the "input-ready" class for the list group
  ul.classList.toggle('input-ready');

  // Toggle the visibility of the tutorial button
  tutorialButton.classList.toggle('tutorial-btn-show');
}
