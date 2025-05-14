import { debounce } from "../utils/debounce.js";
import { writeToDatabase } from "../firebase/writeToDatabase.js";
import { updateCompletedStatus } from "../todos/updateTodoStatus.js";

export function markTaskComplete(event) {
  const todo = event.target;
  // prevent todo state change if user is editing
  if (todo.classList.contains("editing-in-progress")) {
    return;
  }
  todo.classList.toggle("completed");
  const checkmarkIcon = todo.previousElementSibling;
  checkmarkIcon.classList.toggle("show-checkmark");
  updateCompletedStatus(event);
  debouncedSaveToDatabase();
}

const debouncedSaveToDatabase = debounce(writeToDatabase, 5);
