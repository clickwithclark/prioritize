import { feedbackMessageNormal } from './feedbackMessage.js';
import { getState } from './localStorage.js';

export function exportTask(event) {
  const todos = getState()?.todos;
  if (!todos) {
    return;
  }
  //   todos = todos ?? {};
  let storedToExport;
  const hasCategory = {
    true: (todo) => (storedToExport += `, (${todo.category}) ${todo.message}`),
    false: (todo) => (storedToExport += `, ${todo.message}`),
  };
  Object.keys(todos).forEach((key) => {
    hasCategory[!!todos[key].category]?.(todos[key]);
  });

  // remove any accidental leading undefined's
  storedToExport = storedToExport.replace('undefined', '');

  // remove only first leading comma
  storedToExport = storedToExport.slice(1).trim();

  navigator.clipboard.writeText(storedToExport);
  return feedbackMessageNormal(`copied to your clipboard !`);
}
