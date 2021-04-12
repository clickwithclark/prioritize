import { feedbackMessage, feedbackMessageNormal } from './feedbackMessage.js';
import { getState, saveState, saveTodoOrder } from './localStorage.js';
import { updateDOM } from './updateDOM.js';

export function deleteSelected() {
  const state = { ...getState() };
  const todos = state?.todos;
  try {
    if (!todos) {
      throw new Error(`You Dont have any tasks to delete yet , That's just a demonstration`);
    }
    const completedTodos = Object.entries(todos).filter((todo) => todo[1].completed === true);
    if (completedTodos.length === 0) {
      throw new Error(`No tasks are completed yet . . .
To mark a task as complete ,
click on the task name`);
    }

    const todosToKeep = Object.entries(todos).filter((todo) => todo[1].completed === false);
    state.todos = Object.fromEntries(todosToKeep);
    saveState(state);
    saveTodoOrder(todosToKeep);
    updateDOM();
    feedbackMessageNormal('Done! . . .');
  } catch (error) {
    console.error(error);
    feedbackMessage(error.message, 3);
  }
}
