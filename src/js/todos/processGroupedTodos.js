/**
 * Processes grouped todos by extracting the category and appending it to each task.
 * The input is expected to follow the format `(category): task1, task2, ...`.
 *
 * @function processGroupedTodos
 * @param {String} groupedTodos - A string containing grouped todos with a category.
 * @returns {String} A comma-separated string of todos with the category appended.
 */
export function processGroupedTodos(groupedTodos) {
  const grouplist = groupedTodos.split(','); // Split the input into individual tasks
  const category = groupedTodos.match(/\((.*)\)/).pop(); // Extract the category from the input

  // Initialize the list of grouped todos
  const listOfGroupedTodos = [];
  listOfGroupedTodos.push(grouplist[0].replace(':', '')); // Add the first task without modification

  // Rebuild todos by appending the category to each task starting from the second item
  grouplist.slice(1).forEach((todo) => {
    listOfGroupedTodos.push(`(${category})${todo}`);
  });

  // Return the rebuilt todos as a comma-separated string
  return listOfGroupedTodos.join(',');
}
