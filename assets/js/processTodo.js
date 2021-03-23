import { generateID } from './generateID.js';
import { escapeHtml } from './escapeHtml.js';
import { capitalizeFirstLetter } from './capitalizeFirstLetter.js';

export function processTodo(message) {
  let category;
  let note;
  // check for the presence of categories
  // by checking for parenthesis
  if (message.indexOf('(') !== -1) {
    category = message.match(/\((.*)\)/).pop();
    // remove category from being included in a todo body
    note = message.replace(`(${category})`, '');
    note = escapeHtml(note);
  }

  category = capitalizeFirstLetter(category);
  const TODO = {
    id: generateID,
    message,
    date: new Date(),
    category,
  };
  return TODO;
}
