import { observeUserState } from './observeUserState.js';
import { updateDOM } from './updateDOM.js';
import { updateFromDB } from './updateFromDB.js';

export function init() {
  observeUserState();
  updateDOM();
}
