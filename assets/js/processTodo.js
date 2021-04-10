import { generateID } from './generateID.js';
import { capitalizeFirstLetter } from './capitalizeFirstLetter.js';
import { tellUserAboutError } from './tellUserAboutError.js';

export function processTodo(message) {
  let category = null;
  let note = message;
  // check for the presence of categories
  // by checking for parenthesis
  if (message.indexOf('(') !== -1) {
    category = message.match(/\((.*)\)/).pop();
    // remove category from being included in a todo body
    note = message.replace(`(${category})`, '').trim();
  }
  try {
    if (note.length === 0) {
      throw new Error(`Task left blank during multi-entry mode
      Example:   task1, ,task2`);
    }
    note = capitalizeFirstLetter(note);
    if (category) {
      category = capitalizeFirstLetter(category);
    }
    console.log('todo still built');
    const TODO = {
      id: generateID(),
      message: note,
      date: new Date(),
      category,
      completed: false,
    };
    return TODO;
  } catch (error) {
    console.trace();
    tellUserAboutError(error, 7);
  }
}
