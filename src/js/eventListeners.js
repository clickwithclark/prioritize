import { editTodo } from "./editTodo.js";
import { addGlobalEventListener } from "./addGlobalEventListener.js";
import { dateSort } from "./dateSort.js";
import { categorySort } from "./categorySort.js";
import {
  deleteAllTodosDialog,
  confirmDelete,
  cancelDelete,
} from "./deleteAllTodos.js";
import { deleteSelected } from "./deleteSelected.js";
import { tutorial, tutorialOk } from "./tutorial.js";
import { processInput } from "./processInput.js";
import { focusOut } from "./focusOut.js";
import { deleteCompletedTask } from "./deleteCompletedTask.js";
import { markTaskComplete } from "./markTaskComplete.js";
import { addGrabCursor } from "./addGrabCursor.js";
import { dropDownToggle } from "./dropDownToggle.js";
import { addGrabbingCursor } from "./addGrabbingCursor.js";
import { exportTask, todoExportString } from "./exportTasks.js";
import { signup } from "./signup.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { init } from "./init";
import { showMoreDeleteOptions } from "./showMoreDeleteOptions.js";
import { showMoreSortOptions } from "./showMoreSortOptions.js";
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

export function initializeEventListeners() {
  // entering todo info
  addGlobalEventListener("keyup", "#todoInput", processInput);
  // cancel editing if focus lost
  addGlobalEventListener("focusout", "#todoInput", focusOut);

  // edit/update existing todo
  // NOTICE: updating is also done in processInput function
  addGlobalEventListener("pointerup", ".edit", editTodo);

  // adding new todo
  addGlobalEventListener("pointerup", ".drop-down-entry", dropDownToggle);

  // manually sort todo
  addGlobalEventListener("pointerdown", ".grip", addGrabbingCursor);
  addGlobalEventListener("pointerup", "#todoList", addGrabCursor);

  // selecting completed todos
  addGlobalEventListener("pointerdown", ".main-message", markTaskComplete);

  // delete todo & fade out
  addGlobalEventListener("pointerdown", ".checkmark", deleteCompletedTask);
  addGlobalEventListener(
    "pointerdown",
    ".remove-main-btn",
    showMoreDeleteOptions
  );
  addGlobalEventListener("pointerdown", ".sort-main-btn", showMoreSortOptions);

  // date sort

  addGlobalEventListener("pointerdown", ".date-sort", dateSort.sort);
  // category sort

  addGlobalEventListener("pointerdown", ".category-sort", categorySort.sort);
  // delete all
  // pointerup selected to allow user to move away on pointerdown
  // if pressed by accident
  addGlobalEventListener("pointerup", ".delete-all", deleteAllTodosDialog);
  addGlobalEventListener("pointerup", ".yes-btn", confirmDelete);
  addGlobalEventListener("pointerup", ".no-btn", cancelDelete);

  addGlobalEventListener("pointerup", ".delete-selected", deleteSelected);
  addGlobalEventListener("pointerdown", ".tutorial-btn", tutorial);
  addGlobalEventListener("pointerdown", ".tutorial-ok-btn", tutorialOk);

  addGlobalEventListener("pointerdown", "#logo", exportTask);

  addGlobalEventListener("click", "#signup-btn", signup);
  addGlobalEventListener("click", "#logout-btn", logout);
  addGlobalEventListener("click", "#login-btn", login);

  window.addEventListener("load", init);

  addGlobalEventListener("click", "#logo", exportTask);

  // insert new event above this line
} // END initializeEventListeners
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEventListeners);
} else {
  initializeEventListeners();
}
