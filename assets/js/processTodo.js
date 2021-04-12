import { generateID } from './generateID.js';
import { capitalizeFirstLetter } from './capitalizeFirstLetter.js';
import { feedbackMessage } from './feedbackMessage.js';

export function processTodo(message) {
  let category = null;
  let note = message;

  // check for the presence of categories
  // by checking for parenthesis
  if (message.indexOf('(') !== -1) {
    // an attempt to set up a category is being made
    // any failures herein would be category creation failure
    try {
      category = message.match(/(\(.*?\))/).pop();
      // remove category from being included in a todo message
      note = message.replace(category, '').trim();
      category = category.replace('(', '').replace(')', '');
      category = capitalizeFirstLetter(category);
    } catch (error) {
      error.message = ` Invalid format trying to create a category

Good Example: (Category) task, (Category) other task 
            
or 
            
(Category): task, other task, . . .  `;
      feedbackMessage(error.message, 6);
    }
  }
  try {
    if (note.length === 0) {
      throw new Error(` Task left blank during multi-entry mode
      Bad Example: task1<span class="bad">, ,</span>task2

      Good Example: task1<span class="good">,</span>task2
      `);
    }
    note = capitalizeFirstLetter(note);

    const TODO = {
      id: generateID(),
      message: note,
      date: new Date(),
      category,
      completed: false,
    };
    return TODO;
  } catch (error) {
    console.error();
    feedbackMessage(error, 12);
  }
}
