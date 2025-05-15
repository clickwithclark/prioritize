import { generateID } from '../utils/generateID.js';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter.js';
import { feedbackMessage } from '../utils/feedbackMessage.js';

/**
 * Processes a todo message into a todo object.
 * Extracts and formats categories if present, validates the input,
 * and generates a todo object with a unique ID.
 *
 * @function processTodo
 * @param {String} message - The message to process into a todo.
 * @returns {Object|null} A todo object with the processed data, or null if an error occurs.
 */
export function processTodo(message) {
  let category = null; // Initialize the category as null
  let note = message; // Initialize the note with the input message

  // Check for the presence of categories by looking for parentheses
  if (message.indexOf('(') !== -1) {
    // An attempt to set up a category is being made
    try {
      category = message.match(/(\(.*?\))/).pop(); // Extract the category
      note = message.replace(category, '').trim(); // Remove the category from the message
      category = category.replace('(', '').replace(')', '').trim(); // Clean up the category
      category = capitalizeFirstLetter(category); // Capitalize the first letter of the category
    } catch (error) {
      // Handle invalid category format
      error.message = `Invalid format trying to create a category

Good Example: (Category) task, (Category) other task 
            
or 
            
(Category): task, other task, . . .  `;
      feedbackMessage(error.message, 6); // Display an error message
    }
  }

  try {
    // Validate the note to ensure it is not blank
    if (note.length === 0) {
      throw new Error(`Task left blank during multi-entry mode
      Bad Example: task1<span class="bad">, ,</span>task2

      Good Example: task1<span class="good">,</span>task2
      `);
    }

    note = capitalizeFirstLetter(note); // Capitalize the first letter of the note

    // Create the todo object
    const TODO = {
      id: generateID(), // Generate a unique ID for the todo
      message: note, // Set the note as the message
      date: new Date(), // Set the current date
      category, // Include the category (if any)
      completed: false, // Mark the todo as not completed
    };

    return TODO; // Return the processed todo object
  } catch (error) {
    console.error(error); // Log the error
    feedbackMessage(error.message, 12); // Display an error message
    return null; // Return null if an error occurs
  }
}
