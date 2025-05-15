import { getState } from '../utils/localStorage.js';

/**
 * Loads unique task categories (groups) into a dropdown menu.
 * Extracts categories from todos, removes duplicates, and updates the dropdown options.
 *
 * @function loadGroups
 * @returns {void}
 */
export function loadGroups() {
  const todos = getState()?.todos; // Retrieve todos from the application state
  if (!todos) {
    return; // Exit if no todos exist
  }

  const groups = document.querySelector('#groups'); // Dropdown menu for groups
  let grouplist = [];

  // Extract categories from todos
  Object.keys(todos).forEach((key) => {
    if (todos[key].category !== null) {
      grouplist.push(`(${todos[key].category})`); // Add category to the list
    }
  });

  // Remove duplicate categories
  grouplist = [...new Set(grouplist)];

  // Clear the dropdown menu to prevent duplicate entries in the DOM
  groups.replaceChildren();

  // Create an empty group option for easy entry
  const empty = document.createElement('option');
  empty.value = '(    )'; // Placeholder value for the empty group
  groups.append(empty);

  // Add unique categories as options in the dropdown menu
  grouplist.forEach((choice) => {
    const option = document.createElement('option');
    option.value = choice; // Set the option value to the category
    groups.append(option); // Append the option to the dropdown
  });
}
