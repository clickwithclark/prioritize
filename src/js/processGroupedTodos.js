export function processGroupedTodos(groupedTodos) {
  const grouplist = groupedTodos.split(',');
  const category = groupedTodos.match(/\((.*)\)/).pop();
  // first one already has category
  const listOfGroupedTodos = [];
  listOfGroupedTodos.push(grouplist[0].replace(':', ''));
  // rebuild todos adding their categories starting from second item onwards
  grouplist.slice(1).forEach((todo) => {
    listOfGroupedTodos.push(`(${category})${todo}`);
  });
  return listOfGroupedTodos.join(',');
}
