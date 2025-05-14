import { getState, saveState } from '../utils/localStorage';

export function updateTodo(givenTodo) {
  // get current stored todos first then append new todo
  const state = { ...getState() };
  let currentStored = { ...state?.todos };
  currentStored = currentStored ?? {};
  Object.assign(currentStored, { [givenTodo.id]: givenTodo });
  state.todos = currentStored;
  saveState(state);
}
