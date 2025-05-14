import { debounceEmpty } from "./debounceEmpty";
import { addTodo } from "./addTodo.js";
import { endUpdate } from "./endUpdate.js";
import { feedbackMessage } from "./feedbackMessage.js";
import { getState } from "./localStorage.js";
import { updateTodo } from "./updateTodo";
import { clearUpdateConfig } from "./localStorage.js";
import { processTodo } from "./processTodo.js";
import { updateDOM } from "./updateDOM.js";
import { writeToDatabase } from "./writeToDatabase.js";

export function processInput(event) {
  // when enter is pressed
  if (event.key === "Enter") {
    const input = document.querySelector("#todoInput");
    if (event.target.classList.contains("editing-in-progress")) {
      // user is trying to save updated todo
      const config = getState()?.updateConfig;
      if (config) {
        try {
          const newTask = input.value.trim();
          // complain if invalid values
          if (newTask === "") {
            throw new Error(
              "Whoops, update cannot be blank! . . . try deleting it instead"
            );
          }
          const updatedTodo = processTodo(newTask);
          updatedTodo.id = config.updatedTodo.id;
          updateTodo(updatedTodo);

          // reset input to pre-updating defaults

          endUpdate(input);
          clearUpdateConfig();
          debounceEmpty(input, writeToDatabase, 5);

          // scroll back to original todo position in list

          window.scrollTo({ top: config.todoOffset, behavior: "smooth" });

          return updateDOM();
        } catch (error) {
          console.trace(error);
          return feedbackMessage(error.message);
        }
      }
    }
    try {
      // complain if invalid values
      if (event.target.value.trim() === "") {
        throw new Error("Whoops, you have to enter something first!");
      }
      // if this is first entry replace demo todos

      addTodo();
      event.target.value = "";
      endUpdate(event.target); // for times when editing event lead to adding a new todo
      updateDOM();
      // save to database
      debounceEmpty(input, writeToDatabase,5);
    } catch (error) {
      console.trace(error);
      return feedbackMessage(error.message);
    }
  }
}
