import { addGlobalEventListener } from "./addGlobalEventListener.js";
import { deleteSelected } from "../todos/deleteSelected.js";
import { exportTask } from "./exportTasks.js";
import { focusOut } from "../ui/focusOut.js";
import { init } from "../init.js";
import { login } from "../firebase/login.js";
import { logout } from "../firebase/logout.js";
import { markTaskComplete } from "../ui/markTaskComplete.js";
import { processInput } from "../todos/processInput.js";
import { showMoreDeleteOptions } from "../ui/showMoreDeleteOptions.js";
import { showMoreSortOptions } from "../ui/showMoreSortOptions.js";
import { signup } from "../firebase/signup.js";
import {
  cancelDelete,
  confirmDelete,
  deleteAllTodosDialog,
} from "../todos/deleteAllTodos.js";
import { deleteCompletedTask } from "../todos/deleteCompletedTask.js";
import { editTodo } from "../todos/editTodo.js";
import { tutorial, tutorialOk } from "../ui/tutorial.js";
import { addGrabbingCursor } from "../ui/addGrabbingCursor.js";
import { addGrabCursor } from "../ui/addGrabCursor.js";
import { categorySort } from "../ui/categorySort.js";
import { dateSort } from "../ui/dateSort.js";
import { dropDownToggle } from "../ui/dropDownToggle.js";
// global state management

// eslint-disable-next-line prefer-const
/* -------------------------------------------------------------------*/
// #region of TODO
/* -------------------------------------------------------------------*/

/**
  # TODO:[x]-completed [A]-priority-letter

  1. [x] [A] add category sort

  2. [x] [A] add date sort

  3. [X] [A] make pwa


  5. [x] [A] make draggable

  6. [X] [X] no empty entry-logo saying noo

  
  

  8. [x] [x] sorted state  needs to persists

  9. [] [] Ninth todo

  10.[] [] Tenth todo

  {$@11. todo $@11}*5 //{$@16. todo $@16}*5


 */

/* -------------------------------------------------------------------*/
// #endregion of TODO

/**
 * Initializes all event listeners for the application.
 * This function sets up global event listeners for various user interactions,
 * such as adding todos, editing todos, sorting, deleting, and authentication actions.
 *
 * @function initializeEventListeners
 * @returns {void}
 */
export function initializeEventListeners() {
  // Entering todo info
  addGlobalEventListener("keyup", "#todoInput", processInput);

  // Cancel editing if focus is lost
  addGlobalEventListener("focusout", "#todoInput", focusOut);

  // Edit/update existing todo
  // NOTICE: Updating is also done in the processInput function
  addGlobalEventListener("pointerup", ".edit", editTodo);

  // Adding new todo
  addGlobalEventListener("pointerup", ".drop-down-entry", dropDownToggle);

  // Manually sort todos
  addGlobalEventListener("pointerdown", ".grip", addGrabbingCursor);
  addGlobalEventListener("pointerup", "#todoList", addGrabCursor);

  // Mark task as complete
  addGlobalEventListener("pointerdown", ".main-message", markTaskComplete);

  // Delete completed todo
  addGlobalEventListener("pointerdown", ".checkmark", deleteCompletedTask);

  // Show delete options
  addGlobalEventListener(
    "pointerdown",
    ".remove-main-btn",
    showMoreDeleteOptions
  );

  // Show sort options
  addGlobalEventListener("pointerdown", ".sort-main-btn", showMoreSortOptions);

  // Sort by date
  addGlobalEventListener("pointerdown", ".date-sort", dateSort.sort);

  // Sort by category
  addGlobalEventListener("pointerdown", ".category-sort", categorySort.sort);

  // Delete all todos
  // Pointerup is selected to allow the user to move away on pointerdown
  // if pressed by accident
  addGlobalEventListener("pointerup", ".delete-all", deleteAllTodosDialog);
  addGlobalEventListener("pointerup", ".yes-btn", confirmDelete);
  addGlobalEventListener("pointerup", ".no-btn", cancelDelete);

  // Delete selected todos
  addGlobalEventListener("pointerup", ".delete-selected", deleteSelected);

  // Tutorial actions
  addGlobalEventListener("pointerdown", ".tutorial-btn", tutorial);
  addGlobalEventListener("pointerdown", ".tutorial-ok-btn", tutorialOk);

  // Export tasks
  addGlobalEventListener("pointerdown", "#logo", exportTask);

  // Authentication actions
  addGlobalEventListener("click", "#signup-btn", signup);
  addGlobalEventListener("click", "#logout-btn", logout);
  addGlobalEventListener("click", "#login-btn", login);

  // Initialize the app on window load
  window.addEventListener("load", init);

  // Insert new event above this line
} // END initializeEventListeners

/**
 * Automatically initializes event listeners when the DOM is fully loaded.
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEventListeners);
} else {
  initializeEventListeners();
}
