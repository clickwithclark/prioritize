import { writeToDatabase } from "../firebase/writeToDatabase.js";
import { updateTodo } from "../todos/updateTodo.js";
import { updateDOM } from "../ui/updateDOM.js";
import { debounceEmpty } from "../utils/debounceEmpty.js";
import { feedbackMessage } from "../utils/feedbackMessage.js";
import { clearUpdateConfig, getState } from "../utils/localStorage.js";
import { addTodo } from "./addTodo.js";
import { endUpdate } from "./endUpdate.js";
import { processTodo } from "./processTodo.js";

/**
 * Processes user input from the todo input field.
 * Handles adding new todos, updating existing todos, and saving changes to the database.
 * Provides feedback messages for invalid input or errors.
 *
 * @function processInput
 * @param {KeyboardEvent} event - The keyboard event triggered by user input.
 * @returns {void}
 */
export function processInput(event) {
  // When the Enter key is pressed
  if (event.key === "Enter") {
    const input = document.querySelector("#todoInput");

    // Check if the user is editing an existing todo
    if (event.target.classList.contains("editing-in-progress")) {
      const config = getState()?.updateConfig; // Retrieve the update configuration
      if (config) {
        try {
          const newTask = input.value.trim(); // Get the updated task value
          // Throw an error if the input is blank
          if (newTask === "") {
            throw new Error(
              "Whoops, update cannot be blank! . . . try deleting it instead"
            );
          }
          const updatedTodo = processTodo(newTask); // Process the updated task
          updatedTodo.id = config.updatedTodo.id; // Retain the original ID
          updateTodo(updatedTodo); // Update the todo in the state

          // Reset the input field and update configuration
          endUpdate(input);
          clearUpdateConfig();
          debounceEmpty(input, writeToDatabase, 5); // Save changes to the database

          // Scroll back to the original position of the todo in the list
          window.scrollTo({ top: config.todoOffset, behavior: "smooth" });

          return updateDOM(); // Refresh the DOM to reflect changes
        } catch (error) {
          console.trace(error); // Log the error stack trace
          return feedbackMessage(error.message); // Display an error message
        }
      }
    }

    // Handle adding a new todo
    try {
      // Throw an error if the input is blank
      if (event.target.value.trim() === "") {
        throw new Error("Whoops, you have to enter something first!");
      }

      // Add the new todo
      addTodo();
      event.target.value = ""; // Clear the input field
      endUpdate(event.target); // Reset the input field state
      updateDOM(); // Refresh the DOM to reflect changes

      // Save the new todo to the database
      debounceEmpty(input, writeToDatabase, 5);
    } catch (error) {
      console.trace(error); // Log the error stack trace
      return feedbackMessage(error.message); // Display an error message
    }
  }
}
