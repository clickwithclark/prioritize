import { updateDOM } from '../ui/updateDOM.js';
import { getState, saveState } from '../utils/localStorage.js';
import {
  feedbackMessage,
  resetLogo,
  feedbackMessageNormal,
} from '../utils/feedbackMessage.js';

const appContainer = document.querySelector('.app-container');
const logo = document.querySelector('#logo');
const appName = document.querySelector('.app-name');
const popUp = document.querySelector('.confirmation-popup');
const logoContainer = document.querySelector('.logo-container');

export function deleteAllTodosDialog() {
  try {
    let todos = { ...getState()?.todos };
    todos = todos ?? {};
    if (Object.keys(todos).length === 0) {
      throw new Error(
        `You Dont have any tasks to delete yet , That's just a demonstration`
      );
    }
    appContainer.classList.add('blur');
    logo.classList.add('negate-blur');
    logoContainer.classList.add('negate-blur');
    appName.classList.add('negate-blur');
    popUp.classList.add('active');
    popUp.classList.add('negate-blur');
    document.body.style.overflow = 'hidden';
    feedbackMessage('Are you sure you want to delete all your Tasks?!', 300);
  } catch (error) {
    console.error(error);
    feedbackMessage(error.message, 3);
  }
}
export function resetModalUI() {
  document.body.style.overflow = '';
  popUp.classList.remove('negate-blur');
  popUp.classList.remove('active');
  appName.classList.remove('negate-blur');
  logoContainer.classList.remove('negate-blur');
  logo.classList.remove('negate-blur');
  appContainer.classList.remove('blur');
}

export function resetAppUI() {
  resetLogo();
  resetModalUI();
  updateDOM();
}
export function cancelDelete() {
  resetAppUI();
  feedbackMessage('Few! . . .that was close!', 2);
}

export function confirmDelete() {
  const state = getState();
  state.todos = null;
  state.order = null;
  saveState(state);
  resetAppUI();
  updateDOM();
  feedbackMessageNormal('Done! . . .');
}
