const list = document.querySelector('#todoList');

/**
 * Adds a todo item to the DOM.
 * Creates the necessary HTML structure for the todo, applies styles and classes,
 * and appends it to the todo list.
 *
 * @function addTodoToDOM
 * @param {Object} todo - The todo object to add to the DOM.
 * @param {number} todo.id - The unique ID of the todo.
 * @param {string} todo.message - The message or description of the todo.
 * @param {string|null} [todo.category] - The category of the todo (if any).
 * @param {boolean} todo.completed - Indicates whether the todo is completed.
 * @returns {void}
 */
export function addTodoToDOM(todo) {
  const item = document.createElement('li'); // Create the list item
  item.draggable = 'true'; // Make the item draggable

  // Create the checkmark span and icon
  const checkmarkSpan = document.createElement('span');
  const checkmarkIcon = document.createElement('i');

  // Create the grip span and icon for drag-and-drop functionality
  const gripSpan = document.createElement('span');
  const gripIcon = document.createElement('i');

  // Create the edit span and icon for editing functionality
  const editSpan = document.createElement('span');
  const editIcon = document.createElement('i');

  // Create the message span to display the todo message
  const messageSpan = document.createElement('span');

  // Append icons to their respective spans
  checkmarkSpan.appendChild(checkmarkIcon);
  gripSpan.appendChild(gripIcon);
  editSpan.appendChild(editIcon);

  // Assign classes to the elements
  checkmarkSpan.className = 'checkmark';
  gripSpan.className = 'grip';
  editSpan.className = 'edit';
  editIcon.className = 'fas fa-edit';
  gripIcon.className = 'fas fa-arrows-alt-v';
  checkmarkIcon.className = 'far fa-check-square';
  messageSpan.className = 'main-message';

  // Build the HTML structure
  item.appendChild(messageSpan);
  item.dataset.id = todo.id; // Set the todo ID as a data attribute

  // Set the message text, including the category if present
  messageSpan.innerText = todo.category
    ? `[${todo.category}] ${todo.message}`
    : `${todo.message}`;

  // Apply styles for completed todos
  if (todo.completed) {
    messageSpan.classList.add('completed'); // Add the completed class
    checkmarkSpan.classList.add('show-checkmark'); // Show the checkmark
  }

  // Insert elements into the list item
  item.insertAdjacentElement('afterbegin', checkmarkSpan);
  item.insertAdjacentElement('beforeend', editSpan);
  item.insertAdjacentElement('beforeend', gripSpan);

  // Append the list item to the todo list
  list.append(item);
}
