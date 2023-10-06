import { feedbackMessage, feedbackMessageNormal } from "./feedbackMessage.js";
import { getState } from "./localStorage.js";

export function todoExportString() {
  const todos = getState()?.todos ?? {};
  if (Object.keys(todos).length === 0) {
    return;
  }
  let storedToExport;
  const hasCategory = {
    true: (todo) => (storedToExport += `, (${todo.category}) ${todo.message}`),
    false: (todo) => (storedToExport += `, ${todo.message}`),
  };
  Object.keys(todos).forEach((key) => {
    hasCategory[!!todos[key].category]?.(todos[key]);
  });

  // remove any accidental leading undefined's
  storedToExport = storedToExport.replace("undefined", "");

  // remove only first leading comma
  storedToExport = storedToExport.slice(1).trim();
  return storedToExport;
}

export function exportTask(event) {
  const exportedString = todoExportString() || "";
  navigator.clipboard.writeText(exportedString);
  return exportedString
    ? feedbackMessageNormal(`copied to your clipboard !`)
    : feedbackMessage("You have no tasks to export !");
}
