import { getState } from './localStorage.js';

export function loadGroups() {
  const todos = getState()?.todos;
  if (!todos) {
    return;
  }
  const groups = document.querySelector('#groups');
  let grouplist = [];

  Object.keys(todos).forEach((key) => {
    if (todos[key].category !== null) {
      grouplist.push(`(${todos[key].category})`);
    }
  });

  // remove duplicates
  grouplist = [...new Set(grouplist)];
  // clear list on each call to prevent DOM duplicates
  groups.replaceChildren();
  grouplist.forEach((choice) => {
    const option = document.createElement('option');
    option.value = choice;
    groups.append(option);
  });
}
