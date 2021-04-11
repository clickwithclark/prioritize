import { updateDOM } from './updateDOM.js';
import { getState, saveState } from './localStorage.js';
import { feedbackMessage, resetLogo, feedbackMessageNormal } from './feedbackMessage.js';

const appContainer = document.querySelector('.app-container');
const logo = document.querySelector('#logo');
const appName = document.querySelector('.app-name');
const popUp = document.querySelector('.confirmation-popup');
const logoContainer = document.querySelector('.logo-container');

export function deleteAllTodosDialog() {
  appContainer.classList.add('blur');
  logo.classList.add('negate-blur');
  logoContainer.classList.add('negate-blur');
  appName.classList.add('negate-blur');
  popUp.classList.add('active');
  popUp.classList.add('negate-blur');
  document.body.style.overflow = 'hidden';
  feedbackMessage('Are you sure you want to delete all your Tasks?!', 300);
}

export function resetAppUI() {
  resetLogo();
  feedbackMessage('Few! . . .that was close!', 2);
  document.body.style.overflow = '';
  popUp.classList.remove('negate-blur');
  popUp.classList.remove('active');
  appName.classList.remove('negate-blur');
  logoContainer.classList.remove('negate-blur');
  logo.classList.remove('negate-blur');
  appContainer.classList.remove('blur');
  updateDOM();
}
export function confirmDelete() {
  const state = getState();
  state.todos = null;
  state.order = null;
  saveState(state);
  resetAppUI();
  feedbackMessageNormal('Done! . . .');
  updateDOM();
}
